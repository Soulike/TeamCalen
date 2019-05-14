import React from 'react';
import RetrievePassword from './View';
import {REGEX} from '../../../CONSTANT';
import message from 'antd/lib/message';
import Api from '../../../Api';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../../CONFIG';
import {RouteComponentProps, withRouter} from 'react-router-dom';

interface Props extends RouteComponentProps {}

class RetrievePasswordContainer extends React.Component<Props>
{
    private readonly usernameInputRef: React.RefObject<any>;
    private readonly verificationCodeInputRef: React.RefObject<any>;
    private readonly passwordInputRef: React.RefObject<any>;
    private readonly confirmPasswordInputRef: React.RefObject<any>;

    constructor(props: Readonly<Props>)
    {
        super(props);

        this.usernameInputRef = React.createRef();
        this.verificationCodeInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.confirmPasswordInputRef = React.createRef();
    }

    onGetVerificationCodeButtonClick = async () =>
    {
        const username = this.usernameInputRef.current.input.value;
        if (!REGEX.USERNAME.test(username))
        {
            message.warning('用户名不正确');
        }
        else
        {
            return await Api.sendPostSendVerificationCodeByUsernameRequestAsync(username);
        }
    };

    onSubmit = async (e: React.FormEvent) =>
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
                this.props.history.push(PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]);
            }
        }
    };

    render()
    {
        return (
            <RetrievePassword passwordInputRef={this.passwordInputRef}
                              onSubmit={this.onSubmit}
                              verificationCodeInputRef={this.verificationCodeInputRef}
                              onGetVerificationCodeButtonClick={this.onGetVerificationCodeButtonClick}
                              confirmPasswordInputRef={this.confirmPasswordInputRef}
                              usernameInputRef={this.usernameInputRef} />
        );
    }
}

export default withRouter(RetrievePasswordContainer);