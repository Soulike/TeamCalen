import Api from '../../../../../Api';
import {changeCurrentModifyingScheduleId} from '../../Function';
import Modal from 'antd/lib/modal';
import {Function as ModalFunction} from '../../../../../ComponentContainer/Modal';
import {eventEmitter} from '../../../../../Singleton';
import {EVENT, MODAL_ID, SCHEDULE_STATE} from '../../../../../CONSTANT';

export function onSwitchChangeFactory(scheduleId: number)
{
    return async (checked: boolean) =>
    {
        const requestIsSuccessful = await Api.sendPostChangeScheduleStateRequestAsync(scheduleId,
            checked ? SCHEDULE_STATE.FINISHED : SCHEDULE_STATE.UNFINISHED);
        if (requestIsSuccessful)
        {
            eventEmitter.emit(EVENT.SCHEDULE.SCHEDULE_MODIFIED);
        }
    };
}

export function onResumeClickFactory(scheduleId: number)
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

export function onCancelClickFactory(scheduleId: number)
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

export function onDeleteClickFactory(scheduleId: number)
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

export function onModifyClickFactory(scheduleId: number)
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