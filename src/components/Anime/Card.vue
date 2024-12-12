<template>
    <div class="anime-card bg-white rounded-lg p-4">
        <div class="anime-image-container w-full h-64 overflow-hidden rounded-md">
            <img :src="anime.image" :alt="anime.title" class="anime-image w-full h-full object-cover" />
        </div>
        <h3 class="anime-title text-lg font-semibold mt-2">
            {{ anime.title.substring(0, 26) + ".." }}
        </h3>
        <p class="anime-description text-sm text-gray-600">
            Type: {{ anime.type }} - Duration: {{ anime.duration }}
        </p>
        <p class="text-sm text-gray-600">
            Episodes: {{ anime.episodes }} (Sub: {{ anime.sub }}, Dub: {{ anime.dub }})
        </p>
        <div class="mt-2 flex space-x-2">
            <button @click="$emit('viewDetails', anime.id)"
                class="anime-details-button bg-blue-500 text-white px-3 py-1 rounded-md">
                View Details
            </button>
            <button @click="$emit('watchAnime', anime.id)"
                class="anime-watch-button bg-green-500 text-white px-3 py-1 rounded-md">
                Watch
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "AnimeCard",
    props: {
        anime: {
            type: Object,
            required: true,
        },
    },
};
</script>F