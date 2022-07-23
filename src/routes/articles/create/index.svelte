<script>
	import authStore from '../../../stores/authStore';
	import { CONTEXTS } from '../../../utils/constants';
	import articleSlug from '../../../utils/articleSlug';
	import API from '../../../lib/API';
	import { onMount } from 'svelte';
	import { browser } from '$app/env';

	let user;
	authStore.subscribe((state) => {
		user = state[CONTEXTS.USER];
		console.log(state);
	});

	let contents = '';
	let baseUrl = '';

	let categories = [];

	onMount(async () => {
		if (browser && typeof window !== 'undefined') {
			baseUrl = window.location.origin;
			const ClassicEditor = await import('@ckeditor/ckeditor5-build-classic/build/ckeditor.js');
			let toolbar = ClassicEditor.defaultConfig.toolbar.items;
			const removes = ['uploadImage'];
			toolbar = toolbar.filter((item) => removes.indexOf(item) === -1);
			ClassicEditor.default
				.create(document.querySelector('#contents'), {
					toolbar
				})
				.then((editor) => {
					window.editor = editor;
					editor.model.document.on('change:data', () => {
						contents = editor.getData();
						console.log(contents);
					});
				})
				.catch((err) => {
					console.error(err);
				});
		}

		API.get('/categories').then((res) => {
			categories = res.categories;
		});
	});

	let title = '';
	let description = '';
	let tags = '';
	let category_ids = [];
	let published = false;

	const onCancel = () => {
		window.history.back();
	};

	let error = '';
	let success = '';

	const onSubmit = () => {
		const data = {
			slug: articleSlug({ title, authorId: user.id }),
			title,
			description,
			content: contents,
			tags,
			category_ids,
			published: Boolean(published)
		};
		console.log(data);
		API.post('/articles', data)
			.then((res) => {
				if (res.status == 'error') {
					error = res.message;
				} else {
					success = 'Article created successfully';
					window.location.reload();
				}
			})
			.catch((err) => {
				error = err.message;
				success = '';
			});
	};
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
						<form class="space-y-8 divide-y divide-gray-200">
							<div class="space-y-8 divide-y divide-gray-200">
								<div>
									<div>
										<h3 class="text-lg leading-6 font-medium text-gray-900">Create</h3>
										<p class="mt-1 text-sm text-gray-500">Create new article</p>
									</div>

									<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
										<div class="sm:col-span-6">
											<label for="slug" class="block text-sm font-medium text-gray-700">
												Url
											</label>
											<div class="mt-1 flex rounded-md shadow-sm">
												<span
													class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
												>
													{baseUrl}/articles/detail/
												</span>
												<input
													type="text"
													readonly
													disabled
													name="slug"
													id="slug"
													value={articleSlug({
														title,
														authorId: user?.id
													})}
													autocomplete="off"
													class="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
												/>
											</div>
										</div>

										<div class="sm:col-span-6">
											<label for="title" class="block text-sm font-medium text-gray-700">
												Title
											</label>
											<div class="mt-1">
												<input
													type="text"
													name="title"
													bind:value={title}
													id="title"
													autocomplete="title"
													class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
												/>
											</div>
										</div>

										<div class="sm:col-span-6">
											<label for="description" class="block text-sm font-medium text-gray-700">
												Description
											</label>
											<div class="mt-1">
												<textarea
													id="description"
													bind:value={description}
													name="description"
													rows="3"
													class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
												/>
											</div>
											<p class="mt-2 text-sm text-gray-500">
												Describe your article in a few words.
											</p>
										</div>

										<div class="sm:col-span-6">
											<label for="contents" class="block text-sm font-medium text-gray-700">
												Contents
											</label>
											<div
												class="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md"
											>
												<div id="contents" class="" />
											</div>
										</div>

										<div class="sm:col-span-6">
											<label for="tags" class="block text-sm font-medium text-gray-700">
												Tags
											</label>
											<div class="mt-1">
												<input
													type="text"
													bind:value={tags}
													name="tags"
													id="tags"
													autocomplete="tags"
													class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
												/>
											</div>
											<p class="mt-2 text-sm text-gray-500">
												Add some tags to help people find your article.
											</p>
										</div>

										<div class="sm:col-span-6">
											<label for="categories" class="block text-sm font-medium text-gray-700">
												Categories
											</label>
											<div class="mt-1">
												<select
													multiple
													bind:value={category_ids}
													name="categories"
													id="categories"
													class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
												>
													<option value="" disabled>Select a category</option>
													{#each categories as category}
														<option value={category.id}>{category.name}</option>
													{/each}
												</select>
											</div>
											<p class="mt-2 text-sm text-gray-500">Select a category for your article.</p>

											<div class="sm:col-span-6">
												<div class="relative flex items-start mt-1">
													<div class="flex items-center h-5">
														<input
															id="publish"
															name="publish"
															bind:value={published}
															type="checkbox"
															class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
														/>
													</div>
													<div class="ml-3 text-sm">
														<label for="publish" class="font-medium text-gray-700">Publish?</label>
														<p class="text-gray-500">Publish your article to the public.</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="pt-5">
									<div class="flex justify-end">
										<small class="text-red-500 my-3">{error}</small>
										<small class="green-500 my-3">{success}</small>
									</div>
									<div class="flex justify-end">
										<button
											on:click={() => onCancel()}
											type="button"
											class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
											>Cancel</button
										>
										<button
											on:click={() => onSubmit()}
											type="button"
											class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
											>Save</button
										>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
