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

// import SCHEDULE_STATE from '../../../../../../../CONSTANT/SCHEDULE_STATE';

class ScheduleModalContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            timelineItems: [
                /*{
                    month: '03',
                    day: '31',
                    startHour: 8,
                    startMinute: 10,
                    endHour: 12,
                    endMinute: 30,
                    scheduleText: '英语作业啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                    scheduleState: SCHEDULE_STATE.CANCELED,
                },
                {
                    month: '03',
                    day: '31',
                    startHour: 12,
                    startMinute: 30,
                    endHour: 14,
                    endMinute: 30,
                    scheduleText: '高数作业',
                    scheduleState: SCHEDULE_STATE.FINISHED,
                },
                {
                    day: '31',
                    startHour: 14,
                    startMinute: 30,
                    endHour: 18,
                    endMinute: 30,
                    scheduleText: '英语作业',
                    scheduleState: SCHEDULE_STATE.UNFINISHED,
                },*/
            ],
        };
    }

    setStateAsync = async state =>
    {
        return new Promise(resolve =>
        {
            this.setState(state, resolve);
        });
    };

    refreshSchedulesFactory = () =>
    {
        return async () =>
        {
            updateScheduleInfo();
            const {year, month, day} = this.props;
            const schedulesWrapper = await Api.sendGetSchedulesByDayRequestAsync(year, month, day);
            if (schedulesWrapper)
            {
                const {schedules} = schedulesWrapper;
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
                            onSwitchChangeFactory(id, this.refreshSchedulesFactory()),
                            onResumeClickFactory(id, this.refreshSchedulesFactory()),
                            onCancelClickFactory(id, this.refreshSchedulesFactory()),
                            onDeleteClickFactory(id, this.refreshSchedulesFactory()),
                            onModifyClickFactory(id, MODAL_ID.SCHEDULE_MODIFY_MODAL_FOR_SCHEDULE_MODAL, this.refreshSchedulesFactory()),
                            // TODO: BUG，第一次事件没有挂上
                        ),
                    );
                });
                await this.setStateAsync({timelineItems});
            }
        };
    };

    onShow = async () =>
    {
        await this.setStateAsync({timelineItems: []});
        await (this.refreshSchedulesFactory())();
    };

    render()
    {
        const {year, month, day} = this.props;
        const {timelineItems} = this.state;
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