const INDEX = Symbol('index');

const ACCOUNT = {
    LOGIN: Symbol('login'),
    SIGN_UP: Symbol('signUp'),
    RETRIEVE_PASSWORD: Symbol('retrievePassword'),
};

const CONTROL_PANEL = {
    NEW_SCHEDULE: Symbol('newSchedule'),
    NEW_PROJECT: Symbol('newProject'),
    MY_PROJECT: Symbol('myProject'),
    PROJECT_DETAIL: Symbol('projectDetail'),
    FRIEND_LIST: Symbol('friendList'),
    ACCOUNT_MANAGEMENT: Symbol('accountManagement'),
};

export const PAGE_ID = {
    INDEX,
    ACCOUNT,
    CONTROL_PANEL,
};