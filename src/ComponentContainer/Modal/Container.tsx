import React from 'react';
import {MODAL_ID} from '../../CONSTANT';
import OriginalModal, {ModalProps} from 'antd/lib/modal';
import {connect} from 'react-redux';
import * as Actions from './Actions/Actions';
import eventEmitter from './EventEmitter';
import {getModalCloseEventName, getModalShowEventName} from './Function';

interface Props extends ModalProps
{
    onShow: () => any;
    modalId: MODAL_ID;
    closeModal: (modalId: MODAL_ID) => any;
    currentVisibleModalIdSet: Set<MODAL_ID>;
}

class Modal extends React.Component<Props>
{
    componentDidMount()
    {
        const {onShow, afterClose, modalId} = this.props;
        if (typeof onShow === 'function')
        {
            eventEmitter.on(getModalShowEventName(modalId), onShow);
        }
        else if (typeof afterClose === 'function')
        {
            eventEmitter.on(getModalCloseEventName(modalId), afterClose);
        }
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

const mapStateToProps = (state: { Modal: { currentVisibleModalIdSet: any; }; }) =>
{
    const {Modal: {currentVisibleModalIdSet}} = state;
    return {currentVisibleModalIdSet};
};

const mapDispatchToProps = {
    closeModal: Actions.closeModalAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);