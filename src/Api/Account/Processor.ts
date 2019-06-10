import Function from '../../Function';
import {
    CHANGE_EMAIL,
    CHANGE_PASSWORD,
    GET_USER_PROFILE,
    LOGIN,
    LOGOUT,
    RETRIEVE_PASSWORD,
    SEND_VERIFICATION_CODE_BY_EMAIL,
    SEND_VERIFICATION_CODE_BY_USERNAME,
    SIGN_UP,
    UPLOAD_AVATAR,
} from './ROUTE';
import {STATUS_CODE} from '../../CONSTANT';
import message from 'antd/lib/message';
import {Function as AuthProcessorFunction} from '../../ComponentContainer/AuthProcessor';
import {UserProfile} from '../../Class';

export async function sendPostLoginRequestAsync(username: string, password: string): Promise<true | null>
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

export async function sendPostLogoutRequestAsync(): Promise<true | null>
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

export async function sendGetUserProfileRequestAsync(): Promise<UserProfile | null>
{
    try
    {
        const {code, data} = await Function.getAsync(GET_USER_PROFILE, false);
        switch (code)
        {
            case STATUS_CODE.OK:
            {
                return data;
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
                message.error('获取用户信息操作被拒绝');
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
                message.error('未知原因的获取用户信息失败');
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

export async function sendPostUploadAvatarRequestAsync(file: File): Promise<true | null>
{
    try
    {
        const formData = new FormData();
        formData.append('avatar', file);

        const {code} = await Function.putAsync(UPLOAD_AVATAR, formData);
        switch (code)
        {
            case STATUS_CODE.OK:
            {
                message.success('上传成功');
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
                message.error('上传头像操作被拒绝');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('用户不存在');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('与服务器现有资源冲突');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的上传头像失败');
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

export async function sendPostSendVerificationCodeByEmailRequestAsync(email: string): Promise<true | null>
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

/**
 * @deprecated
 * */
export async function sendPostSignUpRequestAsync(username: string, password: string, email: string, verificationCode: string): Promise<true | null>
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

/**
 * @deprecated
 * */
export async function sendPostSendVerificationCodeByUsernameRequestAsync(username: string): Promise<true | null>
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

/**
 * @deprecated
 * */
export async function sendPostRetrievePasswordRequestAsync(username: string, verificationCode: string, password: string): Promise<true | null>
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

/**
 * @deprecated
 * */
export async function sendPostChangePasswordRequestAsync(password: string, newPassword: string, verificationCode: string): Promise<true | null>
{
    try
    {
        const {code} = await Function.postAsync(CHANGE_PASSWORD, {
            password,
            newPassword,
            verificationCode,
        });
        switch (code)
        {
            case STATUS_CODE.OK:
            {
                message.success('修改密码成功，请重新登录');
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
                message.error('新密码不合法或验证码错误');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('用户不存在');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('原密码错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的修改密码失败');
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

/**
 * @deprecated
 * */
export async function sendPostChangeEmailRequestAsync(email: string, verificationCode: string): Promise<true | null>
{
    try
    {
        const {code} = await Function.postAsync(CHANGE_EMAIL, {
            email,
            verificationCode,
        });
        switch (code)
        {
            case STATUS_CODE.OK:
            {
                message.success('修改邮箱成功');
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
                message.error('新邮箱不合法或验证码错误');
                return null;
            }
            case STATUS_CODE.NOT_FOUND:
            {
                message.error('用户不存在');
                return null;
            }
            case STATUS_CODE.CONFLICT:
            {
                message.error('与服务器现有资源冲突');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                message.error('服务器出错');
                return null;
            }
            default:
            {
                message.error('未知原因的修改邮箱失败');
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