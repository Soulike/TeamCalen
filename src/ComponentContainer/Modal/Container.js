import React from 'react';
import PropTypes from 'prop-types';
import MODAL_ID from '../../CONSTANT/MODAL_ID';
import OriginalModal from 'antd/lib/modal';
import {connect} from 'react-redux';
import * as Actions from './Actions/Actions';
import eventEmitter from './EventEmitter';
import {getModalCloseEventName, getModalShowEventName} from './Function';

class Modal extends React.Component
{

    componentDidMount()
    {
        const {onShow, afterClose, modalId} = this.props;
        eventEmitter.on(getModalShowEventName(modalId), onShow ? onShow : () => null);
        eventEmitter.on(getModalCloseEventName(modalId), afterClose ? afterClose : () => null);
    }

    render()
    {
        const {currentVisibleModalIdSet, modalId, closeModal, onOk, onCancel, ...rest} = this.props;
        return (
            <OriginalModal
                destroyOnClose={true}
                visible={currentVisibleModalIdSet.has(modalId)}
                onOk={onOk ? onOk : () =>
                {
                    closeModal(modalId);
                }}
                onCancel={onCancel ? onCancel : () =>
                {
                    closeModal(modalId);
                }}
                {...rest} />
        );
    }
}

Modal.propTypes = {
    ...OriginalModal.propTypes,
    modalId: PropTypes.oneOf(Object.values(MODAL_ID)).isRequired,
    onShow: PropTypes.func,
};

const mapStateToProps = state =>
{
    const {Modal: {currentVisibleModalIdSet}} = state;
    return {currentVisibleModalIdSet};
};

const mapDispatchToProps = {
    closeModal: Actions.closeModalAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);