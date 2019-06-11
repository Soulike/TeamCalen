import React from 'react';
import Style from './Style.module.scss';
import Modal from '../../../../../../../ComponentContainer/Modal/Container';
import {MODAL_ID} from '../../../../../../../CONSTANT';
import DatePicker from 'antd/lib/date-picker';
import moment from 'moment';
import TimePicker from 'antd/lib/time-picker';
import Switch from 'antd/lib/switch';
import Input from 'antd/lib/input';
import Spin from 'antd/lib/spin';

const {TextArea} = Input;

interface Props
{
    modalId: MODAL_ID;
    initYear: string;
    initMonth: string;
    initDay: string;
    initStartHour: number;
    initStartMinute: number;
    initEndHour: number;
    initEndMinute: number;
    initScheduleText: string;
    initHasReminder: boolean;
    onStartDateChange: (date: moment.Moment, dateString: string) => void;
    onStartTimeChange: (time: moment.Moment, timeString: string) => void;
    onEndTimeChange: (time: moment.Moment, timeString: string) => void;
    onScheduleTextInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onReminderSwitchChange: (checked: boolean, event: MouseEvent) => any;
    onSubmit: (e: React.MouseEvent<any>) => void;
    onShow: () => any;
    confirmLoading: boolean;
    hasGotData: boolean;
}

function ScheduleModifyModal(props: Props)
{
    const {
        modalId,
        initYear,
        initMonth,
        initDay,
        initStartHour,
        initStartMinute,
        initEndHour,
        initEndMinute,
        initScheduleText,
        initHasReminder,
        onStartDateChange,
        onStartTimeChange,
        onEndTimeChange,
        onScheduleTextInputChange,
        onReminderSwitchChange,
        onSubmit,
        onShow,
        confirmLoading,
        hasGotData,
    } = props;
    return (
        <Modal modalId={modalId}
               title={'修改日程'}
               onOk={onSubmit}
               confirmLoading={confirmLoading}
               onShow={onShow}
               zIndex={1001}>
            <div className={Style.ScheduleModifyModal}>
                <Spin spinning={!hasGotData}>
                    <div className={Style.timeWrapper}>
                        <div className={Style.label}>开始时间</div>
                        <div className={Style.pickerWrapper}>
                            <div className={Style.startDateWrapper}>
                                <DatePicker className={Style.startDate}
                                            value={moment(`${initYear}-${initMonth}-${initDay}`, 'YYYY-MM-DD')}
                                            onChange={onStartDateChange}
                                            disabled={!hasGotData} />
                            </div>
                            <div className={Style.startTimeWrapper}>
                                <TimePicker className={Style.startTime}
                                            format={'HH:mm'}
                                            onChange={onStartTimeChange}
                                            value={moment(`${initStartHour}:${initStartMinute}`, 'HH:mm')}
                                            disabled={!hasGotData} />
                            </div>
                        </div>
                    </div>
                    <div className={Style.timeWrapper}>
                        <div className={Style.label}>结束时间</div>
                        <div className={Style.pickerWrapper}>
                            <div className={Style.endTimeWrapper}>
                                <TimePicker className={Style.endTime}
                                            format={'HH:mm'}
                                            onChange={onEndTimeChange}
                                            value={moment(`${initEndHour}:${initEndMinute}`, 'HH:mm')}
                                            disabled={!hasGotData} />
                            </div>
                        </div>
                    </div>
                    <div className={Style.scheduleTextWrapper}>
                        <div className={Style.title}>日程内容</div>
                        <TextArea className={Style.scheduleText}
                                  placeholder={'输入日程的具体内容'}
                                  onChange={onScheduleTextInputChange}
                                  value={initScheduleText}
                                  disabled={!hasGotData} />
                    </div>
                    <div className={Style.reminderSwitchWrapper}>
                        <div className={Style.label}>开启提醒</div>
                        <Switch onChange={onReminderSwitchChange} checked={initHasReminder} disabled={!hasGotData} />
                    </div>
                </Spin>
            </div>
        </Modal>
    );
}

export default React.memo(ScheduleModifyModal);