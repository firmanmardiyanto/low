<script>
	import { browser } from '$app/env';
	import Logo from '../../../components/Logo.svelte';
	import { goto } from '$app/navigation';
	import API from '../../../lib/API';
	import { CONTEXTS } from '../../../utils/constants';
	import authStore from '../../../stores/authStore';

	export let token, error;
	let loading = true;

	if (browser) {
		if (token) {
			localStorage.setItem(CONTEXTS.TOKEN, token);
			authStore.setContext(CONTEXTS.TOKEN, token);
		}

		token = localStorage.getItem(CONTEXTS.TOKEN);

		API.get('/auth/me')
			.then((data) => {
				if (data.status == true) {
					localStorage.setItem(CONTEXTS.USER, JSON.stringify(data.user));
					authStore.setContext(CONTEXTS.USER, data.user);
					authStore.setContext(CONTEXTS.IS_LOGGED_IN, true);
				} else {
					if (data.message !== 'Unauthenticated.') error.message = data.message;
					authStore.reset();
				}
				loading = false;
			})
			.catch((error) => {
				error.message = error?.message || 'Something went wrong.';
				loading = false;
				authStore.reset();
			});
	} else {
		loading = false;
	}

	authStore.subscribe((state) => {
		if (state[CONTEXTS.IS_LOGGED_IN] && state[CONTEXTS.TOKEN] && state[CONTEXTS.USER]) {
			goto('/', { replaceState: true });
		}
	});
</script>

<div class="flex items-center justify-center h-screen">
	<div class="flex items-center flex-col gap-3">
		<Logo />

		{#if !loading}
			{#if error.message}
				<div class="rounded-md bg-yellow-50 p-4">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg
								class="h-5 w-5 text-yellow-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-yellow-800">Failed to login</h3>
							<div class="mt-2 text-sm text-yellow-700">
								<p>
									{error.message}
								</p>
							</div>
						</div>
					</div>
				</div>
			{/if}
			<div class="flex items-center gap-3">
				<a href="http://localhost:8000/api/auth/google">
					<img src="/icons/google.svg" alt="Google" class="w-12 h-12" />
				</a>
				<a href="http://localhost:8000/api/auth/facebook">
					<img src="/icons/facebook.svg" alt="Facebook" class="w-12 h-12" />
				</a>
			</div>
		{:else}
			<button
				type="button"
				class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow bg-indigo-500 hover:bg-indigo-700 text-white rounded-full transition ease-in-out duration-150"
				disabled={!error.message}
			>
				<svg
					class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
				Processing...
			</button>
		{/if}
	</div>
</div>
