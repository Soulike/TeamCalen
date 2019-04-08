import React from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import Modal from '../../../../../../../ComponentContainer/Modal/Container';
import MODAL_ID from '../../../../../../../CONSTANT/MODAL_ID';
import DatePicker from 'antd/lib/date-picker';
import moment from 'moment';
import TimePicker from 'antd/lib/time-picker';
import Switch from 'antd/lib/switch';
import Input from 'antd/lib/input';

const {TextArea} = Input;

function ScheduleModifyModal(props)
{
    const {
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
        onScheduleTextChange,
        onReminderSwitchChange,
        onSubmit,
        onOpen,
        confirmLoading,
        hasGotData,
    } = props;
    return (
        <Modal modalId={MODAL_ID.SCHEDULE_MODIFY_MODAL}
               title={'修改日程'}
               onOk={onSubmit}
               confirmLoading={confirmLoading}
               onOpen={onOpen}>
            <div className={Style.ScheduleModifyModal}>
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
                              onChange={onScheduleTextChange}
                              value={initScheduleText}
                              disabled={!hasGotData} />
                </div>
                <div className={Style.reminderSwitchWrapper}>
                    <div className={Style.label}>开启提醒</div>
                    <Switch onChange={onReminderSwitchChange} checked={initHasReminder} disabled={!hasGotData} />
                </div>
            </div>
        </Modal>
    );
}

ScheduleModifyModal.propTypes = {   // props 里面全部都是初始值
    currentModifyingScheduleId: PropTypes.number.isRequired,
    initYear: PropTypes.string.isRequired,           // 年份，四位整数字符串
    initMonth: PropTypes.string.isRequired,      // 月份，两位整数字符串
    initDay: PropTypes.string.isRequired,         // 日，两位整数字符串
    initStartHour: PropTypes.number.isRequired,      // 开始小时，0-23 整数
    initStartMinute: PropTypes.number.isRequired,    // 开始分钟，0-59 整数
    initEndHour: PropTypes.number.isRequired,        // 结束小时，0-23 整数
    initEndMinute: PropTypes.number.isRequired,      // 结束分钟，0-59 整数
    initScheduleText: PropTypes.string.isRequired,   // 日程的具体内容
    initHasReminder: PropTypes.bool.isRequired,   // 是否开启提醒
    onStartDateChange: PropTypes.func.isRequired,
    onStartTimeChange: PropTypes.func.isRequired,
    onEndTimeChange: PropTypes.func.isRequired,
    onScheduleTextChange: PropTypes.func.isRequired,
    onReminderSwitchChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    confirmLoading: PropTypes.bool,
    onOpen: PropTypes.func,
    hasGotData: PropTypes.bool.isRequired,
};

export default ScheduleModifyModal;