import React from 'react';
import DetailSetting from './View';

class DetailSettingContainer extends React.Component
{
    render()
    {
        return (
            <DetailSetting onEmailSettingButtonClick={() => null}
                           onPhoneSettingButtonClick={() => null} />
        );
    }
}

export default DetailSettingContainer;