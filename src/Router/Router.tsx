import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE, PAGE_PREFIX} from '../CONFIG';

const IndexRouter = React.lazy(() => import('./IndexRouter'));
const ControlPanelRouter = React.lazy(() => import('./ControlPanelRouter'));
const AccountRouter = React.lazy(() => import('./AccountRouter'));

export default () =>
{
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path={PAGE_ID_TO_ROUTE[PAGE_ID.INDEX]} component={IndexRouter} />
                <Route path={PAGE_PREFIX.ACCOUNT} component={AccountRouter} />
                <Route path={PAGE_PREFIX.CONTROL_PANEL} component={ControlPanelRouter} />
                <Route children={<Redirect to={PAGE_ID_TO_ROUTE[PAGE_ID.INDEX]} />} />
            </Switch>
        </BrowserRouter>
    );
};