import React from 'react';
import Style from './Style.module.scss';
import Calendar from 'antd/lib/calendar';
import Badge from 'antd/lib/badge';
import moment from 'moment';
import PropTypes from 'prop-types';
import MODAL_ID from '../../../../../CONSTANT/MODAL_ID';
import Timeline from 'antd/lib/timeline';
import TimelineItem, {Object as TimelineItemObject} from './Components/TimelineItem';
import ScheduleModal from './Components/ScheduleModal';
import Empty from 'antd/lib/empty';

function ScheduleOverview(props)
{
    const {
        onPanelChange,
        scheduleAmount,
        selectedYear,
        selectedMonth,
        onSelect,
        clickedYear,
        clickedMonth,
        clickedDay,
        timelineItems,
    } = props;

    const selectedYearAndMonth = moment(`${selectedYear}-${selectedMonth}`);   // 面板上选择的日期
    const nowMoment = moment();
    const today = moment(nowMoment.format('YYYY-MM-DD'));    // 今天的日期
    return [
        <div className={Style.ScheduleOverview} key={Style.ScheduleOverview}>
            <div className={Style.calendarWrapper}>
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
                                  const theDayScheduleAmount = scheduleAmount[dayNumber - 1];
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
            </div>
            <div className={Style.timelineWrapper}>
                <h1 className={Style.timelineTitle}>近期日程</h1>
                {
                    timelineItems.length === 0 ?
                        <Empty description={'暂无日程'} /> :
                        <Timeline className={Style.timeline} pending={'通向未来……'}>
                            {
                                timelineItems.map(timelineItem =>
                                    <TimelineItem key={timelineItem.id} {...timelineItem} />)
                            }
                        </Timeline>
                }

            </div>
        </div>,
        <ScheduleModal key={MODAL_ID.SCHEDULE_MODAL.description}
                       year={clickedYear}
                       month={clickedMonth}
                       day={clickedDay} />,
    ];
}

ScheduleOverview.propTypes = {
    onPanelChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    scheduleAmount: PropTypes.arrayOf(PropTypes.number).isRequired,
    selectedYear: PropTypes.string.isRequired,
    selectedMonth: PropTypes.string.isRequired,
    clickedYear: PropTypes.string.isRequired,
    clickedMonth: PropTypes.string.isRequired,
    clickedDay: PropTypes.string.isRequired,
    timelineItems: PropTypes.arrayOf(PropTypes.instanceOf(TimelineItemObject.TimelineItem)).isRequired,
};

export default ScheduleOverview;