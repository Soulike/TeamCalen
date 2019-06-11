import axios, {AxiosRequestConfig} from 'axios';

/**
 * @description dispatch http get request to specific url
 * @param {string} url - target url
 * @param {boolean} allowCache - whether allow browser to use cache for the request
 * @param params - items listed in query string
 * @param {AxiosRequestConfig} config - config of the request
 * @return {Promise<any>} - Data that server responses
 * */
export async function getAsync(url: string, allowCache: boolean = true, params = {}, config: AxiosRequestConfig = {}) : Promise<any>
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

/**
 * @description dispatch http post request to specific url
 * @param {string} url - target url
 * @param params - items listed in request body
 * @param {AxiosRequestConfig} config - config of the request
 * @return {Promise<any>} - Data that server responses
 * */
export async function postAsync(url: string, params = {}, config: AxiosRequestConfig = {}): Promise<any>
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

export async function putAsync(url: string, params = {}, config: AxiosRequestConfig = {}): Promise<any>
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            const res = await axios.put(url, params, config);
            resolve(res.data);
        }
        catch (e)
        {
            reject(e);
        }
    });
}