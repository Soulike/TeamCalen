import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
// import 所有 Reducer
import {Reducer as AuthProcessorReducer} from './Components/AuthProcessor';
import {Reducer as ModalReducer} from './ComponentContainer/Modal';
import {Reducer as NewScheduleReducer} from './Pages/ControlPanel/NewSchedule';
// import SCHEDULE_STATE from './CONSTANT/SCHEDULE_STATE';

// Store 中的初始值，根据开发需要进行改变
const initValues = {
    AuthProcessor: {
        hasLoggedIn: false,
    },
    Modal: {
        currentVisibleModalIdSet: new Set(),
    },
    NewSchedule: {
        scheduleAmount: [/*
            ...(() =>
            {
                const scheduleAmount = [];
                for (let i = 0; i < 31; i++)
                {
                    scheduleAmount.push(Math.round(Math.random() * 20));
                }
                return scheduleAmount;
            })(), // 测试代码
        */],
        recentSchedules: [
            /*{
                month: '03',
                day: '31',
                startHour: 8,
                startMinute: 10,
                endHour: 12,
                endMinute: 30,
                scheduleText: '英语作业',
                scheduleState: SCHEDULE_STATE.CANCELED,
            },
            {
                month: '03',
                day: '31',
                startHour: 12,
                startMinute: 30,
                endHour: 14,
                endMinute: 30,
                scheduleText: '高数作业',
                scheduleState: SCHEDULE_STATE.FINISHED,
            },
            {
                month: '03',
                day: '31',
                startHour: 14,
                startMinute: 30,
                endHour: 18,
                endMinute: 30,
                scheduleText: '英语作业',
                scheduleState: SCHEDULE_STATE.UNFINISHED,
            },*/
        ],
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
    NewSchedule: NewScheduleReducer,
});

export default createStore(Reducer, initValues, storeEnhancers);