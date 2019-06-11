import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
// import 所有 Reducer
import {Reducer as AuthProcessorReducer} from './ComponentContainer/AuthProcessor';
import {Reducer as ModalReducer} from './ComponentContainer/Modal';
import {Reducer as ScheduleReducer} from './Pages/ControlPanel/Schedule';
import {Reducer as ControlPanelReducer} from './ComponentContainer/ControlPanelContainer';

// Store 中的初始值，根据开发需要进行改变
const initValues = {
    AuthProcessor: {
        hasLoggedIn: false,
    },
    Modal: {
        currentVisibleModalIdSet: new Set(),
    },
    Schedule: {
        currentModifyingScheduleId: 0,  // 目前在编辑框中编辑的日程 ID
    },
    ControlPanel: {
        userProfile: {},
    },
};

// 所有中间件放在此处
const middleWares = [thunk];

const storeEnhancers = compose(
    applyMiddleware(...middleWares),
);

// 所有 Reducer 放在此处
const Reducer = combineReducers({
    AuthProcessor: AuthProcessorReducer,
    Modal: ModalReducer,
    Schedule: ScheduleReducer,
    ControlPanel: ControlPanelReducer,
});

export default createStore(Reducer, initValues, storeEnhancers);