import React from 'react';
import Style from './Style.module.scss';
import '../../Static/Account/cardBackground.png';

function AccountPanel(props)
{
    const {children} = props;
    return (
        <div className={Style.AccountPanel}>
            <div className={Style.leftImage} />
            <div className={Style.rightChildren}>
                {children}
            </div>
        </div>
    );
}

export default AccountPanel;