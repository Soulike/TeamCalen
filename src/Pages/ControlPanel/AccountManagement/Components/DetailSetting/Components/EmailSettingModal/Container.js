import React from 'react';
import EmailSettingModal from './View';
import {REGEX} from '../../../../../../../CONSTANT/REGEX';
import message from 'antd/lib/message';
import Api from '../../../../../../../Api';
import {Actions as ModalActions} from '../../../../../../../ComponentContainer/Modal';
import {connect} from 'react-redux';
import MODAL_ID from '../../../../../../../CONSTANT/MODAL_ID';

class EmailSettingModalContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.emailSended = '';  // 已经被发过验证码的邮箱

        this.emailInputRef = React.createRef();
        this.verificationCodeInputRef = React.createRef();
    }

    onGetVerificationCodeButtonClick = async () =>
    {
        const email = this.emailInputRef.current.input.value;
        if (!REGEX.EMAIL.test(email))
        {
            message.warning('新邮箱不合法');
        }
        else
        {
            const requestIsSuccessful = await Api.sendPostSendVerificationCodeByEmailRequestAsync(email);
            if (requestIsSuccessful)
            {
                this.emailSended = email;
            }

            return requestIsSuccessful;
        }
    };

    onConfirm = async () =>
    {
        const email = this.emailInputRef.current.input.value;
        const verificationCode = this.verificationCodeInputRef.current.input.value;
        if (!REGEX.EMAIL.test(email))
        {
            message.warning('新邮箱不合法');
        }
        else if (email !== this.emailSended)
        {
            message.warning('邮箱已改变，请重新获取验证码');
        }
        else if (!REGEX.VERIFICATION_CODE.test(verificationCode))
        {
            message.warning('验证码错误');
        }
        else
        {
            const requestIsSuccessful = await Api.sendPostChangeEmailRequestAsync(email, verificationCode);
            if (requestIsSuccessful)
            {
                const {closeModal} = this.props;
                closeModal(MODAL_ID.EMAIL_SETTING_MODAL);
            }
        }
    };


    render()
    {
        return (
            <EmailSettingModal onConfirm={this.onConfirm}
                               onGetVerificationCodeButtonClick={this.onGetVerificationCodeButtonClick}
                               emailInputRef={this.emailInputRef}
                               verificationCodeInputRef={this.verificationCodeInputRef} />
        );
    }
}

const mapDispatchToProps = {
    closeModal: ModalActions.closeModalAction,
};

export default connect(null, mapDispatchToProps)(EmailSettingModalContainer);