import axios, {AxiosResponse} from 'axios';

export async function getAsync(url: string, allowCache: boolean = true, params = {}): Promise<AxiosResponse>
{
    return await axios.get(url, allowCache ? {params, validateStatus: () => true} : {
        params: {
            ...params,
            _t: Date.now(),
        },
        validateStatus: () => true,
    });
}

export async function postAsync(url: string, params = {}): Promise<AxiosResponse>
{
    return await axios.post(url, params, {validateStatus: () => true});
}

export async function putAsync(url: string, params = {}): Promise<AxiosResponse>
{
    return await axios.put(url, params, {validateStatus: () => true});
}