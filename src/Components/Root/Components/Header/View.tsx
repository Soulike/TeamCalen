import React from 'react';
import Style from './Style.module.scss';
import '../../../../Static/teamcalen.svg';
import {Link} from 'react-router-dom';

interface HeaderProps
{
    hasLoggedIn: boolean;
    loginLink: string;
    signUpLink: string;
    exitFunction: () => any;
}

function Header(props: HeaderProps)
{
    const {hasLoggedIn, loginLink, signUpLink, exitFunction} = props;
    return (
        <div className={Style.Header}>
            <div className={Style.icon} />
            <div className={Style.auth}>
                {
                    hasLoggedIn ?
                        <div className={Style.exit} onClick={exitFunction}>退出登录</div> :
                        <div className={Style.link}>
                            <Link to={signUpLink}>注册</Link>
                            /
                            <Link to={loginLink}>登录</Link>
                        </div>
                }
            </div>
        </div>
    );
}

export default React.memo(Header);