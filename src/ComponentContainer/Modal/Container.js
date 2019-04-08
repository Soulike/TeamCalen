import React from 'react';
import PropTypes from 'prop-types';
import MODAL_ID from '../../CONSTANT/MODAL_ID';
import OriginalModal from 'antd/lib/modal';
import {connect} from 'react-redux';
import * as Actions from './Actions/Actions';

class Modal extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            visible: false,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {modalId, currentVisibleModalIdSet} = this.props;
        const {visible} = this.state;
        if (visible === false && currentVisibleModalIdSet.has(modalId))
        {
            this.setState({
                visible: true,
            }, async () =>
            {
                const {onOpen} = this.props;
                if (onOpen) // 调用 onOpen，如果存在的话
                {
                    await onOpen();
                }
            });
        }
        else if (visible === true && !currentVisibleModalIdSet.has(modalId))
        {
            this.setState({
                visible: false,
            });
        }
    }


    render()
    {
        const {visible} = this.state;
        const {modalId, hideModal, ...rest} = this.props;
        return (
            <OriginalModal
                destroyOnClose={true}
                visible={visible}
                onOk={rest.onExitConfirm ? rest.onExitConfirm : () =>
                {
                    hideModal(modalId);
                }}
                onCancel={rest.onCancel ? rest.onCancel : () =>
                {
                    hideModal(modalId);
                }}
                {...rest} />
        );
    }
}

Modal.propTypes = {
    ...OriginalModal.propTypes,
    modalId: PropTypes.oneOf(Object.values(MODAL_ID)).isRequired,
    onOpen: PropTypes.func,
};

const mapStateToProps = state =>
{
    const {Modal: {currentVisibleModalIdSet}} = state;
    return {currentVisibleModalIdSet};
};

const mapDispatchToProps = {
    hideModal: Actions.hideModalAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);