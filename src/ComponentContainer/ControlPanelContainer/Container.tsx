import React from 'react';
import ControlPanel from '../../Components/ControlPanel';
import {PAGE_ID} from '../../CONFIG';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {ROUTE_TO_PAGE_ID} from '../../CONFIG/PAGE';
import * as Actions from './Actions/Actions';
import {connect} from 'react-redux';
import {eventEmitter} from '../../Singleton';
import {EVENT} from '../../CONSTANT';
import {UserProfile} from '../../Class';

interface ControlPanelContainerProps extends RouteComponentProps
{
    getUserProfile: () => Promise<void>;
    userProfile: UserProfile;
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
            currentActivePageId: PAGE_ID.CONTROL_PANEL.SCHEDULE,
        };

        const {getUserProfile} = this.props;
        getUserProfile();
    }

    componentDidMount()
    {
        const route = this.props.location.pathname;
        this.setState({
            currentActivePageId: ROUTE_TO_PAGE_ID[route],
        });

        const {getUserProfile} = this.props;
        eventEmitter.on(EVENT.CONTROL_PANEL.USER_INFO_UPDATED, async () =>
        {
            await getUserProfile();
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
        const {userProfile: {username, avatar}, children} = this.props;

        let avatarSrc = '';
        if (avatar)
        {
            avatarSrc = `data:image/webp;base64,${Buffer.from(avatar).toString('base64')}`;
        }

        return (
            <ControlPanel currentActivePageId={currentActivePageId}
                          username={username as string}
                          avatarSrc={avatar ? avatarSrc : undefined}>{children}</ControlPanel>
        );
    }
}

const mapStateToProps = (state: { ControlPanel: { userProfile: UserProfile; }; }) =>
{
    const {ControlPanel: {userProfile}} = state;
    return {userProfile};
};

const mapDispatchToProps = {
    getUserProfile: Actions.getUserProfileAction,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ControlPanelContainer));