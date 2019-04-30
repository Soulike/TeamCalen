import React from 'react';
import Style from './Style.module.scss';
import Input from 'antd/lib/input/index';
import {Link} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../../CONFIG';
import Button from 'antd/lib/button/index';
import Tooltip from 'antd/lib/tooltip/index';
import PropTypes from 'prop-types';
import {REGEX_TEXT} from '../../../CONSTANT/REGEX';
import GetVerificationCodeButton from '../../../ComponentContainer/GetVerificationCodeButtonContainer';

function SignUp(props)
{
    const {
        usernameInputRef,
        passwordInputRef,
        confirmPasswordInputRef,
        emailInputRef,
        verificationCodeInputRef,
        onGetVerificationCodeButtonClick,
        onSubmit,
    } = props;
    return (
        <div className={Style.SignUp}>
            <form className={Style.signUpForm} onSubmit={onSubmit}>
                <h1 className={Style.title}>注册</h1>
                <div className={Style.inputWrapper}>
                    <Tooltip title={REGEX_TEXT.USERNAME}>
                        <Input className={Style.input}
                               size={'large'}
                               placeholder={'用户名'}
                               autoFocus={true}
                               ref={usernameInputRef} />
                    </Tooltip>
                    <Tooltip title={REGEX_TEXT.PASSWORD}>
                        <Input className={Style.input}
                               size={'large'}
                               placeholder={'密码'}
                               type={'password'}
                               ref={passwordInputRef} />
                    </Tooltip>
                    <Tooltip title={'重复输入密码'}>
                        <Input className={Style.input}
                               size={'large'}
                               type={'password'}
                               placeholder={'确认密码'}
                               ref={confirmPasswordInputRef} />
                    </Tooltip>
                    <Tooltip title={'接收验证码使用的邮箱'}>
                        <Input className={Style.input} size={'large'} placeholder={'邮箱'} ref={emailInputRef} />
                    </Tooltip>
                    <Tooltip title={'接收到的验证码'}>
                        <Input className={Style.input}
                               size={'large'}
                               placeholder={'验证码'}
                               ref={verificationCodeInputRef}
                               addonAfter={
                                   <GetVerificationCodeButton onClick={onGetVerificationCodeButtonClick} />} />
                    </Tooltip>
                </div>
                <div className={Style.tipWrapper}>
                    <div className={Style.loginTip}>
                        已有帐号？去<Link
                        to={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]}>登录</Link>
                    </div>
                </div>
                <div className={Style.buttonWrapper}>
                    <Button htmlType={'button'}
                            size={'large'}
                            type={'primary'}
                            className={Style.submitButton}
                            onClick={onSubmit}>确认</Button>
                </div>
            </form>
        </div>
    );
}

SignUp.propTypes = {
    usernameInputRef: PropTypes.object.isRequired,
    passwordInputRef: PropTypes.object.isRequired,
    confirmPasswordInputRef: PropTypes.object.isRequired,
    emailInputRef: PropTypes.object.isRequired,
    verificationCodeInputRef: PropTypes.object.isRequired,
    onGetVerificationCodeButtonClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default SignUp;