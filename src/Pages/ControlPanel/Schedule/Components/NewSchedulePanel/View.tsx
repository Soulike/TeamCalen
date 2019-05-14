import React from 'react';
import Style from './Style.module.scss';
import Icon from 'antd/lib/icon';
import DatePicker from 'antd/lib/date-picker';
import TimePicker from 'antd/lib/time-picker';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Switch from 'antd/lib/switch';
import moment from 'moment';

const {TextArea} = Input;

interface Props
{
    onStartDateChange: (time: moment.Moment, timeString: string) => void;
    onStartTimeChange: (time: moment.Moment, timeString: string) => void;
    onEndTimeChange: (time: moment.Moment, timeString: string) => void;
    onReminderSwitchChange: (checked: boolean, event: MouseEvent) => any;
    onScheduleTextInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: React.MouseEventHandler<any>;
    startDate: moment.Moment;
    startTime: moment.Moment;
    endTime: moment.Moment;
    scheduleText: string;
    reminderSwitch: boolean;
}

function NewSchedulePanel(props: Props)
{
    const {
        onStartDateChange,
        onStartTimeChange,
        onEndTimeChange,
        onReminderSwitchChange,
        onScheduleTextInputChange,
        onSubmit,
        startDate,
        startTime,
        endTime,
        scheduleText,
        reminderSwitch,
    } = props;
    return (
        <div className={Style.NewSchedulePanel}>
            <div className={Style.title}>
                <Icon type="schedule" theme="twoTone" /> 新建日程
            </div>
            <div className={Style.timeWrapper}>
                <div className={Style.label}>开始时间</div>
                <div className={Style.pickerWrapper}>
                    <div className={Style.startDateWrapper}>
                        <DatePicker className={Style.startDate} value={startDate} onChange={onStartDateChange} />
                    </div>
                    <div className={Style.startTimeWrapper}>
                        <TimePicker className={Style.startTime}
                                    format={'HH:mm'}
                                    value={startTime}
                                    onChange={onStartTimeChange} />
                    </div>
                </div>
            </div>
            <div className={Style.timeWrapper}>
                <div className={Style.label}>结束时间</div>
                <div className={Style.pickerWrapper}>
                    <div className={Style.endTimeWrapper}>
                        <TimePicker className={Style.endTime}
                                    format={'HH:mm'}
                                    value={endTime}
                                    onChange={onEndTimeChange} />
                    </div>
                </div>
            </div>
            <div className={Style.scheduleTextWrapper}>
                <div className={Style.label}>日程内容</div>
                <TextArea className={Style.scheduleText}
                          placeholder={'输入日程的具体内容'}
                          value={scheduleText}
                          onChange={onScheduleTextInputChange} />
            </div>
            <div className={Style.reminderSwitchWrapper}>
                <div className={Style.label}>开启提醒</div>
                <Switch onChange={onReminderSwitchChange} checked={reminderSwitch} />
            </div>
            <div className={Style.submitButtonWrapper}>
                <Button htmlType={'button'} type={'primary'} size={'large'} onClick={onSubmit}>提交</Button>
            </div>
        </div>
    );
}

export default React.memo(NewSchedulePanel);