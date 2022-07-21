import { browser } from '$app/env';

export default function share({ title, text, url, files }) {
	if (browser) {
		if (navigator.share) {
			navigator.share({
				title,
				text,
				url,
				files
			});
		} else {
			const a = document.createElement('a');
			a.href = url;
			a.target = '_blank';
			a.click();
		}
	} else {
		const a = document.createElement('a');
		a.href = url;
		a.target = '_blank';
		a.click();
	}
}
