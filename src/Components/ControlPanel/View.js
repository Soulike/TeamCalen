import React from 'react';
import Style from './Style.module.scss';
import RootContainer from '../../ComponentContainer/RootContainer';
import PropTypes from 'prop-types';
import Avatar from 'antd/lib/avatar';
import teamcalen from '../../Static/teamcalen.svg';
import {PAGE_ID_TO_NAME, PAGE_ID_TO_ROUTE} from '../../Router';
import {browserHistory} from 'react-router';

function ControlPanel(props)
{
    const {avatarSrc, username, currentActivePageId, midPartComponent, rightPartComponent} = props;
    return (
        <RootContainer>
            <div className={Style.ControlPanel}>
                <div className={Style.leftPart}>
                    <div className={Style.userInfoWrapper}>
                        <Avatar shape={'square'} src={avatarSrc} alt={'avatar'} className={Style.avatar} />
                        <div className={Style.username}>{username}</div>
                    </div>
                    <div className={Style.tabWrapper}>
                        {
                            Object.getOwnPropertySymbols(PAGE_ID_TO_NAME).map(pageId =>
                                <div className={`${Style.tab} ${pageId === currentActivePageId ? Style.active : null}`}
                                     key={PAGE_ID_TO_ROUTE[pageId]}
                                     onClick={() =>
                                     {
                                         browserHistory.push(PAGE_ID_TO_ROUTE[pageId]);
                                     }}>
                                    {PAGE_ID_TO_NAME[pageId]}
                                </div>)
                        }
                    </div>
                </div>
                <div className={Style.midPart}>
                    {midPartComponent}
                </div>
                <div className={Style.rightPart}>
                    {rightPartComponent}
                </div>
            </div>
        </RootContainer>
    );
}

ControlPanel.propTypes = {
    avatarSrc: PropTypes.string,
    username: PropTypes.string.isRequired,
    currentActivePageId: PropTypes.symbol.isRequired,
    midPartComponent: PropTypes.element,
    rightPartComponent: PropTypes.element,
};

ControlPanel.defaultProps = {
    avatarSrc: teamcalen,
    username: 'TeamCalen',
};

export default ControlPanel;