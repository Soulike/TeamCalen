import React from 'react';
import Style from './Style.module.scss';
import Modal from '../../../../../../../ComponentContainer/Modal';
import MODAL_ID from '../../../../../../../CONSTANT/MODAL_ID';
import PropTypes from 'prop-types';
import TimelineItem, {Object as TimelineItemObject} from '../TimelineItem';
import Timeline from 'antd/lib/timeline';
import Empty from 'antd/lib/empty';

function ScheduleModal(props)
{
    const {year, month, day, timelineItems, onOpen} = props;
    return (
        <Modal modalId={MODAL_ID.SCHEDULE_MODAL} title={`${year} 年 ${month} 月 ${day} 日日程列表`} onOpen={onOpen}>
            <div className={Style.ScheduleModal}>
                <div className={Style.timelineWrapper}>
                    {
                        timelineItems.length === 0 ?
                            <Empty description={'暂无日程'} /> :
                            <Timeline className={Style.timeline} pending={'通向未来……'}>
                                {
                                    timelineItems.map(timelineItem =>
                                        <TimelineItem key={timelineItem.scheduleId} {...timelineItem} />)
                                }
                            </Timeline>
                    }

                </div>
            </div>
        </Modal>
    );
}

ScheduleModal.propTypes = {
    year: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    timelineItems: PropTypes.arrayOf(PropTypes.instanceOf(TimelineItemObject.TimelineItem)).isRequired,
    onOpen: PropTypes.func,
};

export default ScheduleModal;