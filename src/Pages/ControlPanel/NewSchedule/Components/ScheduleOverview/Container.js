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
import {updateScheduleInfo} from '../../Function';

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
        updateScheduleInfo();
    }

    onPanelChange = date =>
    {
        const {changeSelectedYearAndMonth} = this.props;
        const selectedYear = date.format('YYYY');
        const selectedMonth = date.format('MM');
        changeSelectedYearAndMonth(selectedYear, selectedMonth);
        updateScheduleInfo();
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
                    onSwitchChangeFactory(id, updateScheduleInfo),
                    onResumeClickFactory(id, updateScheduleInfo),
                    onCancelClickFactory(id, updateScheduleInfo),
                    onDeleteClickFactory(id, updateScheduleInfo),
                    onModifyClickFactory(id, MODAL_ID.SCHEDULE_MODIFY_MODAL_FOR_RECENT_SCHEDULES, updateScheduleInfo),
                ),
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
    showModal: ModalActions.showModalAction,
    changeSelectedYearAndMonth: newScheduleActions.changeSelectedYearAndMonthAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleOverviewContainer);