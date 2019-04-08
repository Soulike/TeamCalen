import React from 'react';
import {Actions as AuthProcessorActions} from '../../../Components/AuthProcessor';
import {connect} from 'react-redux';
import Login from './View';
import message from 'antd/lib/message';
import {browserHistory} from 'react-router';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../../Router';
import {REGEX} from '../../../CONSTANT/REGEX';

class LoginContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.usernameInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
    }

    componentDidMount()
    {
        const {hasLoggedIn} = this.props;
        if (hasLoggedIn)
        {
            message.info('您已登录');
            browserHistory.push(PAGE_ID_TO_ROUTE[PAGE_ID.CONTROL_PANEL.INDEX]);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {hasLoggedIn} = this.props;
        if (hasLoggedIn)
        {
            browserHistory.push(PAGE_ID_TO_ROUTE[PAGE_ID.CONTROL_PANEL.INDEX]);
        }
    }

    onSubmit = async e =>
    {
        e.preventDefault();
        const username = this.usernameInputRef.current.input.value;
        const password = this.passwordInputRef.current.input.value;
        if (!REGEX.USERNAME.test(username) || !REGEX.PASSWORD.test(password))
        {
            message.warning('用户名或密码错误');
        }
        else
        {
            const {login} = this.props;
            login(username, password);
        }
    };

    render()
    {
        return (
            <Login usernameInputRef={this.usernameInputRef}
                   passwordInputRef={this.passwordInputRef}
                   onSubmit={this.onSubmit} />
        );
    }
}

const mapStateToProps = state =>
{
    const {AuthProcessor: {hasLoggedIn}} = state;
    return {hasLoggedIn};
};

const mapDispatchToProps = {
    login: AuthProcessorActions.loginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);