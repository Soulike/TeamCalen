import Function from '../../Function';
import {LOGIN} from './ROUTE';
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