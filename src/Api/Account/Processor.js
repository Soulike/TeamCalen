import Function from '../../Function';
import {
    LOGIN,
    LOGOUT,
    RETRIEVE_PASSWORD,
    SEND_VERIFICATION_CODE_BY_EMAIL,
    SEND_VERIFICATION_CODE_BY_USERNAME,
    SIGN_UP,
} from './ROUTE';
import STATUS_CODE from '../../CONSTANT/STATUS_CODE';
import message from 'antd/lib/message';
import {Function as AuthProcessorFunction} from '../../Components/AuthProcessor';

export async function sendPostLoginRequestAsync(username, password)
{
    try
    {
        const {code} = await Function.postAsync(LOGIN, {
            username,
            password,
        });

        switch (code)
        {
            case STATUS_CODE.OK:
            {
                message.success('登录成功');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('参数错误');
                return null;
            }
            case STATUS_CODE.UNAUTHORIZED:
            {
                AuthProcessorFunction.setOffline();
                message.error('未登录操作');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                message.error('登录操作被拒绝');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('帐号或密码错误');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('帐号或密码错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的登录失败');
                return null;
            }
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendPostSendVerificationCodeByEmailRequestAsync(email)
{
    try
    {
        const {code} = await Function.postAsync(SEND_VERIFICATION_CODE_BY_EMAIL, {email});
        switch (code)
        {
            case STATUS_CODE.OK:
            {
                message.success('验证码已发送到您的邮箱');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('参数错误');
                return null;
            }
            case STATUS_CODE.UNAUTHORIZED:
            {
                AuthProcessorFunction.setOffline();
                message.error('未登录操作');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                message.error('获取验证码操作被拒绝');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('未知错误');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('未知错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的获取验证码失败');
                return null;
            }
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendPostSignUpRequestAsync(username, password, email, verificationCode)
{
    try
    {
        const {code} = await Function.postAsync(SIGN_UP, {
            username,
            password,
            email,
            verificationCode,
        });
        switch (code)
        {
            case STATUS_CODE.OK:
            {
                message.success('注册成功');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('参数错误');
                return null;
            }
            case STATUS_CODE.UNAUTHORIZED:
            {
                AuthProcessorFunction.setOffline();
                message.error('未登录操作');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                message.error('注册操作被拒绝');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('未知错误');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('用户名已存在');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的注册失败');
                return null;
            }
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendPostSendVerificationCodeByUsernameRequestAsync(username)
{
    try
    {
        const {code} = await Function.postAsync(SEND_VERIFICATION_CODE_BY_USERNAME, {username});
        switch (code)
        {
            case STATUS_CODE.OK:
            {
                message.success('验证码已发送到您注册时的邮箱');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('参数错误');
                return null;
            }
            case STATUS_CODE.UNAUTHORIZED:
            {
                AuthProcessorFunction.setOffline();
                message.error('未登录操作');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                message.error('获取验证码操作被拒绝');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('用户名不存在');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('未知错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的获取验证码失败');
                return null;
            }
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendPostRetrievePasswordRequestAsync(username, verificationCode, password)
{
    try
    {
        const {code} = await Function.postAsync(RETRIEVE_PASSWORD, {
            username,
            verificationCode,
            password,
        });
        switch (code)
        {
            case STATUS_CODE.OK:
            {
                message.success('找回密码成功，请使用新密码登录');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('参数错误');
                return null;
            }
            case STATUS_CODE.UNAUTHORIZED:
            {
                AuthProcessorFunction.setOffline();
                message.error('未登录操作');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                message.error('验证码错误');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('用户名不存在');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('未知错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的找回密码失败');
                return null;
            }
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendPostLogoutRequestAsync()
{
    try
    {
        const {code} = await Function.postAsync(LOGOUT);
        switch (code)
        {
            case STATUS_CODE.OK:
            {
                message.success('退出登录成功');
                return true;
            }
            case STATUS_CODE.BAD_REQUEST:
            {
                message.error('参数错误');
                return null;
            }
            case STATUS_CODE.UNAUTHORIZED:
            {
                AuthProcessorFunction.setOffline();
                message.error('未登录操作');
                return null;
            }
            case STATUS_CODE.FORBIDDEN:
            {
                message.error('退出登录操作被拒绝');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('用户不存在');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('未知错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的退出登录失败');
                return null;
            }
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}