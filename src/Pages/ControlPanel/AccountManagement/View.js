import React from 'react';
import Style from './Style.module.scss';
import ControlPanel from '../../../ComponentContainer/ControlPanelContainer';
import AvatarUploader from './Components/AvatarUploader';

function AccountManagement()
{
    return (
        <ControlPanel midPartComponent={
            <div className={Style.AccountManagement}>
                <div className={Style.leftPart}>
                    <div className={Style.avatarUploaderWrapper}>
                        <AvatarUploader />
                    </div>
                </div>
                <div className={Style.rightPart}>

                </div>
            </div>
        } />
    );
}

export default AccountManagement;