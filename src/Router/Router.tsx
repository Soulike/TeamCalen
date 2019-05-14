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
                <Route path={PAGE_ID_TO_ROUTE[PAGE_PREFIX.INDEX]} exact component={IndexRouter} />
                <Route path={PAGE_ID_TO_ROUTE[PAGE_PREFIX.ACCOUNT]} component={AccountRouter} />
                <Route path={PAGE_ID_TO_ROUTE[PAGE_PREFIX.CONTROL_PANEL]} component={ControlPanelRouter} />
                <Route children={<Redirect to={PAGE_ID_TO_ROUTE[PAGE_ID.INDEX]} />} />
            </Switch>
        </BrowserRouter>
    );
};