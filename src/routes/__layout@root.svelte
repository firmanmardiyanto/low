<script>
	import Logo from '../components/Logo.svelte';
	import authStore from '../stores/authStore';
	import { CONTEXTS } from '../utils/constants';
	import isActivePath, { CREATE_ARTICLE_PAGE_PATH } from '../utils/isActivePath';
	import { page } from '$app/stores';
	import { browser } from '$app/env';
	let pathname = '';
	if (browser) {
		pathname = window.location.pathname;
		page.subscribe((state) => {
			pathname = state.url.pathname;
		});
	} 
	
	let user;
	authStore.subscribe((state) => {
		user = state[CONTEXTS.USER];
		console.log(state);
	});

	let showMenuContext = false;

	const toggleProfileContext = (show = !showMenuContext) => {
		if (show) {
			showMenuContext = true;
		} else {
			showMenuContext = false;
		}
	};
</script>

<div class="min-h-full">
	<header class="pb-24 bg-indigo-600">
		<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
			<div class="relative py-5 flex items-center justify-center lg:justify-between">
				<!-- Logo -->
				<div class="absolute left-0 flex-shrink-0 lg:static">
					<a href="/">
						<span class="sr-only">Low</span>
						<Logo className="text-white" />
					</a>
				</div>

				<!-- Right section on desktop -->
				<div class="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
					<!-- Profile dropdown -->
					<div class="ml-4 relative flex-shrink-0">
						<div>
							{#if user}
								<button
									on:click={() => toggleProfileContext()}
									type="button"
									class="toggle-profile-menu bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100"
								>
									<span class="sr-only">Open user menu</span>
									<img class="h-8 w-8 rounded-full" src={user.photo_url} alt={user.name} />
								</button>
							{:else}
								<a
									href="/auth/login"
									class="whitespace-nowrap text-base font-medium text-white hover:text-gray-300"
								>
									Sign in
								</a>
							{/if}
						</div>

						<!--
                Dropdown menu, show/hide based on menu state.
  
                Entering: ""
                  From: ""
                  To: ""
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              -->
						{#if user}
							<div
								class={'origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ' +
									(showMenuContext ? 'block' : 'hidden')}
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="user-menu-button"
								tabindex="-1"
							>
								<!-- Active: "bzg-gray-100", Not Active: "" -->
								<a
									disabled
									class="block px-4 py-2 text-sm text-gray-700 font-bold"
									tabindex="-1"
									id="user-menu-item-0">{user.name}</a
								>
								<!-- Active: "bg-gray-100", Not Active: "" -->
								<a
									on:click={() => authStore.reset()}
									class="block px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:font-semibold cursor-pointer"
									role="menuitem"
									tabindex="-1"
									id="user-menu-item-2">Sign out</a
								>
							</div>
						{/if}
					</div>
				</div>

				<!-- Search -->

				{#if !isActivePath({ pathname, path: CREATE_ARTICLE_PAGE_PATH })}
					<div class="flex-1 min-w-0 px-12 lg:hidden">
						<div class="max-w-xs w-full mx-auto">
							<label for="desktop-search" class="sr-only">Search</label>
							<div class="relative text-white focus-within:text-gray-600">
								<div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
									<!-- Heroicon name: solid/search -->
									<svg
										class="h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
								<input
									id="desktop-search"
									class="block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
									placeholder="Search"
									type="search"
									name="search"
								/>
							</div>
						</div>
					</div>
				{/if}

				<!-- Menu button -->
				<div class="absolute right-0 flex-shrink-0 lg:hidden">
					<!-- Mobile menu button -->
					<button
						on:click={() => toggleProfileContext()}
						type="button"
						class="toggle-profile-menu bg-transparent p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white"
						aria-expanded="false"
					>
						<span class="sr-only">Open main menu</span>
						<svg
							class={`${showMenuContext ? 'hidden' : 'block'} h-6 w-6 toggle-profile-menu`}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
						<svg
							class={`${showMenuContext ? 'block' : 'hidden'} h-6 w-6 toggle-profile-menu`}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div class="hidden lg:block border-t border-white border-opacity-20 py-5">
				<div class="grid grid-cols-3 gap-8 items-center">
					<div class="col-span-2">
						<nav class="flex space-x-4">
							<!-- Current: "text-white", Default: "text-indigo-100" -->
							<a
								href="/"
								class="text-white text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
								aria-current="page"
							>
								Home
							</a>
							{#if user}
								<a
									href="/articles/bookmarks"
									class="text-indigo-100 text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
								>
									Bookmarks
								</a>

								<a
									href="/articles/published"
									class="text-indigo-100 text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
								>
									Published
								</a>

								<a
									href="/articles/drafts"
									class="text-indigo-100 text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
								>
									Draf
								</a>
								<a
									href="/articles/create"
									class="text-indigo-100 text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
								>
									Create
								</a>
							{/if}
						</nav>
					</div>
					{#if !isActivePath({ pathname, path: CREATE_ARTICLE_PAGE_PATH })}
						<div>
							<div class="max-w-md w-full mx-auto">
								<label for="mobile-search" class="sr-only">Search</label>
								<div class="relative text-white focus-within:text-gray-600">
									<div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
										<!-- Heroicon name: solid/search -->
										<svg
											class="h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
												clip-rule="evenodd"
											/>
										</svg>
									</div>
									<input
										id="mobile-search"
										class="block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
										placeholder="Search"
										type="search"
										name="search"
									/>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>

		<!-- Mobile menu, show/hide based on mobile menu state. -->
		<div class={showMenuContext ? 'lg:hidden' : 'hidden'}>
			<!--
          Mobile menu overlay, show/hide based on mobile menu state.
  
          Entering: "duration-150 ease-out"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "duration-150 ease-in"
            From: "opacity-100"
            To: "opacity-0"
        -->
			<div class="z-20 fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" />

			<!--
          Mobile menu, show/hide based on mobile menu state.
  
          Entering: "duration-150 ease-out"
            From: "opacity-0 scale-95"
            To: "opacity-100 scale-100"
          Leaving: "duration-150 ease-in"
            From: "opacity-100 scale-100"
            To: "opacity-0 scale-95"
        -->
			<div
				class="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
			>
				<div
					class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200"
				>
					<div class="pt-3 pb-2">
						<div class="flex items-center justify-between px-4">
							<div>
								<Logo />
							</div>
							<div class="-mr-2">
								<button
									on:click={() => toggleProfileContext(false)}
									type="button"
									class="toggle-profile-menu bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
								>
									<span class="sr-only">Close menu</span>
									<!-- Heroicon name: outline/x -->
									<svg
										class="h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>
						<div class="mt-3 px-2 space-y-1">
							<a
								href="/"
								class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
								>Home</a
							>
							{#if user}
								<a
									href="/articles/bookmarks"
									class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
									>Bookmarks</a
								>
								<a
									href="/articles/published"
									class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
									>Published</a
								>
								<a
									href="/articles/drafts"
									class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
									>Drafts</a
								>
								<a
									href="/articles/create"
									class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
									>Create</a
								>
							{/if}
						</div>
					</div>
					<div class="pt-4 pb-2">
						{#if user}
							<div class="flex items-center px-5">
								<div class="flex-shrink-0">
									<img
										class="h-10 w-10 rounded-full"
										src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										alt=""
									/>
								</div>
								<div class="ml-3 min-w-0 flex-1">
									<div class="text-base font-medium text-gray-800 truncate">{user.name}</div>
									<div class="text-sm font-medium text-gray-500 truncate">{user.email}</div>
								</div>
							</div>
							<div class="mt-3 px-2 space-y-1">
								<a
									href="#"
									class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
									>Sign out</a
								>
							</div>
						{:else}
							<div class="mt-3 px-2 space-y-1">
								<a
									href="#"
									class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
									>Sign in</a
								>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</header>
	<main class="-mt-24 pb-8">
		<slot />
	</main>
	<footer>
		<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
			<div class="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
				<span class="block sm:inline">&copy;{new Date().getFullYear()} Low.</span>
				<span class="block sm:inline">All rights reserved.</span>
			</div>
		</div>
	</footer>
</div>
