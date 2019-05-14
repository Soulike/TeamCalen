import React from 'react';
import Style from './Style.module.scss';

interface ControlPanelContentProps
{
    midPartComponent: JSX.Element;
    rightPartComponent: JSX.Element;
}

function ControlPanelContent(props: ControlPanelContentProps)
{
    const {midPartComponent, rightPartComponent} = props;
    return (
        <div className={Style.ControlPanelContent}>
            <div className={Style.midPart}>
                {midPartComponent}
            </div>
            {
                rightPartComponent ?
                    <div className={Style.rightPart}>
                        {rightPartComponent}
                    </div> :
                    null
            }
        </div>
    );
}

export default React.memo(ControlPanelContent);