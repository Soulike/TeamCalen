import React from 'react';
import Style from './Style.module.scss';
import AccountPanel from '../../Components/AccountPanel';
import Input from 'antd/lib/input';
import {Link} from 'react-router';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../Router';
import Button from 'antd/lib/button';

function SignUp(props)
{
    return (
        <div className={Style.SignUp}>
            <AccountPanel>
                <form className={Style.signUpForm}>
                    <h1 className={Style.title}>注册</h1>
                    <div className={Style.inputWrapper}>
                        <Input className={Style.input} size={'large'} placeholder={'用户名'} autoFocus={true} />
                        <Input className={Style.input} size={'large'} placeholder={'密码'} />
                        <Input className={Style.input} size={'large'} placeholder={'确认密码'} />
                        <Input className={Style.input} size={'large'} placeholder={'邮箱'} />
                        <Input className={Style.input} size={'large'} placeholder={'验证码'} addonAfter={
                            <div className={Style.getVerificationCodeButton}>获取验证码</div>
                        } />
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
                                className={Style.submitButton}>确认</Button>
                    </div>
                </form>
            </AccountPanel>
        </div>
    );
}

export default SignUp;