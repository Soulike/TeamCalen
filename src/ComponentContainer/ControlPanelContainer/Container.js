import React from 'react';
import ControlPanel from '../../Components/ControlPanel';
import {PAGE_ID} from '../../Router';
import {withRouter} from 'react-router';
import {ROUTE_TO_PAGE_ID} from '../../Router/PAGE';
import Api from '../../Api';
import PropTypes from 'prop-types';

class ControlPanelContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            currentActivePageId: PAGE_ID.CONTROL_PANEL.NEW_SCHEDULE,
            username: undefined,
            avatarSrc: undefined,
        };
    }

    componentDidMount()
    {
        const route = this.props.location.pathname;
        this.setState({
            currentActivePageId: ROUTE_TO_PAGE_ID[route],
        });

        Api.sendGetUserInfoRequestAsync()
            .then(userInfo =>
            {
                if (userInfo)
                {
                    const {username, avatarSrc} = userInfo;
                    this.setState({
                        username,
                        avatarSrc,
                    });
                }
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
        const {currentActivePageId, username, avatarSrc} = this.state;
        const {midPartComponent, rightPartComponent} = this.props;
        return (
            <ControlPanel currentActivePageId={currentActivePageId}
                          username={username}
                          avatarSrc={avatarSrc}
                          midPartComponent={midPartComponent}
                          rightPartComponent={rightPartComponent} />
        );
    }
}

ControlPanelContainer.propTypes = {
    midPartComponent: PropTypes.element,
    rightPartComponent: PropTypes.element,
};

export default withRouter(ControlPanelContainer);