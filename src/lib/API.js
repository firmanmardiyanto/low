import axios from 'axios';
import { BASE_API_URL, CONTEXTS } from '../utils/constants';
import { goto } from '$app/navigation';
import { browser } from '$app/env';
import authStore from '../stores/authStore';

const axiosAPI = axios.create({
	baseURL: BASE_API_URL
});

const getToken = () => {
	if (browser) return localStorage.getItem(CONTEXTS.TOKEN);
	return null;
};

const apiRequest = (method, url, request) => {
	const headers = {
		Authorization: `Bearer ${getToken()}`,
		Accept: 'application/json'
	};
	return axiosAPI({
		method,
		url,
		data: request,
		headers
	})
		.then((res) => {
			return Promise.resolve(res.data);
		})
		.catch((err) => {
			if (err.response.status === 401) {
				if (browser) {
                    authStore.reset();
				}
				goto('/auth/login');
			}
			return Promise.reject(err);
		});
};

const get = (url, request) => apiRequest('get', url, request);

const deleteRequest = (url, request) => apiRequest('delete', url, request);

const post = (url, request) => apiRequest('post', url, request);

const put = (url, request) => apiRequest('put', url, request);

const patch = (url, request) => apiRequest('patch', url, request);

const API = {
	get,
	delete: deleteRequest,
	post,
	put,
	patch
};
export default API;
