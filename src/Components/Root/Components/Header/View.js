import React from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import '../../../../Static/teamcalen.svg';
import {Link} from 'react-router-dom';

function Header(props)
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

Header.propTypes = {
    hasLoggedIn: PropTypes.bool.isRequired,
    loginLink: PropTypes.string.isRequired,
    signUpLink: PropTypes.string.isRequired,
    exitFunction: PropTypes.func.isRequired,
};

export default Header;