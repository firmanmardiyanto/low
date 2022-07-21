export default function articleSlug({ title, authorId }) {
	const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
	return `${authorId}-${slug}`;
}
