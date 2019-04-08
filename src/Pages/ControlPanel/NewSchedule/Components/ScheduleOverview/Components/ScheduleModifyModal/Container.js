import React from 'react';
import ScheduleModifyModal from './View';
import {connect} from 'react-redux';
import Api from '../../../../../../../Api';
import {REGEX} from '../../../../../../../CONSTANT/REGEX';
import message from 'antd/lib/message';
import {Actions as ModalActions} from '../../../../../../../ComponentContainer/Modal';
import MODAL_ID from '../../../../../../../CONSTANT/MODAL_ID';
import * as newScheduleActions from '../../../../Actions/Actions';

class ScheduleModifyModalContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            year: '0000',           // 年份，四位整数字符串
            month: '01',          // 月份，两位整数字符串
            day: '01',            // 日，两位整数字符串
            startHour: 0,      // 开始小时，0-23 整数
            startMinute: 0,    // 开始分钟，0-59 整数
            endHour: 0,        // 结束小时，0-23 整数
            endMinute: 0,      // 结束分钟，0-59 整数
            scheduleText: '',   // 日程的具体内容
            hasReminder: false,   // 是否开启提醒
            hasGotData: false,   // 是否已经从服务器获取了数据

            confirmLoading: false,  // 是否还未提交完成
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {currentModifyingScheduleId} = this.props;
        const {currentModifyingScheduleId: prevCurrentModifyingScheduleId} = prevProps;
        if (currentModifyingScheduleId !== prevCurrentModifyingScheduleId)
        {
            this.setState({
                hasGotData: false,
            }, async () =>
            {
                await this.getScheduleByIdAsync();
                this.setState({
                    hasGotData: true,
                });
            });
        }

    }

    // 获取日程信息
    getScheduleByIdAsync = async () =>
    {
        const {currentModifyingScheduleId} = this.props;
        const schedule = await Api.sendGetScheduleByIdRequestAsync(currentModifyingScheduleId);
        if (schedule)
        {
            this.setState({
                ...schedule,
            });
        }
    };

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
                year: '0000',
                month: '01',
                day: '01',
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
        const {year, month, day, startHour, startMinute, endHour, endMinute, hasReminder, scheduleText} = this.state;
        const {getRecentSchedules, getEveryDayScheduleAmountInAMonth, currentModifyingScheduleId} = this.props;

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
            this.setState({
                confirmLoading: true,
            });
            const requestIsSuccessful = await Api.sendPostModifyScheduleRequestAsync(currentModifyingScheduleId, year, month, day,
                startHour, startMinute, endHour, endMinute, scheduleText, hasReminder);
            if (requestIsSuccessful)
            {
                const {selectedYear, selectedMonth, hideModal} = this.props;
                this.setState({
                    confirmLoading: false,
                });
                hideModal(MODAL_ID.SCHEDULE_MODIFY_MODAL);
                getRecentSchedules();
                getEveryDayScheduleAmountInAMonth(selectedYear, selectedMonth);
            }
        }
    };

    onScheduleTextChange = e =>
    {
        this.setState({
            scheduleText: e.target.value,
        });
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
                                 onStartDateChange={this.onStartDateChange}
                                 onStartTimeChange={this.onStartTimeChange}
                                 onEndTimeChange={this.onEndTimeChange}
                                 onScheduleTextChange={this.onScheduleTextChange}
                                 onReminderSwitchChange={this.onReminderSwitchChange}
                                 onSubmit={this.onSubmit}
                                 hasGotData={hasGotData} />
        );
    }
}

const mapStateToProps = state =>
{
    const {NewSchedule: {currentModifyingScheduleId, selectedYear, selectedMonth}} = state;
    return {
        currentModifyingScheduleId,
        selectedYear,
        selectedMonth,
    };
};

const mapDispatchToProps = {
    getEveryDayScheduleAmountInAMonth: newScheduleActions.getEveryDayScheduleAmountInAMonthAction,
    getRecentSchedules: newScheduleActions.getRecentSchedulesAction,
    hideModal: ModalActions.hideModalAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleModifyModalContainer);