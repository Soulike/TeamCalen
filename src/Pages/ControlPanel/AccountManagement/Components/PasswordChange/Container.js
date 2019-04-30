import React from 'react';
import PasswordChange from './View';
import {connect} from 'react-redux';
import Api from '../../../../../Api';
import {REGEX} from '../../../../../CONSTANT/REGEX';
import message from 'antd/lib/message';
import {Actions as AuthProcessorActions} from '../../../../../Components/AuthProcessor';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../../../../CONFIG';
import {withRouter} from 'react-router-dom';

class PasswordChangeContainer extends React.Component
{
    constructor(props)
    {
        super(props);

        this.passwordInputRef = React.createRef();
        this.newPasswordInputRef = React.createRef();
        this.confirmNewPasswordInputRef = React.createRef();
        this.verificationCodeInputRef = React.createRef();
    }

    onGetVerificationCodeButtonClick = async () =>
    {
        const {username} = this.props;
        return await Api.sendPostSendVerificationCodeByUsernameRequestAsync(username);
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
                this.props.history.push(PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]);
            }
        }
    };

    render()
    {
        return (
            <PasswordChange passwordInputRef={this.passwordInputRef}
                            newPasswordInputRef={this.newPasswordInputRef}
                            verificationCodeInputRef={this.verificationCodeInputRef}
                            confirmNewPasswordInputRef={this.confirmNewPasswordInputRef}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordChangeContainer));