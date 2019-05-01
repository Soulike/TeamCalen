import React from 'react';
import Root from '../../Components/Root';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../CONFIG';
import {connect} from 'react-redux';
import {Actions as AuthProcessorActions} from '../AuthProcessor';
import Modal from 'antd/lib/modal';
import Api from '../../Api';

class RootContainer extends React.Component
{
    onExitConfirm = async () =>
    {
        const requestIsSuccessful = await Api.sendPostLogoutRequestAsync();
        if (requestIsSuccessful)
        {
            const {setOffline} = this.props;
            setOffline();
        }
    };

    onExitClick = () =>
    {
        Modal.confirm({
            content: '确认退出 TeamCalen？',
            onOk: this.onExitConfirm,
        });
    };

    render()
    {
        const {children, hasLoggedIn} = this.props;
        return (
            <Root hasLoggedIn={hasLoggedIn}
                  loginLink={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]}
                  signUpLink={PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.SIGN_UP]}
                  exitFunction={this.onExitClick}>
                {children}
            </Root>
        );
    }
}

const mapStateToProps = state =>
{
    const {AuthProcessor: {hasLoggedIn}} = state;
    return {
        hasLoggedIn,
    };
};

const mapDispatchToProps = {
    setOffline: AuthProcessorActions.setOfflineAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);