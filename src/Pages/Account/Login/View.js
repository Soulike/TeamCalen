import React from 'react';
import Style from './Style.module.scss';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import {Link} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../../CONFIG';
import PropTypes from 'prop-types';

function Login(props)
{
    const {usernameInputRef, passwordInputRef, onSubmit} = props;
    return (
        <div className={Style.Login}>
            <form className={Style.loginForm} onSubmit={onSubmit}>
                <h1 className={Style.title}>登录</h1>
                <div className={Style.inputWrapper}>
                    <Input placeholder={'用户名'}
                           className={Style.input}
                           size={'large'}
                           autoFocus={true}
                           ref={usernameInputRef} />
                    <Input placeholder={'密码'}
                           className={Style.input}
                           size={'large'}
                           type={'password'}
                           ref={passwordInputRef} />
                </div>
                <div className={Style.tipWrapper}>
                    <div className={Style.signUpTip}>
                        没有帐号？去<Link
                        to={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.SIGN_UP]}>注册</Link>
                    </div>
                    <div className={Style.retrievePasswordTip}>
                        <Link
                            to={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.RETRIEVE_PASSWORD]}>找回密码</Link>
                    </div>
                </div>
                <div className={Style.submitButtonWrapper}>
                    <Button htmlType={'button'}
                            type={'primary'}
                            size={'large'}
                            className={Style.submitButton}
                            onClick={onSubmit}>确认</Button>
                </div>
            </form>
        </div>
    );
}

Login.propTypes = {
    usernameInputRef: PropTypes.object.isRequired,
    passwordInputRef: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default React.memo(Login);