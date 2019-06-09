import React from 'react';
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
import {eventEmitter} from '../../../../../../../Singleton';
import {EVENT, SCHEDULE_STATE} from '../../../../../../../CONSTANT';
import {Schedule} from '../../../../../../../Class';

interface Props
{
    year: string;
    month: string;
    day: string;
}

interface State
{
    schedules: Array<Schedule>;
    hasGotData: boolean;
}

class ScheduleModalContainer extends React.Component<Props, State>
{
    constructor(props: Readonly<Props>)
    {
        super(props);
        this.state = {
            schedules: [],

            hasGotData: false,
        };
    }

    componentDidMount()
    {
        eventEmitter.on(EVENT.SCHEDULE.SCHEDULE_MODIFIED, async () =>
        {
            await this.updateSchedulesInState();
        });

        eventEmitter.on(EVENT.SCHEDULE.SCHEDULE_CREATED_OR_DELETED, async () =>
        {
            await this.updateSchedulesInState();
        });
    }

    setStateAsync = async (state: object) =>
    {
        return new Promise(resolve =>
        {
            this.setState(state, resolve);
        });
    };

    updateSchedulesInState = async () =>
    {
        const {year, month, day} = this.props;
        await this.setStateAsync({
            hasGotData: false,
        });
        const schedulesWrapper = await Api.sendGetSchedulesByDayRequestAsync(year, month, day);
        if (schedulesWrapper)
        {
            if (schedulesWrapper)
            {
                const {schedules} = schedulesWrapper;
                await this.setStateAsync({
                    schedules,
                    hasGotData: true,
                });
            }
        }
    };

    onShow = async () =>
    {
        await this.setStateAsync({
            schedules: [],
        });
        await this.updateSchedulesInState();
    };

    render()
    {
        const {year, month, day} = this.props;
        const {schedules, hasGotData} = this.state;
        const timelineItems: Array<TimelineItemObject.TimelineItem> = [];
        schedules.forEach((schedule: Schedule) =>
        {
            const {
                id,
                day,
                startTime,
                endTime,
                scheduleText,
                scheduleState,
            } = schedule;
            // 从后端返回的对象，这些数据项一定都存在，因此进行强制类型转换
            timelineItems.push(
                new TimelineItemObject.TimelineItem(
                    id as number,
                    ((day as Date).getMonth() + 1).toString(),
                    ((day as Date).getDate()).toString(),
                    (startTime as Date).getHours(),
                    (startTime as Date).getMinutes(),
                    (endTime as Date).getHours(),
                    (endTime as Date).getMinutes(),
                    scheduleText as string, scheduleState ? SCHEDULE_STATE.FINISHED : SCHEDULE_STATE.UNFINISHED,
                    onSwitchChangeFactory(id as number),
                    onResumeClickFactory(id as number),
                    onCancelClickFactory(id as number),
                    onDeleteClickFactory(id as number),
                    onModifyClickFactory(id as number),
                ),
            );
        });
        return (
            <ScheduleModal year={year}
                           month={month}
                           day={day}
                           timelineItems={timelineItems}
                           onShow={this.onShow}
                           hasGotData={hasGotData} />
        );
    }
}

export default ScheduleModalContainer;