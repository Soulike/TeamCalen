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
import message from 'antd/lib/message';
import {UserProfile} from '../../Class';

export async function sendPostLoginRequestAsync(username: string, password: string): Promise<true | null>
{
    try
    {
        const {isSuccessful, message: msg} = await Function.postAsync(LOGIN, {
            username,
            password,
        });

        if (isSuccessful)
        {
            message.success('登录成功');
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
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
        const {isSuccessful, message: msg} = await Function.postAsync(LOGOUT);
        if (isSuccessful)
        {
            message.success('退出登录成功');
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
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
        const {isSuccessful, message: msg, data} = await Function.getAsync(GET_USER_PROFILE, false);
        if (isSuccessful)
        {
            return UserProfile.from(data);
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendPostUploadAvatarRequestAsync(file: File | Blob): Promise<true | null>
{
    try
    {
        const formData = new FormData();
        formData.append('avatar', file);

        const {isSuccessful, message: msg} = await Function.postAsync(UPLOAD_AVATAR, formData);
        if (isSuccessful)
        {
            message.success('头像上传成功');
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
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
        const {isSuccessful, message: msg} = await Function.postAsync(SEND_VERIFICATION_CODE_BY_EMAIL, {email});
        if (isSuccessful)
        {
            message.success('验证码已发送');
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendPostSignUpRequestAsync(username: string, password: string, email: string, verificationCode: string): Promise<true | null>
{
    try
    {
        const {isSuccessful, message: msg} = await Function.postAsync(SIGN_UP, {
            username,
            password,
            email,
            verificationCode,
        });
        if (isSuccessful)
        {
            message.success('注册成功');
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendPostSendVerificationCodeByUsernameRequestAsync(username: string): Promise<true | null>
{
    try
    {
        const {isSuccessful, message: msg} = await Function.postAsync(SEND_VERIFICATION_CODE_BY_USERNAME, {username});
        if (isSuccessful)
        {
            message.success('验证码已发送至邮箱');
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendPostRetrievePasswordRequestAsync(username: string, verificationCode: string, password: string): Promise<true | null>
{
    try
    {
        const {isSuccessful, message: msg} = await Function.postAsync(RETRIEVE_PASSWORD, {
            username,
            verificationCode,
            password,
        });
        if (isSuccessful)
        {
            message.success('找回密码成功，请用新密码登录');
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendPostChangePasswordRequestAsync(password: string, newPassword: string, verificationCode: string): Promise<true | null>
{
    try
    {
        const {isSuccessful, message: msg} = await Function.postAsync(CHANGE_PASSWORD, {
            password,
            newPassword,
            verificationCode,
        });
        if (isSuccessful)
        {
            message.success('修改密码成功，请用新密码登录');
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}

export async function sendPostChangeEmailRequestAsync(email: string, verificationCode: string): Promise<true | null>
{
    try
    {
        const {isSuccessful, message: msg} = await Function.postAsync(CHANGE_EMAIL, {
            email,
            verificationCode,
        });
        if (isSuccessful)
        {
            message.success('修改邮箱成功');
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.error(e);
        message.error('网络异常');
        return null;
    }
}