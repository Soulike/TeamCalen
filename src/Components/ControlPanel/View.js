import React from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import Avatar from 'antd/lib/avatar';
import teamcalen from '../../Static/teamcalen.svg';
import {PAGE_ID_TO_NAME, PAGE_ID_TO_ROUTE} from '../../CONFIG';
import {withRouter} from 'react-router-dom';

function ControlPanel(props)
{
    const {avatarSrc, username, currentActivePageId, children} = props;
    return (
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
                                     props.history.push(PAGE_ID_TO_ROUTE[pageId]);
                                 }}>
                                {PAGE_ID_TO_NAME[pageId]}
                            </div>)
                    }
                </div>
            </div>
            {children}
        </div>
    );
}

ControlPanel.propTypes = {
    avatarSrc: PropTypes.string,
    username: PropTypes.string.isRequired,
    currentActivePageId: PropTypes.symbol.isRequired,
};

ControlPanel.defaultProps = {
    avatarSrc: teamcalen,
    username: 'TeamCalen',
};

export default React.memo(withRouter(ControlPanel));