import React from 'react';
import PasswordChange from './View';
import {connect} from 'react-redux';
import Api from '../../../../../Api';
import {REGEX} from '../../../../../CONSTANT/REGEX';
import message from 'antd/lib/message';
import {Actions as AuthProcessorActions} from '../../../../../Components/AuthProcessor';
import {browserHistory} from 'react-router';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../../../../Router';

class PasswordChangeContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            getVerificationCodeButtonText: '获取验证码',
            hasSendVerificationCode: false,
        };

        this.passwordInputRef = React.createRef();
        this.newPasswordInputRef = React.createRef();
        this.confirmNewPasswordInputRef = React.createRef();
        this.verificationCodeInputRef = React.createRef();
    }

    onGetVerificationCodeButtonClick = async () =>
    {
        const {hasSendVerificationCode} = this.state;
        if (!hasSendVerificationCode)
        {
            const {username} = this.props;
            const requestIsSuccessful = await Api.sendPostSendVerificationCodeByUsernameRequestAsync(username);
            if (requestIsSuccessful)
            {
                this.setState({
                    hasSendVerificationCode: true,
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
                        hasSendVerificationCode: false,
                    });
                }, WAIT_SECONDS * 1000);
            }
        }
    };

    onSubmit = async () =>
    {
        const password = this.passwordInputRef.current.input.value;
        const newPassword = this.newPasswordInputRef.current.input.value;
        const confirmNewPassword = this.confirmNewPasswordInputRef.current.input.value;
        const verificationCode = this.verificationCodeInputRef.current.input.value;

        if (!REGEX.PASSWORD.test(password))
        {
            message.warning('原密码错误');
        }
        else if (!REGEX.PASSWORD.test(newPassword))
        {
            message.warning('新密码不合法');
        }
        else if (confirmNewPassword !== newPassword)
        {
            message.warning('两次输入新密码不一致');
        }
        else if (!REGEX.VERIFICATION_CODE.test(verificationCode))
        {
            message.warning('验证码错误');
        }
        else
        {
            const requestIsSuccessful = await Api.sendPostChangePasswordRequestAsync(password, newPassword, verificationCode);
            if (requestIsSuccessful)
            {
                const {setOffline} = this.props;
                setOffline();
                browserHistory.push(PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]);
            }
        }
    };

    render()
    {
        const {getVerificationCodeButtonText} = this.state;
        return (
            <PasswordChange passwordInputRef={this.passwordInputRef}
                            newPasswordInputRef={this.newPasswordInputRef}
                            verificationCodeInputRef={this.verificationCodeInputRef}
                            confirmNewPasswordInputRef={this.confirmNewPasswordInputRef}
                            getVerificationCodeButtonText={getVerificationCodeButtonText}
                            onGetVerificationCodeButtonClick={this.onGetVerificationCodeButtonClick}
                            onSubmit={this.onSubmit} />
        );
    }
}

const mapStateToProps = state =>
{
    const {ControlPanel: {userInfo: {username}}} = state;
    return {username};
};

const mapDispatchToProps = {
    setOffline: AuthProcessorActions.setOfflineAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangeContainer);