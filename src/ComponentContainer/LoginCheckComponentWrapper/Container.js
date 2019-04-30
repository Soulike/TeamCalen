import React from 'react';
import {connect} from 'react-redux';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../CONFIG';
import {Redirect} from 'react-router-dom';

class LoginCheckComponentWrapper extends React.Component
{
    render()
    {
        const {hasLoggedIn, children} = this.props;
        return hasLoggedIn ? children : <Redirect to={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]} />;
    }
}

const mapStateToProps = state =>
{
    const {AuthProcessor: {hasLoggedIn}} = state;
    return {hasLoggedIn};
};

export default connect(mapStateToProps)(LoginCheckComponentWrapper);