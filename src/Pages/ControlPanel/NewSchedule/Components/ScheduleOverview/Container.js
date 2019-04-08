import React from 'react';
import ScheduleOverview from './View';
import moment from 'moment';
import * as newScheduleActions from '../../Actions/Actions';
import {connect} from 'react-redux';
import {Actions as ModalActions} from '../../../../../ComponentContainer/Modal';
import MODAL_ID from '../../../../../CONSTANT/MODAL_ID';
import {Object as TimelineItemObject} from './Components/TimelineItem';
import {
    onCancelClickFactory,
    onDeleteClickFactory,
    onModifyClickFactory,
    onResumeClickFactory,
    onSwitchChangeFactory,
} from './Function';

class ScheduleOverviewContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        const nowMoment = moment();

        this.state = {
            clickedYear: nowMoment.format('YYYY'),  // 当前被点击的日期，用于获取具体日程列表
            clickedMonth: nowMoment.format('MM'),
            clickedDay: nowMoment.format('DD'),
        };
    }

    componentDidMount()
    {
        const {getEveryDayScheduleAmountInAMonth, getRecentSchedules, selectedYear, selectedMonth} = this.props;
        getEveryDayScheduleAmountInAMonth(selectedYear, selectedMonth);
        getRecentSchedules(10);
    }

    onPanelChange = date =>
    {
        const {getEveryDayScheduleAmountInAMonth, changeSelectedYearAndMonth} = this.props;
        const selectedYear = date.format('YYYY');
        const selectedMonth = date.format('MM');
        changeSelectedYearAndMonth(selectedYear, selectedMonth);
        getEveryDayScheduleAmountInAMonth(selectedYear, selectedMonth);
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

    loadRecentSchedules = () =>
    {
        const {getRecentSchedules} = this.props;
        getRecentSchedules(10);
    };

    render()
    {
        const {selectedYear, selectedMonth, scheduleAmount, recentSchedules} = this.props;
        const {clickedYear, clickedMonth, clickedDay} = this.state;

        const timelineItems = [];
        recentSchedules.forEach(schedule =>
        {
            const {
                id,
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
                new TimelineItemObject.TimelineItem(id, month, day, startHour, startMinute, endHour, endMinute,
                    scheduleText, scheduleState,
                    onSwitchChangeFactory(id, this.loadRecentSchedules),
                    onResumeClickFactory(id, this.loadRecentSchedules),
                    onCancelClickFactory(id, this.loadRecentSchedules),
                    onDeleteClickFactory(id, this.loadRecentSchedules),
                    onModifyClickFactory(id)),
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
    const {NewSchedule: {scheduleAmount, recentSchedules, selectedYear, selectedMonth}} = state;
    return {
        scheduleAmount,
        recentSchedules,
        selectedYear,
        selectedMonth,
    };
};

const mapDispatchToProps = {
    getEveryDayScheduleAmountInAMonth: newScheduleActions.getEveryDayScheduleAmountInAMonthAction,
    getRecentSchedules: newScheduleActions.getRecentSchedulesAction,
    showModal: ModalActions.showModalAction,
    changeSelectedYearAndMonth: newScheduleActions.changeSelectedYearAndMonthAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleOverviewContainer);