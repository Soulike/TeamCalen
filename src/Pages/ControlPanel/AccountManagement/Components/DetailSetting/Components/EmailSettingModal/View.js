import React from 'react';
import Style from './Style.module.scss';
import MODAL_ID from '../../../../../../../CONSTANT/MODAL_ID';
import Input from 'antd/lib/input';
import GetVerificationCodeButton from '../../../../../../../ComponentContainer/GetVerificationCodeButtonContainer';
import Modal from '../../../../../../../ComponentContainer/Modal';
import PropTypes from 'prop-types';

function EmailSettingModal(props)
{
    const {onConfirm, onGetVerificationCodeButtonClick, emailInputRef, verificationCodeInputRef} = props;
    return (
        <Modal title={'邮箱设置'}
               modalId={MODAL_ID.EMAIL_SETTING_MODAL}
               onOk={onConfirm}
               width={300}
               destroyOnClose={true}>
            <div className={Style.EmailSettingModal}>
                <Input placeholder={'新邮箱'} ref={emailInputRef} />
                <Input placeholder={'验证码'} ref={verificationCodeInputRef} addonAfter={
                    <GetVerificationCodeButton onClick={onGetVerificationCodeButtonClick} />
                } />
            </div>
        </Modal>
    );
}

EmailSettingModal.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onGetVerificationCodeButtonClick: PropTypes.func.isRequired,
    emailInputRef: PropTypes.object.isRequired,
    verificationCodeInputRef: PropTypes.object.isRequired,
};

export default React.memo(EmailSettingModal);