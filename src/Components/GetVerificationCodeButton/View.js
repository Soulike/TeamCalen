import React from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';

function GetVerificationCodeButton(props)
{
    const {children, onClick, className} = props;
    return (
        <div onClick={onClick} className={`${Style.GetVerificationCodeButton} ${className || null}`}>
            {children}
        </div>
    );
}

GetVerificationCodeButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
};

GetVerificationCodeButton.defaultProps = {
    textInButton: '获取验证码',
};

export default GetVerificationCodeButton;