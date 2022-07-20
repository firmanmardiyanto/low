export async function GET({ url }) {
	const token = url.searchParams.get('token');
	const error = url.searchParams.get('error');
	return {
		status: 200,
		body: {
			token,
			error: {
				message: error
			}
		}
	};
}
