import React from 'react';
import Style from './Style.module.scss';
import Avatar from 'antd/lib/avatar';
import teamcalen from '../../Static/teamcalen.svg';
import {PAGE_ID_TO_NAME, PAGE_ID_TO_ROUTE} from '../../CONFIG';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {History} from 'history';

interface ControlPanelProps extends RouteComponentProps
{
    avatarSrc?: string;
    username: string;
    currentActivePageId: string;
    children?: JSX.Element;
    history: History;
}

function ControlPanel(props: ControlPanelProps)
{
    const {avatarSrc, username, currentActivePageId, children, history} = props;
    return (
        <div className={Style.ControlPanel}>
            <div className={Style.leftPart}>
                <div className={Style.userInfoWrapper}>
                    <Avatar shape={'square'} src={avatarSrc} alt={'avatar'} className={Style.avatar} />
                    <div className={Style.username}>{username}</div>
                </div>
                <div className={Style.tabWrapper}>
                    {
                        Object.keys(PAGE_ID_TO_NAME).map(pageId =>
                            <div className={`${Style.tab} ${pageId === currentActivePageId ? Style.active : null}`}
                                 key={PAGE_ID_TO_ROUTE[pageId]}
                                 onClick={() =>
                                 {
                                     history.push(PAGE_ID_TO_ROUTE[pageId]);
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

ControlPanel.defaultProps = {
    avatarSrc: teamcalen,
    username: 'TeamCalen',
};

export default React.memo(withRouter(ControlPanel));