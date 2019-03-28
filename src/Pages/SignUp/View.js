import React from 'react';
import Style from './Style.module.scss';
import AccountPanel from '../../Components/AccountPanel';
import Input from 'antd/lib/input';
import {Link} from 'react-router';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../Router';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import PropTypes from 'prop-types';
import {REGEX_TEXT} from '../../CONSTANT/REGEX';

function SignUp(props)
{
    const {
        usernameInputRef,
        passwordInputRef,
        confirmPasswordInputRef,
        emailInputRef,
        verificationCodeInputRef,
        getVerificationCodeButtonText,
        onGetVerificationCodeButtonClick,
        onSubmit,
    } = props;
    return (
        <div className={Style.SignUp}>
            <AccountPanel>
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
                            <Input className={Style.input} size={'large'} placeholder={'密码'} ref={passwordInputRef} />
                        </Tooltip>
                        <Tooltip title={'重复输入密码'}>
                            <Input className={Style.input}
                                   size={'large'}
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
                                       <div className={Style.getVerificationCodeButton}
                                            onClick={onGetVerificationCodeButtonClick}>{getVerificationCodeButtonText}</div>
                                   } />
                        </Tooltip>
                    </div>
                    <div className={Style.tipWrapper}>
                        <div className={Style.loginTip}>
                            已有帐号？去<Link onlyActiveOnIndex={false}
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
            </AccountPanel>
        </div>
    );
}

SignUp.propTypes = {
    usernameInputRef: PropTypes.object.isRequired,
    passwordInputRef: PropTypes.object.isRequired,
    confirmPasswordInputRef: PropTypes.object.isRequired,
    emailInputRef: PropTypes.object.isRequired,
    verificationCodeInputRef: PropTypes.object.isRequired,
    getVerificationCodeButtonText: PropTypes.string.isRequired,
    onGetVerificationCodeButtonClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

SignUp.defaultProps = {
    getVerificationCodeButtonText: '获取验证码',
};

export default SignUp;