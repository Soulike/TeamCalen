import React from 'react';
import ScheduleModifyModal from './View';
import {connect} from 'react-redux';
import Api from '../../../../../../../Api';
import {REGEX} from '../../../../../../../CONSTANT/REGEX';
import message from 'antd/lib/message';
import {hideModal} from '../../../../../../../ComponentContainer/Modal/Function';
import MODAL_ID from '../../../../../../../CONSTANT/MODAL_ID';

class ScheduleModifyModalContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            year: '',           // 年份，四位整数字符串
            month: '',          // 月份，两位整数字符串
            day: '',            // 日，两位整数字符串
            startHour: 0,      // 开始小时，0-23 整数
            startMinute: 0,    // 开始分钟，0-59 整数
            endHour: 0,        // 结束小时，0-23 整数
            endMinute: 0,      // 结束分钟，0-59 整数
            scheduleText: '',   // 日程的具体内容
            hasReminder: false,   // 是否开启提醒
            hasGotData: false,   // 是否已经从服务器获取了数据
        };

        this.scheduleTextRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (this.props.currentModifyingScheduleId !== prevProps.currentModifyingScheduleId)
        {
            this.setState({
                hasGotData: false,
            }, async () =>
            {
                const {currentModifyingScheduleId} = this.props;
                const schedule = await Api.sendGetScheduleByIdRequestAsync(currentModifyingScheduleId);
                if (schedule)
                {
                    this.setState({
                        ...schedule,
                        hasGotData: true,
                    });
                }
                else
                {
                    hideModal(MODAL_ID.SCHEDULE_MODIFY_MODAL);
                }
            });
        }
    }

    onStartDateChange = date =>
    {
        if (date !== null)
        {
            this.setState({
                year: date.format('YYYY'),
                month: date.format('MM'),
                day: date.format('DD'),
            });
        }
        else        // 如果用户清空了选框
        {
            this.setState({
                year: '',
                month: '',
                day: '',
            });
        }
    };

    onStartTimeChange = date =>
    {
        if (date !== null)
        {
            this.setState({
                startHour: Number.parseInt(date.format('HH')),
                startMinute: Number.parseInt(date.format('ss')),
            });
        }
        else
        {
            this.setState({
                startHour: 0,
                startMinute: 0,
            });
        }
    };

    onEndTimeChange = date =>
    {
        if (date !== null)
        {
            this.setState({
                endHour: Number.parseInt(date.format('HH')),
                endMinute: Number.parseInt(date.format('mm')),
            });
        }
        else
        {
            this.setState({
                endHour: 0,
                endMinute: 0,
            });
        }
    };

    onReminderSwitchChange = checked =>
    {
        this.setState({
            hasReminder: checked,
        });
    };

    onSubmit = async () =>
    {
        const {year, month, day, startHour, startMinute, endHour, endMinute, hasReminder} = this.state;
        const scheduleText = this.scheduleTextRef.current.textAreaRef.value;
        const {getRecentSchedules, getEveryDayScheduleAmountInAMonth} = this.props;

        if (!REGEX.YEAR.test(year) || !REGEX.MONTH.test(month) || !REGEX.DAY.test(day))
        {
            message.warning('选择日期无效');
        }
        else if (startHour === -1 || startMinute === -1)
        {
            message.warning('开始时间无效');
        }
        else if (endHour === -1 || endMinute === -1)
        {
            message.warning('结束时间无效');
        }
        else if (!REGEX.SCHEDULE_TEXT.test(scheduleText))
        {
            message.warning('日程内容太长或太短');
        }
        else
        {
            const requestIsSuccessful = await Api.sendPostModifyScheduleRequestAsync(year, month, day,
                startHour, startMinute, endHour, endMinute, scheduleText, hasReminder);
            if (requestIsSuccessful)
            {
                getRecentSchedules();
                getEveryDayScheduleAmountInAMonth();
            }
        }
    };

    render()
    {
        const {year, month, day, startHour, startMinute, endHour, endMinute, scheduleText, hasReminder, hasGotData} = this.state;
        const {currentModifyingScheduleId} = this.props;
        return (
            <ScheduleModifyModal initYear={year}
                                 initMonth={month}
                                 initDay={day}
                                 initStartHour={startHour}
                                 initStartMinute={startMinute}
                                 initEndHour={endHour}
                                 initEndMinute={endMinute}
                                 initScheduleText={scheduleText}
                                 initHasReminder={hasReminder}
                                 currentModifyingScheduleId={currentModifyingScheduleId}
                                 scheduleTextRef={this.scheduleTextRef}
                                 onStartDateChange={this.onStartDateChange}
                                 onStartTimeChange={this.onStartTimeChange}
                                 onEndTimeChange={this.onEndTimeChange}
                                 onReminderSwitchChange={this.onReminderSwitchChange}
                                 onSubmit={this.onSubmit}
                                 hasGotData={hasGotData} />
        );
    }
}

const mapStateToProps = state =>
{
    const {NewSchedule: {currentModifyingScheduleId}} = state;
    return {currentModifyingScheduleId};
};

export default connect(mapStateToProps)(ScheduleModifyModalContainer);