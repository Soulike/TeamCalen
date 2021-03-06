import React from 'react';
import GetVerificationCodeButton from '../../Components/GetVerificationCodeButton';

interface GetVerificationCodeButtonContainerProps
{
    onClick: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
}

interface GetVerificationCodeButtonContainerState
{
    textInButton: string,
    hasSendVerificationCode: boolean,
    loading: boolean,
}

class GetVerificationCodeButtonContainer extends React.Component<GetVerificationCodeButtonContainerProps, GetVerificationCodeButtonContainerState>
{
    constructor(props: Readonly<GetVerificationCodeButtonContainerProps>)
    {
        super(props);
        this.state = {
            textInButton: '获取验证码',
            hasSendVerificationCode: false,
            loading: false,
        };
    }

    onClick = async () =>
    {
        const {onClick} = this.props;
        const {hasSendVerificationCode} = this.state;
        if (!hasSendVerificationCode)
        {
            this.setState({loading: true});
            const requestIsSuccessful = await onClick();    // 返回 true 就开始倒计时，返回 false 就不进行倒计时
            this.setState({loading: false});
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
        const {textInButton, loading} = this.state;
        return (
            <GetVerificationCodeButton onClick={this.onClick}
                                       loading={loading}><span>{textInButton}</span></GetVerificationCodeButton>
        );
    }
}

export default GetVerificationCodeButtonContainer;