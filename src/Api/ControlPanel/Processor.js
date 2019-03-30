import Function from '../../Function';
import {GET_USER_INFO} from './ROUTE';
import STATUS_CODE from '../../CONSTANT/STATUS_CODE';
import message from 'antd/lib/message';
import {Function as AuthProcessorFunction} from '../../Components/AuthProcessor';

export async function sendGetUserInfoRequestAsync()
{
    try
    {
        const {code, data} = await Function.getAsync(GET_USER_INFO, false);
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