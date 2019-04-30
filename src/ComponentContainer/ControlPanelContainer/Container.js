import React from 'react';
import ControlPanel from '../../Components/ControlPanel';
import {PAGE_ID} from '../../CONFIG';
import {withRouter} from 'react-router-dom';
import {ROUTE_TO_PAGE_ID} from '../../CONFIG/PAGE';
import * as Actions from './Actions/Actions';
import {connect} from 'react-redux';

class ControlPanelContainer extends React.Component
{
    constructor(props)
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
    }

    componentDidUpdate(prevProps, prevState, snapshot)
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
        const {username, avatarSrc, children} = this.props;
        return (
            <ControlPanel currentActivePageId={currentActivePageId}
                          username={username}
                          avatarSrc={avatarSrc}>{children}</ControlPanel>
        );
    }
}

const mapStateToProps = state =>
{
    const {ControlPanel: {userInfo}} = state;
    return {...userInfo};
};

const mapDispatchToProps = {
    getUserInfo: Actions.getUserInfoAction,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ControlPanelContainer));