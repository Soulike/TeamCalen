import React from 'react';
import PropTypes from 'prop-types';
import GetVerificationCodeButton from '../../Components/GetVerificationCodeButton';

class GetVerificationCodeButtonContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            textInButton: '获取验证码',
            hasSendVerificationCode: false,
        };
    }

    onClick = async () =>
    {
        const {onClick} = this.props;
        const {hasSendVerificationCode} = this.state;
        if (!hasSendVerificationCode)
        {
            const requestIsSuccessful = await onClick();    // 返回 true 就开始倒计时，返回 false 就不进行倒计时
            if (requestIsSuccessful)
            {
                this.setState({
                    hasSendVerificationCode: true,
                });
                const WAIT_SECONDS = 30;
                let secondsLeft = WAIT_SECONDS;
                const interval = setInterval(() =>
                {
                    this.setState({
                        textInButton: (--secondsLeft).toString(),
                    });
                }, 1000);

                setTimeout(() =>
                {
                    clearInterval(interval);
                    this.setState({
                        textInButton: '获取验证码',
                        hasSendVerificationCode: false,
                    });
                }, WAIT_SECONDS * 1000);
            }
        }
    };


    render()
    {
        const {textInButton} = this.state;
        return (
            <GetVerificationCodeButton onClick={this.onClick}>{textInButton}</GetVerificationCodeButton>
        );
    }
}

GetVerificationCodeButtonContainer.propTypes = {
    onClick: PropTypes.func.isRequired,
};
export default GetVerificationCodeButtonContainer;