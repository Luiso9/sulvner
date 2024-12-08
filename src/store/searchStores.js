import { defineStore } from "pinia";
import { searchAnime } from "@/services/animeServices";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    query: "",
    searchResults: [],
    currentPage: 1,
  }),
  actions: {
    async fetchResults() {
      try {
        const data = await searchAnime(this.query, this.currentPage);
        if (data && data.results) {
          this.searchResults = data.results;
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
    setQuery(newQuery) {
      this.query = newQuery;
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
  },
});