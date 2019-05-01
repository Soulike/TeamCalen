import React from 'react';
import Style from './Style.module.scss';
import Icon from 'antd/lib/icon';
import Switch from 'antd/lib/switch';
import Timeline from 'antd/lib/timeline';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Button from 'antd/lib/button';
import PropTypes from 'prop-types';
import Function from '../../../../../../../Function';
import SCHEDULE_STATE from '../../../../../../../CONSTANT/SCHEDULE_STATE';

const {Item} = Timeline;

function TimelineItem(props)
{
    const {
        month,
        day,
        startHour,
        startMinute,
        endHour,
        endMinute,
        scheduleText,
        scheduleState,
        onSwitchChange,
        onResumeClick,
        onCancelClick,
        onDeleteClick,
        onModifyClick,
    } = props;
    return (
        <Item className={Style.TimelineItem}
              dot={
                  (() =>
                  {
                      switch (scheduleState)
                      {
                          case SCHEDULE_STATE.FINISHED:
                          {
                              return <Icon type="check-circle" theme="twoTone" twoToneColor={'#0F0'} />;
                          }
                          default:
                          case SCHEDULE_STATE.UNFINISHED:
                          {
                              return <Icon type="clock-circle" theme="twoTone" />;
                          }
                          case SCHEDULE_STATE.CANCELED:
                          {
                              return <Icon type="close-circle" theme="twoTone" twoToneColor={'#F00'} />;
                          }
                      }
                  })()
              }>
            <div className={Style.itemContent}>
                <span className={Style.scheduleText}>
                    <div>
                        {Function.prefixZero(month)} 月 {Function.prefixZero(day)} 日 {Function.prefixZero(startHour)}:{Function.prefixZero(startMinute)} 到 {Function.prefixZero(endHour)}:{Function.prefixZero(endMinute)}
                    </div>
                    <div>{scheduleText}</div>
                </span>
                <div className={Style.scheduleOperation}>
                    <Switch disabled={scheduleState === SCHEDULE_STATE.CANCELED}
                            checked={scheduleState === SCHEDULE_STATE.FINISHED}
                            checkedChildren={
                                <Icon type="check-circle" theme={'outlined'} twoToneColor={'#0F0'} />}
                            unCheckedChildren={
                                <Icon type="clock-circle" theme={'outlined'} />}
                            size={'default'}
                            onChange={onSwitchChange} />
                    <Dropdown overlay={
                        <Menu>
                            {
                                scheduleState === SCHEDULE_STATE.FINISHED ?
                                    null :
                                    scheduleState === SCHEDULE_STATE.CANCELED ?
                                        <Menu.Item onClick={onResumeClick}>
                                            <Icon type="plus-circle" theme="twoTone" />恢复
                                        </Menu.Item> :
                                        <Menu.Item onClick={onCancelClick}>
                                            <Icon type="close-circle" theme="twoTone" twoToneColor={'#F00'} />取消
                                        </Menu.Item>
                            }
                            {
                                scheduleState === SCHEDULE_STATE.FINISHED ?
                                    null :
                                    <Menu.Divider />
                            }
                            <Menu.Item onClick={onModifyClick}>
                                <Icon type="edit" theme="twoTone" />修改
                            </Menu.Item>
                            <Menu.Item onClick={onDeleteClick}>
                                <Icon type="delete" theme="twoTone" />删除
                            </Menu.Item>
                        </Menu>
                    }>
                        <Button htmlType={'button'} size={'small'}>
                            <Icon type="dashboard" />操作 <Icon type="down" />
                        </Button>
                    </Dropdown>
                </div>
            </div>
        </Item>
    );
}

TimelineItem.propTypes = {
    month: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    startHour: PropTypes.number.isRequired,
    startMinute: PropTypes.number.isRequired,
    endHour: PropTypes.number,
    endMinute: PropTypes.number,
    scheduleText: PropTypes.node.isRequired,
    scheduleState: PropTypes.oneOf(Object.values(SCHEDULE_STATE)).isRequired,
    onSwitchChange: PropTypes.func.isRequired,
    onResumeClick: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    onModifyClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};

export default React.memo(TimelineItem);