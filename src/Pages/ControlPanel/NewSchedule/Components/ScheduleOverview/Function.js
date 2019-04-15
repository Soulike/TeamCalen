import Api from '../../../../../Api';
import {changeCurrentModifyingScheduleId} from '../../Function';
import Modal from 'antd/lib/modal';
import {Function as ModalFunction} from '../../../../../ComponentContainer/Modal';

export function onSwitchChangeFactory(scheduleId, onOk = () => null)
{
    return async checked =>
    {
        const requestIsSuccessful = await Api.sendPostChangeScheduleStateRequestAsync(scheduleId, checked);
        if (requestIsSuccessful)
        {
            await onOk();
        }
    };
}

export function onResumeClickFactory(scheduleId, onOk = () => null)
{
    return () =>
    {
        Modal.confirm({
            title: '恢复日程',
            content: '确认恢复该日程吗？',
            onOk: async () =>
            {
                const requestIsSuccessful = await Api.sendPostResumeScheduleRequestAsync(scheduleId);
                if (requestIsSuccessful)
                {
                    await onOk();
                }
            },
        });
    };
}

export function onCancelClickFactory(scheduleId, onOk = () => null)
{
    return () =>
    {
        Modal.confirm({
            title: '取消日程',
            content: '确认取消该日程吗？',
            onOk: async () =>
            {
                const requestIsSuccessful = await Api.sendPostCancelScheduleRequestAsync(scheduleId);
                if (requestIsSuccessful)
                {
                    await onOk();
                }
            },
        });
    };
}

export function onDeleteClickFactory(scheduleId, onOk = () => null)
{
    return () =>
    {
        Modal.confirm({
            title: '删除日程',
            content: '确认删除该日程吗？',
            okType: 'danger',
            onOk: async () =>
            {
                const requestIsSuccessful = await Api.sendPostDeleteScheduleRequestAsync(scheduleId);
                if (requestIsSuccessful)
                {
                    await onOk();
                }
            },
        });
    };
}

export function onModifyClickFactory(scheduleId, scheduleModifyModalId, afterClose = () => null)
{
    return async () =>
    {
        changeCurrentModifyingScheduleId(scheduleId);
        await ModalFunction.showModalAsync(scheduleModifyModalId);
        ModalFunction.afterModalClose(scheduleModifyModalId, afterClose);
    };
}