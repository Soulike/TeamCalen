import axios from 'axios';
import {Response} from '../Class';

export async function getAsync(url: string, allowCache: boolean = true, params = {}): Promise<Response<any>>
{
    const {data} = await axios.get(url, allowCache ? {params} : {
        params: {
            ...params,
            _t: Date.now(),
        }
    });
    return data;
}

export async function postAsync(url: string, params = {}): Promise<Response<any>>
{
    const {data} = await axios.post(url, params);
    return data;
}

export async function putAsync(url: string, params = {}): Promise<Response<any>>
{
    const {data} = await axios.put(url, params);
    return data;
}