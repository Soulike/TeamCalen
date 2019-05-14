import React from 'react';
import Style from './Style.module.scss';
import Switch from 'antd/lib/switch';
import Tooltip from 'antd/lib/tooltip';

function ReminderSetting()
{
    return (
        <div className={Style.ReminderSetting}>
            <div className={Style.title}>提醒设置</div>
            <div className={Style.reminderWrapper}>
                <div className={Style.reminderSwitchWrapper}>
                    <Tooltip title={'在日程开始时是否发送邮件提醒'}>
                        <Switch checkedChildren={'开'} unCheckedChildren={'关'} disabled={true} />
                    </Tooltip>
                    <div className={Style.reminderLabel}>邮件提醒</div>
                </div>
                <div className={Style.reminderSwitchWrapper}>
                    <Tooltip title={'在日程开始时是否发送短信提醒'}>
                        <Switch checkedChildren={'开'} unCheckedChildren={'关'} disabled={true} />
                    </Tooltip>
                    <div className={Style.reminderLabel}>短信提醒</div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(ReminderSetting);