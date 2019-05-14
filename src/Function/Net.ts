import axios from 'axios';
import {AxiosRequestConfig} from 'axios';

export async function getAsync(url: string, allowCache: boolean = true, params: AxiosRequestConfig = {}, config: AxiosRequestConfig = {}) : Promise<any>
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            const res = await axios.get(url, allowCache ? {params, ...config} : {
                params: {
                    ...params,
                    _t: Date.now(),
                },
                ...config,
            });
            resolve(res.data);
        }
        catch (e)
        {
            reject(e);
        }
    });

}

export async function postAsync(url: string, params: AxiosRequestConfig = {}, config: AxiosRequestConfig = {}): Promise<any>
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            const res = await axios.post(url, params, config);
            resolve(res.data);
        }
        catch (e)
        {
            reject(e);
        }
    });
}