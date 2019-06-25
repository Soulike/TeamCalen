import React from 'react';
import Style from './Style.module.scss';
import Spin from 'antd/lib/spin';

interface GetVerificationCodeButtonProps
{
    children?: JSX.Element;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    className?: string;
    loading: boolean;
}

function GetVerificationCodeButton(props: GetVerificationCodeButtonProps)
{
    const {children, onClick, className, loading} = props;
    return (
        <div onClick={onClick} className={`${Style.GetVerificationCodeButton} ${className || null}`}>
            <Spin spinning={loading}>
                {children}
            </Spin>
        </div>
    );
}

export default React.memo(GetVerificationCodeButton);