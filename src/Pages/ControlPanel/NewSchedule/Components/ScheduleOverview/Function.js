import Api from '../../../../../Api';
import {changeCurrentModifyingScheduleId} from '../../Function';
import Modal from 'antd/lib/modal';
import {Function as ModalFunction} from '../../../../../ComponentContainer/Modal';
import MODAL_ID from '../../../../../CONSTANT/MODAL_ID';

export function onSwitchChangeFactory(scheduleId, onOk)
{
    return async checked =>
    {
        const requestIsSuccessful = await Api.sendPostChangeScheduleStateRequestAsync(scheduleId, checked);
        if (requestIsSuccessful)
        {
            onOk();
        }
    };
}

export function onResumeClickFactory(scheduleId, onOk)
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
                    onOk();
                }
            },
        });
    };
}

export function onCancelClickFactory(scheduleId, onOk)
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
                    onOk();
                }
            },
        });
    };
}

export function onDeleteClickFactory(scheduleId, onOk)
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

export function onModifyClickFactory(scheduleId)
{
    return async () =>
    {
        changeCurrentModifyingScheduleId(scheduleId);
        ModalFunction.showModal(MODAL_ID.SCHEDULE_MODIFY_MODAL);
    };
}