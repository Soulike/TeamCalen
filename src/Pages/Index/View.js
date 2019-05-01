import React from 'react';
import Style from './Style.module.scss';
import '../../Static/Index/background.png';
import '../../Static/teamcalen.svg';
import {Link} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../CONFIG';
import Button from 'antd/lib/button';

function Index()
{
    return (
        <div className={Style.Index}>
            <nav className={Style.topBar}>
                <div className={Style.icon} />
                <div className={Style.linkWrapper}>
                    <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]}>登录</Link>
                    /
                    <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.SIGN_UP]}>注册</Link>
                </div>
            </nav>
            <main className={Style.entryWrapper}>
                <div>
                    <div className={Style.text}>TeamCalen</div>
                    <div className={Style.text}>日程管理系统</div>
                    <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]}>
                        <Button htmlType={'button'} className={Style.enterButton}>立即进入</Button>
                    </Link>
                </div>
            </main>
            <div className={Style.background} />
        </div>
    );
}

export default React.memo(Index);