import React from 'react';
import {View as Root} from '../../Components/Root';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../Router';
import {connect} from 'react-redux';

class RootContainer extends React.Component
{
    render()
    {
        const {children, hasLoggedIn} = this.props;
        return (
            <Root hasLoggedIn={hasLoggedIn}
                  loginLink={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]}
                  signUpLink={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.SIGN_UP]}
                  exitFunction={() => null}>
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

export default connect(mapStateToProps)(RootContainer);