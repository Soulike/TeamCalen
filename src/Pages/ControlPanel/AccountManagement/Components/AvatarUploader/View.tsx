import React from 'react';
import Style from './Style.module.scss';
import Upload, {UploadChangeParam} from 'antd/lib/upload';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

interface Props
{
    onUploaderChange: (info: UploadChangeParam) => void;
    selectedFile?: File | Blob;
    onConfirm: React.MouseEventHandler<any>,
    isUploading: boolean,
}

function AvatarUploader(props: Readonly<Props>)
{
    const {onUploaderChange, selectedFile, onConfirm, isUploading} = props;
    return (
        <div className={Style.AvatarUploader}>
            <div className={Style.title}>头像修改</div>
            <div className={Style.uploadWrapper}>
                <Upload onChange={onUploaderChange}
                        accept={'image/*'}
                        beforeUpload={() => false}
                        showUploadList={false}>

                    {
                        selectedFile ?
                            <img src={URL.createObjectURL(selectedFile)}
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

export default React.memo(AvatarUploader);