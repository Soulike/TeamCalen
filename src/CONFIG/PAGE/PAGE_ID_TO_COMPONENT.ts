import {PAGE_ID} from '../PAGE';
import React from 'react';

const Index = React.lazy(() => import('../../Pages/Index'));
const Login = React.lazy(() => import('../../Pages/Account/Login'));
const SignUp = React.lazy(() => import('../../Pages/Account/SignUp'));
const RetrievePassword = React.lazy(() => import('../../Pages/Account/RetrievePassword'));
const Schedule = React.lazy(() => import('../../Pages/ControlPanel/Schedule'));
const AccountManagement = React.lazy(() => import('../../Pages/ControlPanel/AccountManagement'));

export const PAGE_ID_TO_COMPONENT = {
    [PAGE_ID.INDEX]: Index,

    [PAGE_ID.ACCOUNT.LOGIN]: Login,
    [PAGE_ID.ACCOUNT.SIGN_UP]: SignUp,
    [PAGE_ID.ACCOUNT.RETRIEVE_PASSWORD]: RetrievePassword,

    [PAGE_ID.CONTROL_PANEL.SCHEDULE]: Schedule,
    [PAGE_ID.CONTROL_PANEL.NEW_PROJECT]: undefined,
    [PAGE_ID.CONTROL_PANEL.MY_PROJECT]: undefined,
    [PAGE_ID.CONTROL_PANEL.PROJECT_DETAIL]: undefined,
    [PAGE_ID.CONTROL_PANEL.FRIEND_LIST]: undefined,
    [PAGE_ID.CONTROL_PANEL.ACCOUNT_MANAGEMENT]: AccountManagement,
};