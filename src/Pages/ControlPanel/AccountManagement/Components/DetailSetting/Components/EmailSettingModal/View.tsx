import React from 'react';
import Style from './Style.module.scss';
import {MODAL_ID} from '../../../../../../../CONSTANT';
import Input from 'antd/lib/input';
import GetVerificationCodeButton from '../../../../../../../ComponentContainer/GetVerificationCodeButtonContainer';
import Modal from '../../../../../../../ComponentContainer/Modal';

interface Props
{
    onConfirm: () => Promise<any>,
    onGetVerificationCodeButtonClick: () => Promise<any>,
    emailInputRef: React.RefObject<any>,
    verificationCodeInputRef: React.RefObject<any>,
}

function EmailSettingModal(props: Props)
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

export default React.memo(EmailSettingModal);