import React from 'react';
import ScheduleOverview from './View';
import moment from 'moment';
import * as newScheduleActions from '../../Actions/Actions';
import {connect} from 'react-redux';
import {Actions as ModalActions} from '../../../../../ComponentContainer/Modal';
import MODAL_ID from '../../../../../CONSTANT/MODAL_ID';
import {Object as TimelineItemObject} from './Components/TimelineItem';

class ScheduleOverviewContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        const nowMoment = moment();
        this.state = {
            selectedYear: nowMoment.format('YYYY'), // 当前被选择的日期，用于获取每月数量
            selectedMonth: nowMoment.format('MM'),
            clickedYear: nowMoment.format('YYYY'),  // 当前被点击的日期，用于获取具体日程列表
            clickedMonth: nowMoment.format('MM'),
            clickedDay: nowMoment.format('DD'),
        };
    }

    componentDidMount()
    {
        const {selectedYear, selectedMonth} = this.state;
        const {getEveryDayScheduleAmountInAMonth, getRecentSchedules} = this.props;
        getEveryDayScheduleAmountInAMonth(selectedYear, selectedMonth);
        getRecentSchedules(10);
    }

    onPanelChange = date =>
    {
        const {getEveryDayScheduleAmountInAMonth} = this.props;
        const selectedYear = date.format('YYYY');
        const selectedMonth = date.format('MM');
        this.setState({
            selectedYear,
            selectedMonth,
        }, () =>
        {
            getEveryDayScheduleAmountInAMonth(selectedYear, selectedMonth);
        });
    };

    onSelect = date =>
    {
        const {showModal} = this.props;

        this.setState({
            clickedYear: date.format('YYYY'),
            clickedMonth: date.format('MM'),
            clickedDay: date.format('DD'),
        }, () =>
        {
            showModal(MODAL_ID.SCHEDULE_MODAL);
        });
    };

    render()
    {
        const {scheduleAmount, recentSchedules} = this.props;
        const {selectedYear, selectedMonth, clickedYear, clickedMonth, clickedDay} = this.state;

        const timelineItems = [];
        recentSchedules.forEach(schedule =>
        {
            const {
                month,
                day,
                startHour,
                startMinute,
                endHour,
                endMinute,
                scheduleText,
                scheduleState,
            } = schedule;
            timelineItems.push(
                new TimelineItemObject.TimelineItem(month, day, startHour, startMinute, endHour, endMinute,
                    scheduleText, scheduleState,
                    () => null, () => null, () => null, () => null, () => null),
            );
        });

        return (
            <ScheduleOverview onPanelChange={this.onPanelChange}
                              scheduleAmount={scheduleAmount}
                              selectedYear={selectedYear}
                              selectedMonth={selectedMonth}
                              clickedYear={clickedYear}
                              clickedMonth={clickedMonth}
                              clickedDay={clickedDay}
                              onSelect={this.onSelect}
                              timelineItems={timelineItems} />
        );
    }
}

const mapStateToProps = state =>
{
    const {NewSchedule: {scheduleAmount, recentSchedules}} = state;
    return {
        scheduleAmount,
        recentSchedules,
    };
};

const mapDispatchToProps = {
    getEveryDayScheduleAmountInAMonth: newScheduleActions.getEveryDayScheduleAmountInAMonthAction,
    getRecentSchedules: newScheduleActions.getRecentSchedulesAction,
    showModal: ModalActions.showModalAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleOverviewContainer);