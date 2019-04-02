import React from 'react';
import Root from '../../Components/Root';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../Router';
import {connect} from 'react-redux';
import Api from '../../Api';
import {browserHistory} from 'react-router';
import {Actions as AuthProcessorActions} from '../../Components/AuthProcessor';

class RootContainer extends React.Component
{
    onExitClick = async () =>
    {
        const requestIsSuccessful = await Api.sendPostLogoutRequestAsync();
        if (requestIsSuccessful)
        {
            const {setOffline} = this.props;
            setOffline();
            browserHistory.push(PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]);
        }
    };

    render()
    {
        const {children, hasLoggedIn} = this.props;
        return (
            <Root hasLoggedIn={hasLoggedIn}
                  loginLink={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]}
                  signUpLink={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.SIGN_UP]}
                  exitFunction={this.onExitClick}>
                {children}
            </Root>
        );
    }
}

const mapStateToProps = state =>
{
    const {AuthProcessor: {hasLoggedIn}} = state;
    return {
        hasLoggedIn,
    };
};

const mapDispatchToProps = {
    setOffline: AuthProcessorActions.setOfflineAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);