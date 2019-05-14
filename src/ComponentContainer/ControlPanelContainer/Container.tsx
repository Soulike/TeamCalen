import React from 'react';
import ControlPanel from '../../Components/ControlPanel';
import {PAGE_ID} from '../../CONFIG';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {ROUTE_TO_PAGE_ID} from '../../CONFIG/PAGE';
import * as Actions from './Actions/Actions';
import {connect} from 'react-redux';
import {eventEmitter} from '../../Singleton';
import {EVENT} from '../../CONSTANT';
import {UserInfo} from '../../Class';

interface ControlPanelContainerProps extends RouteComponentProps
{
    getUserInfo: () => Promise<void>;
    userInfo: UserInfo;
    children?: JSX.Element
}

interface ControlPanelContainerState
{
    currentActivePageId: string
}

class ControlPanelContainer extends React.Component<ControlPanelContainerProps, ControlPanelContainerState>
{
    constructor(props: Readonly<ControlPanelContainerProps>)
    {
        super(props);
        this.state = {
            currentActivePageId: PAGE_ID.CONTROL_PANEL.NEW_SCHEDULE,
        };

        const {getUserInfo} = this.props;
        getUserInfo();
    }

    componentDidMount()
    {
        const route = this.props.location.pathname;
        this.setState({
            currentActivePageId: ROUTE_TO_PAGE_ID[route],
        });

        const {getUserInfo} = this.props;
        eventEmitter.on(EVENT.CONTROL_PANEL.USER_INFO_UPDATED, async () =>
        {
            await getUserInfo();
            this.forceUpdate();
        });
    }

    componentWillUnmount()
    {
        eventEmitter.removeAllListeners(EVENT.CONTROL_PANEL.USER_INFO_UPDATED);
    }

    componentDidUpdate(prevProps: ControlPanelContainerProps, prevState: ControlPanelContainerState)
    {
        const route = this.props.location.pathname;
        const prevRoute = prevProps.location.pathname;
        if (route !== prevRoute)
        {
            this.setState({
                currentActivePageId: ROUTE_TO_PAGE_ID[route],
            });
        }
    }

    render()
    {
        const {currentActivePageId} = this.state;
        const {userInfo: {username, avatarSrc}, children} = this.props;
        return (
            <ControlPanel currentActivePageId={currentActivePageId}
                          username={username}
                          avatarSrc={`${avatarSrc}?_t=${Date.now()}`}>{children}</ControlPanel> // 加一个时间戳禁止浏览器进行缓存
        );
    }
}

const mapStateToProps = (state: { ControlPanel: { userInfo: UserInfo; }; }) =>
{
    const {ControlPanel: {userInfo}} = state;
    return {userInfo};
};

const mapDispatchToProps = {
    getUserInfo: Actions.getUserInfoAction,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ControlPanelContainer));