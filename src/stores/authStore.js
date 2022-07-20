import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { CONTEXTS } from '../utils/constants';

const getUser = () => {
	try {
		if (browser) return JSON.parse(localStorage.getItem(CONTEXTS.USER));
		return null;
	} catch (error) {
		return null;
	}
};

const getToken = () => {
	try {
		if (browser) return localStorage.getItem(CONTEXTS.TOKEN);
		return null;
	} catch (error) {
		return null;
	}
};

const { subscribe, update } = writable({
	[CONTEXTS.IS_LOGGED_IN]: getToken() !== null,
	[CONTEXTS.USER]: getUser(),
	[CONTEXTS.TOKEN]: getToken()
});

export const setContext = (key, value) =>
	update((context) => {
		context[key] = value;
		return context;
	});

export const getContext = (key) => {
	let context = {};
	subscribe((_context) => {
		context = _context;
	});
	return context[key];
};

export const reset = () => {
	if (browser) {
		localStorage.removeItem(CONTEXTS.TOKEN);
		localStorage.removeItem(CONTEXTS.USER);
	}
	update((context) => {
		context[CONTEXTS.IS_LOGGED_IN] = false;
		context[CONTEXTS.USER] = null;
		context[CONTEXTS.TOKEN] = null;
		return context;
	});
};

export default {
	subscribe,
	reset,
	setContext,
	getContext
};
