import React from 'react';
import {connect} from 'react-redux';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../CONFIG';
import {Redirect} from 'react-router-dom';

interface Props
{
    hasLoggedIn: boolean,
    children?: JSX.Element
}

class LoginCheckComponentWrapper extends React.Component<Props>
{
    render()
    {
        const {hasLoggedIn, children} = this.props;
        return hasLoggedIn ? children : <Redirect to={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]} />;
    }
}

const mapStateToProps = (state: { AuthProcessor: { hasLoggedIn: boolean; }; }) =>
{
    const {AuthProcessor: {hasLoggedIn}} = state;
    return {hasLoggedIn};
};

export default connect(mapStateToProps)(LoginCheckComponentWrapper);