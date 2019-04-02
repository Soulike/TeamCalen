import React from 'react';
import Style from './Style.module.scss';
import Upload from 'antd/lib/upload';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import PropTypes from 'prop-types';

function AvatarUploader(props)
{
    const {onUploaderChange, selectedFileObject, onConfirm, isUploading} = props;
    return (
        <div className={Style.AvatarUploader}>
            <div className={Style.title}>头像修改</div>
            <div className={Style.uploadWrapper}>
                <Upload onChange={onUploaderChange}
                        accept={'image/*'}
                        beforeUpload={() => false}
                        showUploadList={false}>

                    {
                        selectedFileObject ?
                            <img src={URL.createObjectURL(selectedFileObject)}
                                 alt="preview"
                                 className={Style.preview} /> :
                            <Button htmlType={'button'} className={Style.uploaderButton}>
                                <Icon type="plus" className={Style.iconInButton} />
                                <div className={Style.textInButton}>点击选择图片</div>
                            </Button>
                    }
                </Upload>
            </div>
            <div className={Style.submitButtonWrapper}>
                <Button htmlType={'button'} type={'primary'} onClick={onConfirm} loading={isUploading}>上传</Button>
            </div>
        </div>
    );
}

AvatarUploader.propTypes = {
    onUploaderChange: PropTypes.func.isRequired,
    selectedFileObject: PropTypes.instanceOf(File),
    onConfirm: PropTypes.func.isRequired,
    isUploading: PropTypes.bool.isRequired,
};

export default AvatarUploader;