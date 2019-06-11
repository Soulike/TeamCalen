import React from 'react';
import DetailSetting from './View';
import {MODAL_ID} from '../../../../../CONSTANT';
import {Actions as ModalActions} from '../../../../../ComponentContainer/Modal';
import {connect} from 'react-redux';

interface Props
{
    showModal: (modalId: MODAL_ID) => { type: symbol, modalId: MODAL_ID }
}

interface State {}

class DetailSettingContainer extends React.Component<Props, State>
{
    onEmailSettingButtonClick = () =>
    {
        const {showModal} = this.props;
        showModal(MODAL_ID.EMAIL_SETTING_MODAL);
    };

    render()
    {
        return (
            <DetailSetting onEmailSettingButtonClick={this.onEmailSettingButtonClick}
                           onPhoneSettingButtonClick={() => null} />
        );
    }
}

const mapDispatchToProps = {
    showModal: ModalActions.showModalAction,
};

export default connect(null, mapDispatchToProps)(DetailSettingContainer);