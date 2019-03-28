import React from 'react';
import RetrievePassword from './View';
import {REGEX} from '../../../CONSTANT/REGEX';
import message from 'antd/lib/message';
import Api from '../../../Api';
import {browserHistory} from 'react-router';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../../Router';

class RetrievePasswordContainer extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            hasGetVerificationCodeButtonClicked: false,
            getVerificationCodeButtonText: '获取验证码',
        };

        this.usernameInputRef = React.createRef();
        this.verificationCodeInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.confirmPasswordInputRef = React.createRef();
    }

    onGetVerificationCodeButtonClick = async () =>
    {
        const {hasGetVerificationCodeButtonClicked} = this.state;
        if (!hasGetVerificationCodeButtonClicked)
        {
            const username = this.usernameInputRef.current.input.value;
            if (!REGEX.USERNAME.test(username))
            {
                message.warning('用户名不正确');
            }
            else
            {
                const requestIsSuccessful = await Api.sendPostSendVerificationCodeByUsernameRequestAsync(username);
                if (requestIsSuccessful)
                {
                    this.setState({
                        hasGetVerificationCodeButtonClicked: true,
                    });
                    const WAIT_SECONDS = 30;
                    let secondsLeft = WAIT_SECONDS;
                    const interval = setInterval(() =>
                    {
                        this.setState({
                            getVerificationCodeButtonText: (--secondsLeft).toString(),
                        });
                    }, 1000);

                    setTimeout(() =>
                    {
                        clearInterval(interval);
                        this.setState({
                            getVerificationCodeButtonText: '获取验证码',
                            hasGetVerificationCodeButtonClicked: false,
                        });
                    }, WAIT_SECONDS * 1000);
                }
            }
        }
    };

    onSubmit = async e =>
    {
        e.preventDefault();
        const username = this.usernameInputRef.current.input.value;
        const password = this.passwordInputRef.current.input.value;
        const confirmPassword = this.confirmPasswordInputRef.current.input.value;
        const verificationCode = this.verificationCodeInputRef.current.input.value;
        if (!REGEX.USERNAME.test(username))
        {
            message.warning('用户名不正确');
        }
        else if (!REGEX.PASSWORD.test(password))
        {
            message.warning('密码不正确');
        }
        else if (password !== confirmPassword)
        {
            message.warning('两次输入密码不一致');
        }
        else if (!REGEX.VERIFICATION_CODE.test(verificationCode))
        {
            message.warning('验证码不正确');
        }
        else
        {
            const requestIsSuccessful = await Api.sendPostRetrievePasswordRequestAsync(username, verificationCode, password);
            if (requestIsSuccessful)
            {
                browserHistory.push(PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]);
            }
        }
    };

    render()
    {
        const {getVerificationCodeButtonText} = this.state;
        return (
            <RetrievePassword passwordInputRef={this.passwordInputRef}
                              onSubmit={this.onSubmit}
                              getVerificationCodeButtonText={getVerificationCodeButtonText}
                              verificationCodeInputRef={this.verificationCodeInputRef}
                              onGetVerificationCodeButtonClick={this.onGetVerificationCodeButtonClick}
                              confirmPasswordInputRef={this.confirmPasswordInputRef}
                              usernameInputRef={this.usernameInputRef} />
        );
    }
}

export default RetrievePasswordContainer;