export const isActivePath = ({pathname, path}) => {
	return pathname?.includes(path);
};

export const HOME_PAGE_PATH = '/';
export const CREATE_ARTICLE_PAGE_PATH = '/articles/create';
export const EDIT_ARTICLE_PAGE_PATH = '/articles/edit';
export const BOOKMARKS_PAGE_PATH = '/article/bookmarks';
export const DRAFTS_PAGE_PATH = '/article/drafts';
export const PUBLISHED_PAGE_PATH = '/article/published';

export default isActivePath;
