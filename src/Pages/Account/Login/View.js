import React from 'react';
import Style from './Style.module.scss';
import {View as AccountPanel} from '../../../Components/AccountPanel';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import {Link} from 'react-router';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../../Router';

class Login extends React.Component
{
    render()
    {
        return (
            <div className={Style.Login}>
                <AccountPanel>
                    <form className={Style.loginForm}>
                        <h1 className={Style.title}>登录</h1>
                        <div className={Style.inputWrapper}>
                            <Input placeholder={'用户名'} className={Style.input} size={'large'} autoFocus={true} />
                            <Input placeholder={'密码'} className={Style.input} size={'large'} />
                        </div>
                        <div className={Style.tipWrapper}>
                            <div className={Style.signUpTip}>
                                没有帐号？去<Link onlyActiveOnIndex={false}
                                            to={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.SIGN_UP]}>注册</Link>
                            </div>
                            <div className={Style.retrievePasswordTip}>
                                <Link onlyActiveOnIndex={false}
                                      to={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.RETRIEVE_PASSWORD]}>找回密码</Link>
                            </div>
                        </div>
                        <div className={Style.submitButtonWrapper}>
                            <Button htmlType={'button'}
                                    type={'primary'}
                                    size={'large'}
                                    className={Style.submitButton}>确认</Button>
                        </div>
                    </form>
                </AccountPanel>
            </div>
        );
    }
}

export default Login;