import React from 'react';
import {Actions as AuthProcessorActions} from '../../../ComponentContainer/AuthProcessor';
import {connect} from 'react-redux';
import Login from './View';
import message from 'antd/lib/message';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../../CONFIG';
import {REGEX} from '../../../CONSTANT';
import {RouteComponentProps, withRouter} from 'react-router-dom';

interface Props extends RouteComponentProps
{
    hasLoggedIn: boolean;
    login: (username: string, password: string) => Promise<any>;
}

class LoginContainer extends React.Component<Props>
{
    usernameInputRef: React.RefObject<any>;
    passwordInputRef: React.RefObject<any>;

    constructor(props: Readonly<Props>)
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
            this.props.history.push(PAGE_ID_TO_ROUTE[PAGE_ID.CONTROL_PANEL.SCHEDULE]);
        }
    }

    componentDidUpdate(prevProps: Props)
    {
        const {hasLoggedIn} = this.props;
        if (hasLoggedIn)
        {
            this.props.history.push(PAGE_ID_TO_ROUTE[PAGE_ID.CONTROL_PANEL.SCHEDULE]);
        }
    }

    onSubmit = async (e: React.FormEvent) =>
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

const mapStateToProps = (state: { AuthProcessor: { hasLoggedIn: boolean; }; }) =>
{
    const {AuthProcessor: {hasLoggedIn}} = state;
    return {hasLoggedIn};
};

const mapDispatchToProps = {
    login: AuthProcessorActions.loginAction,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));