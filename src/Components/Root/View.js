import React from 'react';
import Style from './Style.module.scss';
import Header from './Components/Header';
import PropTypes from 'prop-types';

function Root(props)
{
    const {hasLoggedIn, loginLink, signUpLink, exitFunction, children} = props;
    return (
        <div className={Style.Root}>
            <Header {...{
                hasLoggedIn,
                loginLink,
                signUpLink,
                exitFunction,
            }} />
            <main>{children}</main>
            <div className={Style.backgroundLeft} />
            <div className={Style.backgroundRight} />
        </div>
    );
}

Root.propTypes = {
    hasLoggedIn: PropTypes.bool.isRequired,
    loginLink: PropTypes.string.isRequired,
    signUpLink: PropTypes.string.isRequired,
    exitFunction: PropTypes.func.isRequired,
};

export default Root;