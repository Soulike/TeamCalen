import React from 'react';
import {browserHistory, IndexRedirect, Route, Router} from 'react-router';
import {PAGE_ID, PAGE_ID_TO_COMPONENT, PAGE_ID_TO_ROUTE} from './PAGE';

const Routes = () => (
    <Router history={browserHistory}>
        <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.INDEX]} component={PAGE_ID_TO_COMPONENT[PAGE_ID.INDEX]} />
        <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.INDEX]} component={PAGE_ID_TO_COMPONENT[PAGE_ID.ACCOUNT.INDEX]}>
            <IndexRedirect to={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]} />
            {
                Object.values(PAGE_ID.ACCOUNT).map(pageId =>
                    <Route path={PAGE_ID_TO_ROUTE[pageId]}
                           component={PAGE_ID_TO_COMPONENT[pageId]}
                           key={PAGE_ID_TO_ROUTE[pageId]} />)
            }
        </Route>
        <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.CONTROL_PANEL.INDEX]}
               component={PAGE_ID_TO_COMPONENT[PAGE_ID.CONTROL_PANEL.INDEX]}>
            <IndexRedirect to={PAGE_ID_TO_ROUTE[PAGE_ID.CONTROL_PANEL.NEW_SCHEDULE]} />
            {
                Object.values(PAGE_ID.CONTROL_PANEL).map(pageId =>
                    <Route path={PAGE_ID_TO_ROUTE[pageId]}
                           component={PAGE_ID_TO_COMPONENT[pageId]}
                           key={PAGE_ID_TO_ROUTE[pageId]} />)
            }
        </Route>
    </Router>
);

export default Routes;