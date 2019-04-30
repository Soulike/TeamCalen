import React, {Suspense} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../CONFIG';
import Loading from '../Components/Loading';

const IndexRouter = React.lazy(() => import('./IndexRouter'));
const ControlPanelRouter = React.lazy(() => import('./ControlPanelRouter'));
const AccountRouter = React.lazy(() => import('./AccountRouter'));

export default () =>
{
    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.INDEX]} exact component={IndexRouter} />
                    <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.INDEX]} component={AccountRouter} />
                    <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.CONTROL_PANEL.INDEX]} component={ControlPanelRouter} />
                    <Route children={<Redirect to={PAGE_ID_TO_ROUTE[PAGE_ID.INDEX]} />} />
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
};