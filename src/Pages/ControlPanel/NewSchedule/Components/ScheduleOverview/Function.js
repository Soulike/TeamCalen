import Api from '../../../../../Api';
import {changeCurrentModifyingScheduleId} from '../../Function';
import Modal from 'antd/lib/modal';
import {Function as ModalFunction} from '../../../../../ComponentContainer/Modal';
import {eventEmitter} from '../../../../../Singleton';
import EVENT from '../../../../../CONSTANT/EVENT';
import MODAL_ID from '../../../../../CONSTANT/MODAL_ID';

export function onSwitchChangeFactory(scheduleId)
{
    return async checked =>
    {
        const requestIsSuccessful = await Api.sendPostChangeScheduleStateRequestAsync(scheduleId, checked);
        if (requestIsSuccessful)
        {
            eventEmitter.emit(EVENT.SCHEDULE.SCHEDULE_MODIFIED);
        }
    };
}

export function onResumeClickFactory(scheduleId)
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
                    eventEmitter.emit(EVENT.SCHEDULE.SCHEDULE_MODIFIED);
                }
            },
        });
    };
}

export function onCancelClickFactory(scheduleId)
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
                    eventEmitter.emit(EVENT.SCHEDULE.SCHEDULE_MODIFIED);
                }
            },
        });
    };
}

export function onDeleteClickFactory(scheduleId)
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
                    eventEmitter.emit(EVENT.SCHEDULE.SCHEDULE_CREATED_OR_DELETED);
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
        await ModalFunction.showModalAsync(MODAL_ID.SCHEDULE_MODIFY_MODAL);
        ModalFunction.afterModalClose(MODAL_ID.SCHEDULE_MODIFY_MODAL, () =>
        {
            eventEmitter.emit(EVENT.SCHEDULE.SCHEDULE_MODIFIED);
        });
    };
}