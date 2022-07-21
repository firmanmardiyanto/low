<script>
	import authStore from '../../../stores/authStore';
	import { CONTEXTS } from '../../../utils/constants';
	import share from '../../../utils/share';
	let user;
	authStore.subscribe((state) => {
		user = state[CONTEXTS.USER];
		console.log(state);
	});

	const articles = [
		{
			id: 1,
			title: 'ReactJs',
			description:
				'ReactJs is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.',
			created_by: 'Firman',
			created_at: '2020-01-01',
			tags: 'ReactJs, JavaScript, UI',
			viewers: 0
		},
		{
			id: 2,
			title: 'NodeJs',
			description:
				"Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Consequently, Node.js is a good choice for mid- to large-scale applications that are multi-threaded or use the cluster feature.",
			created_by: 'Mardiyanto',
			created_at: '2020-01-01',
			tags: 'NodeJs, JavaScript, Server',
			viewers: 97
		},
		{
			id: 3,
			title: 'Kotlin',
			description:
				'Kotlin is a programming language that is designed to be type-safe and flexible. It has a clean, simple syntax and is based on the concept of immutable data structures. It is a modern, interoperable, and robust language for building mobile and desktop applications.',
			created_by: 'Dwika',
			created_at: '2020-01-01',
			tags: 'Kotlin, Programming Language, Android',
			viewers: 92
		},
		{
			id: 4,
			title: 'Android Development',
			description:
				'Android is a mobile operating system developed by Google, based on the Linux kernel, and designed primarily for touchscreen mobile devices such as smartphones and tablets. It is based on the Android Runtime Environment (ART) and designed primarily for devices with a touch screen.',
			created_by: 'Hilmi',
			created_at: '2020-01-01',
			tags: 'Android, Programming Language, Mobile',
			viewers: 79
		}
	];
</script>

<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
	<h1 class="sr-only">Page title</h1>
	<!-- Main 3 column grid -->
	<div class="grid grid-cols-1 gap-4">
		<div class="grid grid-cols-1 gap-4 lg:col-span-2">
			<section aria-labelledby="section-1-title">
				<h2 class="sr-only" id="section-1-title">Content</h2>
				<div class="rounded-lg bg-white overflow-hidden shadow">
					<div class="p-6">
						<!-- Your content -->
						<!-- This example requires Tailwind CSS v2.0+ -->
						<ul class="grid grid-cols-1 gap-5">
							<div>
								<h3 class="text-lg leading-6 font-medium text-gray-900">Drafts</h3>
								<p class="mt-1 text-sm text-gray-500">List of draf articles</p>
							</div>
							{#each articles as article}
								<li class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
									<div class="w-full flex items-center justify-between p-6 space-x-6">
										<div class="flex-1 truncate">
											<div class="flex items-center space-x-3">
												<h3 class="text-gray-900 text-sm font-medium truncate">{article.title}</h3>
												<span
													class="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full"
													>{article.created_by}</span
												>
											</div>
											<p class="mt-1 text-gray-500 text-sm truncate">
												{article.description}
											</p>
										</div>
										<img
											class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
											src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
											alt=""
										/>
									</div>
									<div>
										<div class="-mt-px flex divide-x divide-gray-200">
											<div class="w-0 flex-1 flex">
												<a
													disabled
													href="#viewers"
													class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
												>
													{article.viewers} views
												</a>
											</div>
											{#if user}
												<div class="-ml-px w-0 flex-1 flex">
													<a
														href="tel:+1-202-555-0170"
														class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															class="h-6 w-6"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
															stroke-width="2"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
															/>
														</svg>
														<span class="ml-3">Bookmark</span>
													</a>
												</div>
											{/if}
											<div class="-ml-px w-0 flex-1 flex">
												<a
													on:click={() =>
														share({
															title: article.title,
															text: article.description,
															url: window.location.origin + '/articles/detail/' + article.id
														})}
													href="#share"
													class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="h-6 w-6"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														stroke-width="2"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
														/>
													</svg>
													<span class="ml-3">Share</span>
												</a>
											</div>
										</div>
									</div>
								</li>
							{/each}
							<!-- More people... -->
						</ul>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
