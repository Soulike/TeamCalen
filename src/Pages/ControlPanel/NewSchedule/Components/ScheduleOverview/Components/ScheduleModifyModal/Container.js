import React from 'react';
import ScheduleModifyModal from './View';
import {connect} from 'react-redux';
import Api from '../../../../../../../Api';
import {REGEX} from '../../../../../../../CONSTANT/REGEX';
import message from 'antd/lib/message';
import {Actions as ModalActions} from '../../../../../../../ComponentContainer/Modal';
import MODAL_ID from '../../../../../../../CONSTANT/MODAL_ID';
import moment from 'moment';
import PropTypes from 'prop-types';
import {eventEmitter} from '../../../../../../../Singleton';
import EVENT from '../../../../../../../CONSTANT/EVENT';

class ScheduleModifyModalContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        const now = moment();
        this.state = {
            year: now.format('YYYY'),
            month: now.format('MM'),
            day: now.format('DD'),
            startHour: Number.parseInt(now.format('HH')),
            startMinute: Number.parseInt(now.format('mm')),
            endHour: Number.parseInt(now.format('HH')),
            endMinute: Number.parseInt(now.format('mm')),
            hasReminder: false,
            scheduleText: '',

            hasGotData: false,   // 是否已经从服务器获取了数据

            confirmLoading: false,  // 是否还未提交完成
        };
    }

    setStateAsync = async state =>
    {
        return new Promise(resolve =>
        {
            this.setState(state, resolve);
        });
    };

    onShow = async () =>
    {
        await this.setStateAsync({hasGotData: false});
        const {currentModifyingScheduleId} = this.props;
        const schedule = await Api.sendGetScheduleByIdRequestAsync(currentModifyingScheduleId);
        if (schedule)
        {
            await this.setStateAsync({
                ...schedule,
                hasGotData: true,
            });
        }
    };

    onStartDateChange = date =>
    {
        if (date !== null)
        {
            this.setState({
                year: date.format('YYYY'),
                month: date.format('MM'),
                day: date.format('DD'),
            });
        }
        else        // 如果用户清空了选框
        {
            const now = moment();
            this.setState({
                year: now.format('YYYY'),
                month: now.format('MM'),
                day: now.format('DD'),
            });
        }
    };

    onStartTimeChange = date =>
    {
        if (date !== null)
        {
            this.setState({
                startHour: Number.parseInt(date.format('HH')),
                startMinute: Number.parseInt(date.format('mm')),
            });
        }
        else
        {
            const now = moment();
            this.setState({
                startHour: Number.parseInt(now.format('HH')),
                startMinute: Number.parseInt(now.format('mm')),
            });
        }
    };

    onEndTimeChange = date =>
    {
        if (date !== null)
        {
            this.setState({
                endHour: Number.parseInt(date.format('HH')),
                endMinute: Number.parseInt(date.format('mm')),
            });
        }
        else
        {
            const now = moment();
            this.setState({
                endHour: Number.parseInt(now.format('HH')),
                endMinute: Number.parseInt(now.format('mm')),
            });
        }
    };

    onScheduleTextInputChange = e =>
    {
        this.setState({
            scheduleText: e.target.value,
        });
    };

    onReminderSwitchChange = checked =>
    {
        this.setState({
            hasReminder: checked,
        });
    };

    onSubmit = async () =>
    {
        const {year, month, day, startHour, startMinute, endHour, endMinute, hasReminder, scheduleText} = this.state;
        const {modalId, currentModifyingScheduleId} = this.props;

        if (startHour > endHour || (startHour === endHour && startMinute > endMinute))
        {
            message.warning('结束时间不能早于开始时间');
        }
        else if (!REGEX.SCHEDULE_TEXT.test(scheduleText))
        {
            message.warning('日程内容太长或太短');
        }
        else
        {
            this.setState({
                confirmLoading: true,
            });
            const requestIsSuccessful = await Api.sendPostModifyScheduleRequestAsync(currentModifyingScheduleId, year, month, day,
                startHour, startMinute, endHour, endMinute, scheduleText, hasReminder);
            if (requestIsSuccessful)
            {
                const {closeModal} = this.props;
                this.setState({
                    confirmLoading: false,
                });
                closeModal(modalId);
                eventEmitter.emit(EVENT.SCHEDULE.SCHEDULE_MODIFIED);
            }
        }
    };

    render()
    {
        const {year, month, day, startHour, startMinute, endHour, endMinute, scheduleText, hasReminder, hasGotData} = this.state;
        const {modalId, currentModifyingScheduleId} = this.props;
        return (
            <ScheduleModifyModal modalId={modalId}
                                 initYear={year}
                                 initMonth={month}
                                 initDay={day}
                                 initStartHour={startHour}
                                 initStartMinute={startMinute}
                                 initEndHour={endHour}
                                 initEndMinute={endMinute}
                                 initScheduleText={scheduleText}
                                 initHasReminder={hasReminder}
                                 currentModifyingScheduleId={currentModifyingScheduleId}
                                 onStartDateChange={this.onStartDateChange}
                                 onStartTimeChange={this.onStartTimeChange}
                                 onEndTimeChange={this.onEndTimeChange}
                                 onScheduleTextInputChange={this.onScheduleTextInputChange}
                                 onReminderSwitchChange={this.onReminderSwitchChange}
                                 onSubmit={this.onSubmit}
                                 hasGotData={hasGotData}
                                 onShow={this.onShow} />
        );
    }
}

ScheduleModifyModalContainer.propTypes = {
    modalId: PropTypes.oneOf(Object.values(MODAL_ID)).isRequired,   // 因为事件监听器冲突，因此只能分开设置ModalId
};

const mapStateToProps = state =>
{
    const {NewSchedule: {currentModifyingScheduleId}} = state;
    return {
        currentModifyingScheduleId,
    };
};

const mapDispatchToProps = {
    closeModal: ModalActions.closeModalAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleModifyModalContainer);