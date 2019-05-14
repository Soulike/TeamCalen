import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_COMPONENT, PAGE_ID_TO_ROUTE} from '../../CONFIG';
import LoginCheckComponentWrapper from '../../ComponentContainer/LoginCheckComponentWrapper';

const ControlPanelContainer = React.lazy(() => import('../../ComponentContainer/ControlPanelContainer'));
const Root = React.lazy(() => import('../../ComponentContainer/RootContainer'));

export default () =>
{
    return (
        <Root>
            <LoginCheckComponentWrapper>
                <ControlPanelContainer>
                    <Switch>
                        {
                            Object.values(PAGE_ID.CONTROL_PANEL).map(value =>
                                <Route exact={true} path={PAGE_ID_TO_ROUTE[value]}
                                       component={PAGE_ID_TO_COMPONENT[value]}
                                       key={PAGE_ID_TO_ROUTE[value]} />)
                        }
                        <Route children={<Redirect to={PAGE_ID_TO_ROUTE[PAGE_ID.CONTROL_PANEL.NEW_SCHEDULE]} />} />
                    </Switch>
                </ControlPanelContainer>
            </LoginCheckComponentWrapper>
        </Root>
    );
};