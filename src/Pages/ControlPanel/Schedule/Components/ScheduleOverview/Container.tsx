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
import {ResponseSchedule} from '../../../../../Class';

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
    recentSchedules: Array<ResponseSchedule>,
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
        recentSchedules.forEach((schedule: ResponseSchedule) =>
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
                    scheduleText, scheduleState ? SCHEDULE_STATE.FINISHED : SCHEDULE_STATE.UNFINISHED,
                    onSwitchChangeFactory(id),
                    onResumeClickFactory(id),
                    onCancelClickFactory(id),
                    onDeleteClickFactory(id),
                    onModifyClickFactory(id),
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