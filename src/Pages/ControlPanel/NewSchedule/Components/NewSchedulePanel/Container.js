import React from 'react';
import NewSchedulePanel from './View';
import moment from 'moment';
import {REGEX} from '../../../../../CONSTANT/REGEX';
import message from 'antd/lib/message';
import Api from '../../../../../Api';
import {updateScheduleInfo} from '../../Function';

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
            startHour: Number.parseInt(now.format('HH')),
            startMinute: Number.parseInt(now.format('mm')),
            endHour: Number.parseInt(now.format('HH')),
            endMinute: Number.parseInt(now.format('mm')),
            hasReminder: false,
            scheduleText: '',
        };
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
            const now = moment();
            this.setState({
                year: now.format('YYYY'),
                month: now.format('MM'),
                day: now.format('DD'),
            });
        }
    };

    onStartTimeChange = date =>
    {
        if (date !== null)
        {
            this.setState({
                startHour: Number.parseInt(date.format('HH')),
                startMinute: Number.parseInt(date.format('mm')),
            });
        }
        else
        {
            const now = moment();
            this.setState({
                startHour: Number.parseInt(now.format('HH')),
                startMinute: Number.parseInt(now.format('mm')),
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
            const now = moment();
            this.setState({
                endHour: Number.parseInt(now.format('HH')),
                endMinute: Number.parseInt(now.format('mm')),
            });
        }
    };

    onScheduleTextInputChange = e =>
    {
        this.setState({
            scheduleText: e.target.value,
        });
    };

    onReminderSwitchChange = checked =>
    {
        this.setState({
            hasReminder: checked,
        });
    };

    onSubmit = async () =>
    {
        const {year, month, day, startHour, startMinute, endHour, endMinute, scheduleText, hasReminder} = this.state;

        if (startHour > endHour || (startHour === endHour && startMinute > endMinute))
        {
            message.warning('结束时间不能早于开始时间');
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
                updateScheduleInfo();
                const now = moment();
                this.setState({
                    year: now.format('YYYY'),
                    month: now.format('MM'),
                    day: now.format('DD'),
                    startHour: Number.parseInt(now.format('HH')),
                    startMinute: Number.parseInt(now.format('mm')),
                    endHour: Number.parseInt(now.format('HH')),
                    endMinute: Number.parseInt(now.format('mm')),
                    hasReminder: false,
                    scheduleText: '',
                });
            }
        }
    };


    render()
    {
        const {year, month, day, startHour, startMinute, endHour, endMinute, scheduleText, hasReminder} = this.state;
        return (
            <NewSchedulePanel startDate={moment(`${year}-${month}-${day}`, 'YYYY-MM-DD')}
                              startTime={moment(`${startHour}:${startMinute}`, 'HH:mm')}
                              endTime={moment(`${endHour}:${endMinute}`, 'HH:mm')}
                              reminderSwitch={hasReminder}
                              scheduleText={scheduleText}
                              onScheduleTextInputChange={this.onScheduleTextInputChange}
                              onStartDateChange={this.onStartDateChange}
                              onStartTimeChange={this.onStartTimeChange}
                              onEndTimeChange={this.onEndTimeChange}
                              onReminderSwitchChange={this.onReminderSwitchChange}
                              onSubmit={this.onSubmit}
            />
        );
    }
}

export default NewSchedulePanelContainer;