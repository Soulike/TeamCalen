import React from 'react';
import NewSchedulePanel from './View';
import moment from 'moment';
import {REGEX} from '../../../../../CONSTANT/REGEX';
import message from 'antd/lib/message';
import Api from '../../../../../Api';
import * as Actions from '../../Actions/Actions';
import {connect} from 'react-redux';

class NewSchedulePanelContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        const now = moment();
        this.state = {
            year: now.format('YYYY'),
            month: now.format('MM'),
            day: now.format('DD'),
            startHour: -1,
            startMinute: -1,
            endHour: -1,
            endMinute: -1,
            hasReminder: false,
        };
        this.scheduleTextRef = React.createRef();
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
                startHour: -1,
                startMinute: -1,
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
                endHour: -1,
                endMinute: -1,
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
            const requestIsSuccessful = await Api.sendPostCreateScheduleRequestAsync(year, month, day,
                startHour, startMinute, endHour, endMinute, scheduleText, hasReminder);
            if (requestIsSuccessful)
            {
                const {selectedYear, selectedMonth} = this.props;
                getRecentSchedules();
                getEveryDayScheduleAmountInAMonth(selectedYear, selectedMonth);
            }
        }
    };


    render()
    {
        return (
            <NewSchedulePanel onStartDateChange={this.onStartDateChange}
                              onStartTimeChange={this.onStartTimeChange}
                              onEndTimeChange={this.onEndTimeChange}
                              onReminderSwitchChange={this.onReminderSwitchChange}
                              onSubmit={this.onSubmit}
                              scheduleTextRef={this.scheduleTextRef} />
        );
    }
}

const mapStateToProps = state =>
{
    const {NewSchedule: {selectedYear, selectedMonth}} = state;
    return {
        selectedYear,
        selectedMonth,
    };
};

const mapDispatchToProps = {
    getRecentSchedules: Actions.getRecentSchedulesAction,
    getEveryDayScheduleAmountInAMonth: Actions.getEveryDayScheduleAmountInAMonthAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewSchedulePanelContainer);