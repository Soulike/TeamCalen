import 'react-app-polyfill/ie11';
import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {Provider} from 'react-redux';
import Store from './Store';
import * as serviceWorker from './serviceWorker';
import Loading from './Components/Loading';
import './ModuleConfig';
import zhCN from 'antd/lib/locale-provider/zh_CN';

const LocaleProvider = React.lazy(() => import('antd/lib/locale-provider'));
const Router = React.lazy(() => import('./Router'));

ReactDOM.render(
    <Suspense fallback={<Loading />}>
        <LocaleProvider locale={zhCN}>
            <Provider store={Store}>
                <Router />
            </Provider>
        </LocaleProvider>
    </Suspense>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
