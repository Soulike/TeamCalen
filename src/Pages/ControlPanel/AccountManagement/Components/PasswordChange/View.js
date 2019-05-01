import React from 'react';
import Style from './Style.module.scss';
import Input from 'antd/lib/input';
import Tooltip from 'antd/lib/tooltip';
import Button from 'antd/lib/button';
import {REGEX_TEXT} from '../../../../../CONSTANT/REGEX';
import PropTypes from 'prop-types';
import GetVerificationCodeButton from '../../../../../ComponentContainer/GetVerificationCodeButtonContainer';

function PasswordChange(props)
{
    const {
        passwordInputRef,
        newPasswordInputRef,
        confirmNewPasswordInputRef,
        verificationCodeInputRef,
        onGetVerificationCodeButtonClick,
        onSubmit,
    } = props;
    return (
        <div className={Style.PasswordChange}>
            <div className={Style.title}>密码修改</div>
            <div className={Style.inputWrapper}>
                <Input placeholder={'原密码'} ref={passwordInputRef} type={'password'} />
                <Tooltip title={REGEX_TEXT.PASSWORD}>
                    <Input placeholder={'新密码'} ref={newPasswordInputRef} type={'password'} />
                </Tooltip>
                <Input placeholder={'确认新密码'} ref={confirmNewPasswordInputRef} type={'password'} />
                <Input placeholder={'验证码'} ref={verificationCodeInputRef}
                       addonAfter={
                           <GetVerificationCodeButton onClick={onGetVerificationCodeButtonClick} />} />
            </div>
            <div className={Style.submitButtonWrapper}>
                <Button htmlType={'button'} type={'primary'} onClick={onSubmit}>确认</Button>
            </div>
        </div>
    );
}

PasswordChange.propTypes = {
    passwordInputRef: PropTypes.object.isRequired,
    newPasswordInputRef: PropTypes.object.isRequired,
    confirmNewPasswordInputRef: PropTypes.object.isRequired,
    verificationCodeInputRef: PropTypes.object.isRequired,
    onGetVerificationCodeButtonClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default React.memo(PasswordChange);