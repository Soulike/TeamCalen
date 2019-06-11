import React from 'react';
import Style from './Style.module.scss';
import Header from './Components/Header';

interface RootProps
{
    hasLoggedIn: boolean;
    loginLink: string;
    signUpLink: string;
    exitFunction: () => any;
    children?: JSX.Element;
}

function Root(props: RootProps)
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
            <main className={Style.main}>{children}</main>
            <div className={Style.backgroundLeft} />
            <div className={Style.backgroundRight} />
        </div>
    );
}

export default React.memo(Root);