import React from 'react';
import AvatarUploader from './View';
import message from 'antd/lib/message';
import Api from '../../../../../Api';
import {eventEmitter} from '../../../../../Singleton';
import {EVENT} from '../../../../../CONSTANT';

class AvatarUploaderContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            selectedFileObject: null,
            isUploading: false,
        };
    }

    setStateAsync = async state =>
    {
        return new Promise((resolve, reject) =>
        {
            try
            {
                this.setState(state, () =>
                {
                    resolve();
                });
            }
            catch (e)
            {
                console.error(e);
                reject();
            }
        });
    };

    onUploaderChange = ({fileList}) =>
    {
        const lastFile = fileList[fileList.length - 1];
        this.setState({
            selectedFileObject: lastFile.originFileObj,
        });
    };

    onConfirm = async () =>
    {
        const {selectedFileObject} = this.state;
        if (selectedFileObject === null)
        {
            message.warning('未选择头像文件');
        }
        else
        {
            await this.setStateAsync({isUploading: true});
            const requestIsSuccessful = await Api.sendPostUploadAvatarRequestAsync(selectedFileObject);
            await this.setStateAsync({isUploading: false});
            if (requestIsSuccessful)
            {
                eventEmitter.emit(EVENT.CONTROL_PANEL.USER_INFO_UPDATED);
            }
        }
    };

    render()
    {
        const {selectedFileObject, isUploading} = this.state;
        return (
            <AvatarUploader onUploaderChange={this.onUploaderChange}
                            selectedFileObject={selectedFileObject}
                            onConfirm={this.onConfirm}
                            isUploading={isUploading} />
        );
    }
}

export default AvatarUploaderContainer;