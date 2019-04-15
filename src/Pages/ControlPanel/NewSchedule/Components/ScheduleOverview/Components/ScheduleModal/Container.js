import React from 'react';
import PropTypes from 'prop-types';
import ScheduleModal from './View';
import Api from '../../../../../../../Api';
import {Object as TimelineItemObject} from '../TimelineItem';
import {
    onCancelClickFactory,
    onDeleteClickFactory,
    onModifyClickFactory,
    onResumeClickFactory,
    onSwitchChangeFactory,
} from '../../Function';
import {updateScheduleInfo} from '../../../../Function';
import MODAL_ID from '../../../../../../../CONSTANT/MODAL_ID';

class ScheduleModalContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            schedules: [],
        };
    }

    refreshSchedules = async () =>
    {
        updateScheduleInfo();
        const {year, month, day} = this.props;
        const schedulesWrapper = await Api.sendGetSchedulesByDayRequestAsync(year, month, day);
        if (schedulesWrapper)
        {
            if (schedulesWrapper)
            {
                const {schedules} = schedulesWrapper;
                this.setState(schedules);
            }
        }
    };

    onShow = async () =>
    {
        await this.refreshSchedules();
    };

    render()
    {
        const {year, month, day} = this.props;
        const {schedules} = this.state;
        const timelineItems = [];
        schedules.forEach(schedule =>
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
                    onSwitchChangeFactory(id, this.refreshSchedules),
                    onResumeClickFactory(id, this.refreshSchedules),
                    onCancelClickFactory(id, this.refreshSchedules),
                    onDeleteClickFactory(id, this.refreshSchedules),
                    onModifyClickFactory(id, MODAL_ID.SCHEDULE_MODIFY_MODAL_FOR_SCHEDULE_MODAL, this.refreshSchedules),
                ),
            );
        });
        return (
            <ScheduleModal year={year}
                           month={month}
                           day={day}
                           timelineItems={timelineItems} onShow={this.onShow} />
        );
    }
}

ScheduleModalContainer.propTypes = {
    year: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
};

export default ScheduleModalContainer;