import React from 'react';
import Style from './Style.module.scss';
import ControlPanel from '../../../ComponentContainer/ControlPanelContainer';

function AccountManagement(props)
{
    return (
        <ControlPanel midPartComponent={
            <div className={Style.AccountManagement}>
                <div className={Style.leftPart}>

                </div>
                <div className={Style.rightPart}>

                </div>
            </div>
        } />
    );
}

export default AccountManagement;