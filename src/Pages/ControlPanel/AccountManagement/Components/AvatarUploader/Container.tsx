import React from 'react';
import AvatarUploader from './View';
import message from 'antd/lib/message';
import Api from '../../../../../Api';
import {eventEmitter} from '../../../../../Singleton';
import {EVENT} from '../../../../../CONSTANT';
import {UploadChangeParam} from 'antd/lib/upload';

interface Props {}

interface State
{
    selectedFile?: File;
    isUploading: boolean
}

class AvatarUploaderContainer extends React.Component<Props, State>
{
    constructor(props: Readonly<Props>)
    {
        super(props);
        this.state = {
            selectedFile: undefined,
            isUploading: false,
        };
    }

    setStateAsync = async (state: object) =>
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

    onUploaderChange = ({fileList}: UploadChangeParam) =>
    {
        const lastFile = fileList[fileList.length - 1];
        this.setState({
            selectedFile: lastFile.originFileObj,
        });
    };

    onConfirm = async () =>
    {
        const {selectedFile} = this.state;
        if (!selectedFile)
        {
            message.warning('未选择头像文件');
        }
        else
        {
            await this.setStateAsync({isUploading: true});
            const requestIsSuccessful = await Api.sendPostUploadAvatarRequestAsync(selectedFile);
            await this.setStateAsync({isUploading: false});
            if (requestIsSuccessful)
            {
                eventEmitter.emit(EVENT.CONTROL_PANEL.USER_INFO_UPDATED);
            }
        }
    };

    render()
    {
        const {selectedFile, isUploading} = this.state;
        return (
            <AvatarUploader onUploaderChange={this.onUploaderChange}
                            selectedFile={selectedFile}
                            onConfirm={this.onConfirm}
                            isUploading={isUploading} />
        );
    }
}

export default AvatarUploaderContainer;