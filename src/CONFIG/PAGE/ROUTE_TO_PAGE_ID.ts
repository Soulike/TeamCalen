import {PAGE_ID_TO_ROUTE} from '../PAGE';

export const ROUTE_TO_PAGE_ID: { [key: string]: symbol } = {};

Object.getOwnPropertySymbols(PAGE_ID_TO_ROUTE).forEach(pageId =>
{
    ROUTE_TO_PAGE_ID[PAGE_ID_TO_ROUTE[pageId as unknown as string]] = pageId;   // 似乎是 TS 的 BUG，有待商榷
});