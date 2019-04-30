import React from 'react';
import Style from './Style.module.scss';
import AvatarUploader from './Components/AvatarUploader';
import ReminderSetting from './Components/ReminderSetting';
import PasswordChange from './Components/PasswordChange';
import DetailSetting from './Components/DetailSetting';
import ControlPanelContent from '../../../Components/ControlPanelContent';

function AccountManagement()
{
    return (
        <ControlPanelContent midPartComponent={
            <div className={Style.AccountManagement}>
                <div className={Style.leftPart}>
                    <div className={Style.avatarUploaderWrapper}>
                        <AvatarUploader />
                    </div>
                    <div className={Style.reminderSettingWrapper}>
                        <ReminderSetting />
                    </div>
                </div>
                <div className={Style.rightPart}>
                    <div className={Style.passwordChangeWrapper}>
                        <PasswordChange />
                    </div>
                    <div className={Style.detailSettingWrapper}>
                        <DetailSetting />
                    </div>
                </div>
            </div>
        } />
    );
}

export default AccountManagement;