import React from 'react';
import Style from './Style.module.scss';
import Calendar, {CalendarMode} from 'antd/lib/calendar';
import Badge from 'antd/lib/badge';
import moment from 'moment';
import {MODAL_ID} from '../../../../../CONSTANT';
import Timeline from 'antd/lib/timeline';
import TimelineItem, {Object as TimelineItemObject} from './Components/TimelineItem';
import ScheduleModal from './Components/ScheduleModal';
import Empty from 'antd/lib/empty';
import ScheduleModifyModal from './Components/ScheduleModifyModal';
import Spin from 'antd/lib/spin';

interface Props
{
    onPanelChange: (date?: moment.Moment, mode?: CalendarMode) => void;
    everyDayScheduleAmountInAMonth: Array<number>;
    selectedYear: string;
    selectedMonth: string;
    onSelect: (date?: moment.Moment) => void;
    clickedYear: string;
    clickedMonth: string;
    clickedDay: string;
    timelineItems: Array<TimelineItemObject.TimelineItem>;
    hasGotEveryDayScheduleAmountInAMonth: boolean;
    hasGotRecentSchedules: boolean;
}

function ScheduleOverview(props: Props)
{
    const {
        onPanelChange,
        everyDayScheduleAmountInAMonth,
        selectedYear,
        selectedMonth,
        onSelect,
        clickedYear,
        clickedMonth,
        clickedDay,
        timelineItems,
        hasGotEveryDayScheduleAmountInAMonth,
        hasGotRecentSchedules,
    } = props;

    const selectedYearAndMonth = moment(`${selectedYear}-${selectedMonth}`, 'YYYY-MM');   // 面板上选择的日期
    const nowMoment = moment();
    const today = moment(nowMoment.format('YYYY-MM-DD'));    // 今天的日期
    return (
        <React.Fragment>
            <div className={Style.ScheduleOverview} key={Style.ScheduleOverview}>
                <div className={Style.calendarWrapper}>
                    <Spin spinning={!hasGotEveryDayScheduleAmountInAMonth}>
                        <Calendar className={Style.calendar}
                                  fullscreen={false}
                                  onPanelChange={onPanelChange}
                                  onSelect={onSelect}
                                  dateCellRender={date =>
                                  {
                                      const month = moment(date.format('YYYY-MM'));
                                      if (month.isSame(selectedYearAndMonth))
                                      {
                                          const day = moment(date.format('YYYY-MM-DD'));  // 日历上显示的日期
                                          const dayNumber = Number.parseInt(date.format('DD'), 10);
                                          const theDayScheduleAmount = everyDayScheduleAmountInAMonth[dayNumber - 1];
                                          if (theDayScheduleAmount > 0)
                                          {
                                              if (day.isBefore(today))    // 是过去的日期，显示绿点
                                              {
                                                  return <Badge status={'success'} className={Style.badge} />;
                                              }
                                              else if (day.isSame(today)) // 是当天，显示蓝点
                                              {
                                                  return <Badge status={'processing'} className={Style.badge} />;
                                              }
                                              else                        // 是未来的日期，显示黄点
                                              {
                                                  return <Badge status={'warning'} className={Style.badge} />;
                                              }
                                          }
                                      }
                                      return null;
                                  }} />
                    </Spin>
                </div>
                <div className={Style.timelineWrapper}>
                    <h1 className={Style.timelineTitle}>近期日程</h1>
                    <Spin spinning={!hasGotRecentSchedules}>
                        {
                            timelineItems.length === 0 ?
                                <Empty description={'暂无日程'} /> :
                                <Timeline className={Style.timeline} pending={'通向未来……'}>
                                    {
                                        timelineItems.map((timelineItem: TimelineItemObject.TimelineItem) =>
                                            <TimelineItem key={timelineItem.scheduleId} {...timelineItem} />)
                                    }
                                </Timeline>
                        }
                    </Spin>
                </div>
            </div>
            <ScheduleModal key={MODAL_ID.SCHEDULE_MODAL}
                           year={clickedYear}
                           month={clickedMonth}
                           day={clickedDay} />
            <ScheduleModifyModal key={MODAL_ID.SCHEDULE_MODIFY_MODAL} />
        </React.Fragment>
    );
}

ScheduleOverview.defaultProps = {
    hasGotEveryDayScheduleAmountInAMonth: true,
    hasGotRecentSchedules: true,
};

export default React.memo(ScheduleOverview);