import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_COMPONENT, PAGE_ID_TO_ROUTE} from '../../CONFIG';

const AccountPanel = React.lazy(() => import('../../Components/AccountPanel'));
const Root = React.lazy(() => import('../../ComponentContainer/RootContainer'));

export default () =>
{
    return (
        <Root>
            <AccountPanel>
                <Switch>
                    {
                        Object.values(PAGE_ID.ACCOUNT).map(value =>
                            <Route exact={true} path={PAGE_ID_TO_ROUTE[value]}
                                   component={PAGE_ID_TO_COMPONENT[value]}
                                   key={PAGE_ID_TO_ROUTE[value]} />,
                        )
                    }
                    <Route children={<Redirect to={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]} />} />
                </Switch>
            </AccountPanel>
        </Root>
    );
};