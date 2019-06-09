import React from 'react';
import ScheduleOverview from './View';
import moment from 'moment';
import {connect} from 'react-redux';
import {Actions as ModalActions} from '../../../../../ComponentContainer/Modal';
import {EVENT, MODAL_ID, SCHEDULE_STATE} from '../../../../../CONSTANT';
import {Object as TimelineItemObject} from './Components/TimelineItem';
import {
    onCancelClickFactory,
    onDeleteClickFactory,
    onModifyClickFactory,
    onResumeClickFactory,
    onSwitchChangeFactory,
} from './Function';
import Api from '../../../../../Api';
import {eventEmitter} from '../../../../../Singleton';
import {Schedule} from '../../../../../Class';

interface Props
{
    showModal: (modalId: MODAL_ID) => any;
}

interface State
{
    clickedYear: string,
    clickedMonth: string,
    clickedDay: string,
    selectedYear: string,
    selectedMonth: string,
    everyDayScheduleAmountInAMonth: Array<number>,
    recentSchedules: Array<Schedule>,
    hasGotEveryDayScheduleAmountInAMonth: boolean,
    hasGotRecentSchedules: boolean,
}

class ScheduleOverviewContainer extends React.Component<Props, State>
{
    constructor(props: Readonly<Props>)
    {
        super(props);
        const nowMoment = moment();

        this.state = {
            clickedYear: nowMoment.format('YYYY'),  // 当前被点击的日期，用于获取具体日程列表
            clickedMonth: nowMoment.format('MM'),
            clickedDay: nowMoment.format('DD'),

            selectedYear: nowMoment.format('YYYY'), // 当前选择显示数量的年月
            selectedMonth: nowMoment.format('MM'),

            everyDayScheduleAmountInAMonth: [], // 选择年月每一天的日程数量
            recentSchedules: [],

            hasGotEveryDayScheduleAmountInAMonth: false,
            hasGotRecentSchedules: false,
        };
    }

    setStateAsync = async (state: object) =>
    {
        return new Promise(resolve =>
        {
            this.setState(state, resolve);
        });
    };

    componentDidMount()
    {
        const modifyListener = async () =>
        {
            await Promise.all([
                this.updateEveryDayScheduleAmountInState(),
                this.updateRecentSchedulesInState(),
            ]);
        };

        Promise.all([
            this.updateEveryDayScheduleAmountInState(),
            this.updateRecentSchedulesInState(),
        ])
            .then(() =>
            {
                eventEmitter.on(EVENT.SCHEDULE.SCHEDULE_CREATED_OR_DELETED, modifyListener);
                eventEmitter.on(EVENT.SCHEDULE.SCHEDULE_MODIFIED, modifyListener);
            });
    }

    componentWillUnmount()
    {
        eventEmitter
            .removeAllListeners(EVENT.SCHEDULE.SCHEDULE_MODIFIED)
            .removeAllListeners(EVENT.SCHEDULE.SCHEDULE_CREATED_OR_DELETED);
    }

    updateEveryDayScheduleAmountInState = async () =>
    {
        const {
            selectedYear,
            selectedMonth,
        } = this.state;
        await this.setStateAsync({
            hasGotEveryDayScheduleAmountInAMonth: false,
        });
        const scheduleAmountWrapper = await Api.sendGetEveryDayScheduleAmountInAMonthRequestAsync(selectedYear, selectedMonth);
        if (scheduleAmountWrapper)
        {

            await this.setStateAsync({
                // @ts-ignore
                everyDayScheduleAmountInAMonth: scheduleAmountWrapper['scheduleAmount'],
                hasGotEveryDayScheduleAmountInAMonth: true,
            });
        }
    };

    updateRecentSchedulesInState = async () =>
    {
        await this.setStateAsync({
            hasGotRecentSchedules: false,
        });
        const recentSchedulesWrapper = await Api.sendGetRecentSchedulesRequestAsync(10);
        if (recentSchedulesWrapper)
        {
            await this.setStateAsync({
                recentSchedules: recentSchedulesWrapper['schedules'],
                hasGotRecentSchedules: true,
            });
        }
    };

    onPanelChange = async (date?: moment.Moment) =>
    {
        if (date)
        {
            const selectedYear = date.format('YYYY');
            const selectedMonth = date.format('MM');
            await this.setStateAsync({
                selectedYear,
                selectedMonth,
            });
            await this.updateEveryDayScheduleAmountInState();
        }
    };

    onSelect = (date?: moment.Moment) =>
    {
        if (date)
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
        }
    };

    render()
    {
        const {
            clickedYear,
            clickedMonth,
            clickedDay,
            selectedYear,
            selectedMonth,
            everyDayScheduleAmountInAMonth,
            recentSchedules,
            hasGotEveryDayScheduleAmountInAMonth,
            hasGotRecentSchedules,
        } = this.state;

        const timelineItems: Array<TimelineItemObject.TimelineItem> = [];
        recentSchedules.forEach((schedule: Schedule) =>
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
                    (startTime as Date).getUTCHours(),
                    (startTime as Date).getUTCMinutes(),
                    (endTime as Date).getUTCHours(),
                    (endTime as Date).getUTCMinutes(),
                    scheduleText as string,
                    scheduleState as SCHEDULE_STATE,
                    onSwitchChangeFactory(id as number),
                    onResumeClickFactory(id as number),
                    onCancelClickFactory(id as number),
                    onDeleteClickFactory(id as number),
                    onModifyClickFactory(id as number),
                ),
            );
        });

        return (
            <ScheduleOverview onPanelChange={this.onPanelChange}
                              everyDayScheduleAmountInAMonth={everyDayScheduleAmountInAMonth}
                              selectedYear={selectedYear}
                              selectedMonth={selectedMonth}
                              clickedYear={clickedYear}
                              clickedMonth={clickedMonth}
                              clickedDay={clickedDay}
                              onSelect={this.onSelect}
                              timelineItems={timelineItems}
                              hasGotEveryDayScheduleAmountInAMonth={hasGotEveryDayScheduleAmountInAMonth}
                              hasGotRecentSchedules={hasGotRecentSchedules} />
        );
    }
}

const mapDispatchToProps = {
    showModal: ModalActions.showModalAction,
};

export default connect(null, mapDispatchToProps)(ScheduleOverviewContainer);