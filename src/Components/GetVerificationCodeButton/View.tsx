import React from 'react';
import Style from './Style.module.scss';

interface GetVerificationCodeButtonProps
{
    children?: JSX.Element;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    className?: string;
}

function GetVerificationCodeButton(props: GetVerificationCodeButtonProps)
{
    const {children, onClick, className} = props;
    return (
        <div onClick={onClick} className={`${Style.GetVerificationCodeButton} ${className || null}`}>
            {children}
        </div>
    );
}

export default React.memo(GetVerificationCodeButton);