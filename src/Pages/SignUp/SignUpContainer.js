import React from 'react';
import SignUp from './View';

class SignUpContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.usernameInputRef = React.createRef;
        this.passwordInputRef = React.createRef;
        this.confirmPasswordInputRef = React.createRef;
        this.emailInputRef = React.createRef;
        this.verificationCodeInputRef = React.createRef;
        this.getVerificationCodeButtonRef = React.createRef;
    }

    onGetVerificationCodeButtonClick = async () =>
    {

    };

    onSubmit = async e =>
    {
        e.preventDefault();
    };

    render()
    {
        return <SignUp usernameInputRef={this.usernameInputRef}
                       passwordInputRef={this.passwordInputRef}
                       confirmPasswordInputRef={this.confirmPasswordInputRef}
                       emailInputRef={this.emailInputRef}
                       verificationCodeInputRef={this.verificationCodeInputRef}
                       getVerificationCodeButtonRef={this.getVerificationCodeButtonRef}
                       onGetVerificationCodeButtonClick={this.onGetVerificationCodeButtonClick}
                       onSubmit={this.onSubmit} />;
    }
}

export default SignUpContainer;