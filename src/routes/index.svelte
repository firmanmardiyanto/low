<script>
	import Logo from '../components/Logo.svelte';
	import authStore from '../stores/authStore';
	import { CONTEXTS } from '../utils/constants';
	let user;
	authStore.subscribe((state) => {
		user = state[CONTEXTS.USER];
		console.log(state);
	});
</script>

<div class="flex items-center justify-center h-screen">
	<div class="flex items-center flex-col gap-3">
		<Logo />
		{#if user}
			<p class="text-center">You are logged in as {user.email}</p>
			<button
				on:click|once={() => authStore.reset()}
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
			>
				Logout
			</button>
		{/if}
		{#if !user}
			<p class="text-center">You are not logged in</p>
			<a href="/auth/login">
				<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
					Login
				</button>
			</a>
		{/if}
	</div>
</div>
