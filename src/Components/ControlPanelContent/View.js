import React from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';

function ControlPanelContent(props)
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

ControlPanelContent.propTypes = {
    midPartComponent: PropTypes.element.isRequired,
    rightPartComponent: PropTypes.element,
};

export default ControlPanelContent;