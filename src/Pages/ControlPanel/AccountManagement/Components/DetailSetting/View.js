import React from 'react';
import Style from './Style.module.scss';
import Button from 'antd/lib/button';
import PropTypes from 'prop-types';
import EmailSettingModal from './Components/EmailSettingModal';
import MODAL_ID from '../../../../../CONSTANT/MODAL_ID';

function DetailSetting(props)
{
    const {
        onEmailSettingButtonClick,
        onPhoneSettingButtonClick,
    } = props;
    return [
        <div className={Style.DetailSetting} key={Style.DetailSetting}>
            <div className={Style.title}>详细设置</div>
            <div className={Style.buttonWrapper}>
                <Button htmlType={'button'} block={true} onClick={onEmailSettingButtonClick}>邮箱设置</Button>
                <Button htmlType={'button'}
                        block={true}
                        onClick={onPhoneSettingButtonClick}
                        disabled={true}>手机设置</Button>
            </div>
        </div>,
        <EmailSettingModal key={MODAL_ID.EMAIL_SETTING_MODAL.description} />,
    ];
}

DetailSetting.propTypes = {
    onEmailSettingButtonClick: PropTypes.func.isRequired,
    onPhoneSettingButtonClick: PropTypes.func.isRequired,
};

export default DetailSetting;