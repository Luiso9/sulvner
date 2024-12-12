<template>
	<div class="bg-white dark:bg-gray-900">
		<div class="container flex items-center min-h-screen px-4 py-6 mx-auto">
			<div>
				<p class="text-md font-medium text-blue-500 dark:text-blue-400">
					404 error
				</p>
				<h1
					class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl"
				>
					We can’t find that page
				</h1>
				<p class="mt-4 text-gray-500 dark:text-gray-400">
					Sorry, the page you are looking for doesn't exist or has been
					moved.
				</p>

				<div class="flex items-center mt-6 gap-x-3">
					<button
						class="flex items-center justify-center w-1/2 px-5 py-2 text-md text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 md:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-5 h-5 rtl:rotate-180"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
							/>
						</svg>

                        <!-- TODO : Implement getting user previous page and link those page into the Back router-link -->
						<router-link to="/">Go back</router-link>
					</button>

					<button
						class="w-1/2 px-5 py-2 text-md tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 md:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
					>
						<router-link to="/">Go Home</router-link>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "404Page",
};
</script>
