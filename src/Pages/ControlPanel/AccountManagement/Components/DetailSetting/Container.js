import React from 'react';
import DetailSetting from './View';
import {Actions as ModalActions} from '../../../../../ComponentContainer/Modal';
import {connect} from 'react-redux';
import MODAL_ID from '../../../../../CONSTANT/MODAL_ID';

class DetailSettingContainer extends React.Component
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