import React from 'react';
import Style from './Style.module.scss';
import Modal from '../../../../../../../ComponentContainer/Modal';
import {MODAL_ID} from '../../../../../../../CONSTANT';
import TimelineItem, {Object as TimelineItemObject} from '../TimelineItem';
import Timeline from 'antd/lib/timeline';
import Empty from 'antd/lib/empty';
import Spin from 'antd/lib/spin';

interface Props
{
    year: string;
    month: string;
    day: string;
    timelineItems: Array<TimelineItemObject.TimelineItem>;
    onShow: () => any;
    hasGotData: boolean;
}

function ScheduleModal(props: Readonly<Props>)
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

ScheduleModal.defaultProps = {
    hasGotData: true,
};

export default React.memo(ScheduleModal);