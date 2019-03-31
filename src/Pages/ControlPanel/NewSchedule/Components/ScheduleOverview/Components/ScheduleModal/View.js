import React from 'react';
import Style from './Style.module.scss';
import Modal from '../../../../../../../ComponentContainer/Modal';
import MODAL_ID from '../../../../../../../CONSTANT/MODAL_ID';
import PropTypes from 'prop-types';

function ScheduleModal(props)
{
    const {year, month, day} = props;
    return (
        <Modal modalId={MODAL_ID.SCHEDULE_MODAL} title={`${year} 年 ${month} 月 ${day} 日日程列表`}>
            <div className={Style.ScheduleModal}>

            </div>
        </Modal>
    );
}

ScheduleModal.propTypes = {
    year: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
};

export default ScheduleModal;