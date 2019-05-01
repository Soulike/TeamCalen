import React from 'react';
import Style from './Style.module.scss';
import Modal from '../../../../../../../ComponentContainer/Modal';
import MODAL_ID from '../../../../../../../CONSTANT/MODAL_ID';
import PropTypes from 'prop-types';
import TimelineItem, {Object as TimelineItemObject} from '../TimelineItem';
import Timeline from 'antd/lib/timeline';
import Empty from 'antd/lib/empty';
import Spin from 'antd/lib/spin';

function ScheduleModal(props)
{
    const {year, month, day, timelineItems, onShow, hasGotData} = props;
    return (
        <Modal modalId={MODAL_ID.SCHEDULE_MODAL} title={`${year} 年 ${month} 月 ${day} 日日程列表`} onShow={onShow}>
            <div className={Style.ScheduleModal}>
                <Spin spinning={!hasGotData}>
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
                </Spin>
            </div>
        </Modal>
    );
}

ScheduleModal.propTypes = {
    year: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    timelineItems: PropTypes.arrayOf(PropTypes.instanceOf(TimelineItemObject.TimelineItem)).isRequired,
    onShow: PropTypes.func,
    hasGotData: PropTypes.bool,
};

ScheduleModal.defaultProps = {
    hasGotData: true,
};

export default React.memo(ScheduleModal);