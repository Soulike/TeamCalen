import React from 'react';
import Style from './Style.module.scss';
import Input from 'antd/lib/input';
import Tooltip from 'antd/lib/tooltip';
import {REGEX_TEXT} from '../../../CONSTANT';
import Button from 'antd/lib/button';
import GetVerificationCodeButton from '../../../ComponentContainer/GetVerificationCodeButtonContainer';

interface Props
{
    usernameInputRef: React.RefObject<Input>;
    verificationCodeInputRef: React.RefObject<Input>;
    passwordInputRef: React.RefObject<Input>;
    confirmPasswordInputRef: React.RefObject<Input>;
    onGetVerificationCodeButtonClick: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
    onSubmit: (e: React.FormEvent) => any;
}


function RetrievePassword(props: Props)
{
    const {
        usernameInputRef,
        verificationCodeInputRef,
        passwordInputRef,
        confirmPasswordInputRef,
        onGetVerificationCodeButtonClick,
        onSubmit,
    } = props;
    return (
        <div className={Style.RetrievePassword}>
            <form className={Style.retrievePasswordForm} onSubmit={onSubmit}>
                <h1 className={Style.title}>找回密码</h1>
                <div className={Style.inputWrapper}>
                    <Tooltip title={'注册时的用户名'}>
                        <Input placeholder={'用户名'}
                               className={Style.input}
                               size={'large'}
                               autoFocus={true}
                               ref={usernameInputRef} />
                    </Tooltip>
                    <Tooltip title={'注册时邮箱接收到的验证码'}>
                        <Input className={Style.input}
                               size={'large'}
                               placeholder={'验证码'}
                               ref={verificationCodeInputRef}
                               addonAfter={
                                   <GetVerificationCodeButton onClick={onGetVerificationCodeButtonClick} />
                               } />
                    </Tooltip>
                    <Tooltip title={REGEX_TEXT.PASSWORD}>
                        <Input className={Style.input}
                               size={'large'}
                               placeholder={'新密码'}
                               type={'password'}
                               ref={passwordInputRef} />
                    </Tooltip>
                    <Tooltip title={'重复输入新密码'}>
                        <Input className={Style.input}
                               size={'large'}
                               type={'password'}
                               placeholder={'确认新密码'}
                               ref={confirmPasswordInputRef} />
                    </Tooltip>
                </div>
                <div className={Style.submitButtonWrapper}>
                    <Button htmlType={'button'}
                            type={'primary'}
                            size={'large'}
                            className={Style.submitButton}
                            onClick={onSubmit}>确认</Button>
                </div>
            </form>
        </div>);
}

export default React.memo(RetrievePassword);