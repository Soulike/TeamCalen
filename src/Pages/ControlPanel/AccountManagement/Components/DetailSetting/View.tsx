import React from 'react';
import Style from './Style.module.scss';
import Button from 'antd/lib/button';
import EmailSettingModal from './Components/EmailSettingModal';

interface Props
{
    onEmailSettingButtonClick: React.MouseEventHandler<any>;
    onPhoneSettingButtonClick: React.MouseEventHandler<any>;
}

function DetailSetting(props: Readonly<Props>)
{
    const {
        onEmailSettingButtonClick,
        onPhoneSettingButtonClick,
    } = props;
    return (
        <React.Fragment>
            <div className={Style.DetailSetting} key={Style.DetailSetting}>
                <div className={Style.title}>详细设置</div>
                <div className={Style.buttonWrapper}>
                    <Button htmlType={'button'}
                            block={true}
                            onClick={onEmailSettingButtonClick}>邮箱设置</Button>
                    <Button htmlType={'button'}
                            block={true}
                            onClick={onPhoneSettingButtonClick}
                            disabled={true}>手机设置</Button>
                </div>
            </div>
            <EmailSettingModal />
        </React.Fragment>
    );
}

export default React.memo(DetailSetting);