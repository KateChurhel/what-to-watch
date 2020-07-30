// helpers
import { RequestError } from '../helpers/exceptions';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '6b19f7c4abb404c76cdab04bab4aaa89';

const contentTypes = {
  json: 'application/json',
  // text: 'text/html',
};

const encodeQueryData = (data) => {
  if (!data) {
    return '';
  }

  try {
    const queryStringStart = '?';

    return Object.keys(data).reduce((queryString, key, index) => {
      const paramStringStart = index ? '&' : '';
      let paramString = '';
      if (encodeURIComponent(data[key])) {
        paramString = `${paramStringStart}${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
      }

      return queryString + paramString;
    }, queryStringStart);
  } catch (e) {
    throw new TypeError('Error: incorrect query data format.');
  }
};

const getResponseData = async (response) => {

  const contentType = response.headers.get('content-type');

  if (contentType.includes(contentTypes.json)) {
    return response.json();
  }

  throw new TypeError('Error: incorrect received data format.');
};

const sendRequest = async (url = '', options = {}) => {
  const requestUrl = baseUrl + url;
  const requestHeaders = new Headers({
    'Content-Type': contentTypes.json,
  });

  const requestOptions = {
    headers: requestHeaders,
    ...options,
  };
  const response = await fetch(requestUrl, requestOptions);
  const responseData = await getResponseData(response);

  if (!response.ok) {
    throw new RequestError(response.status, responseData);
  }

  return responseData;
};

export const sendGetRequest = (url, data) => {
  const requestUrl = url + encodeQueryData({ ...data, api_key: apiKey, language: 'en-US' });
  const requestOptions = {
    method: 'GET',
  };

  return sendRequest(requestUrl, requestOptions);
};

export default sendGetRequest;
