import React from 'react';
import {View as Root} from '../../Components/Root';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../Router';

class RootContainer extends React.Component
{
    render()
    {
        const {children} = this.props;
        return (
            <Root hasLoggedIn={false}
                  loginLink={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]}
                  signUpLink={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.SIGN_UP]}
                  exitFunction={() => null}>
                {children}
            </Root>
        );
    }
}

export default RootContainer;