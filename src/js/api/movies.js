/* istanbul ignore file */
import { sendGetRequest } from './index';

export const getCategoryData = (category, data) => sendGetRequest(`/${category}/popular`, data);

export const getDetailsData = (category, id, data) => sendGetRequest(`/${category}/${id}`, data);

export const getSearchResult = (category, data) => sendGetRequest(`/search/${category}`, data);

export const getDiscoverResult = (data) => sendGetRequest('/discover/movie', data);

export const getGenres = () => sendGetRequest('/genre/movie/list');
