import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_COMPONENT, PAGE_ID_TO_ROUTE} from '../../CONFIG';

export default () =>
{
    return (
        <Switch>
            <Route exact={true}
                   path={PAGE_ID_TO_ROUTE[PAGE_ID.INDEX]}
                   component={PAGE_ID_TO_COMPONENT[PAGE_ID.INDEX]} />
        </Switch>
    );
};