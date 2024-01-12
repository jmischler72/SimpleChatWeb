<script lang="ts">

import type {CategoryObject} from "@/components/GifPicker/types/CategoryObject";
import type {ResponseObject} from "@/components/GifPicker/types/ResponseObject";

const tenorApiUrl = "https://tenor.googleapis.com/v2";

export default {
  props: {
    apiKey: {
      type: String,
      required: true
    },

  },
  data() {
    return {
      search: null,
      results: [] as ResponseObject[],
      tags: [] as CategoryObject[]
    }
  },
  mounted() {
    fetch(tenorApiUrl + `/categories?key=${this.apiKey}`)
        .then(res => res.json())
        .then(({tags}) => {
          this.tags = tags
        })
  },
  watch: {
    search: 'onSearch',
  },
  methods: {
    onSearch() {
      if (!this.search) {
        this.results = [];
        return;
      }
      fetch(tenorApiUrl + `/search?q=${this.search}}&limit=32&media_filter=gif,tinygif&key=${this.apiKey}`)
          .then(res => res.json())
          .then(data => {
            this.results = data.results;
          })

    },
  }
}
</script>

<template>
  <div class="w-[16rem] h-[20rem] flex flex-col bg-white rounded-lg shadow-[0_-1px_5px_rgba(0,0,0,0.4)] p-1">
    <header class="bg-[--light-color] shadow-lg relative z-1 rounded-lg px-1 py-2">
      <div class="flex items-center justify-between w-full ">
        <div class="flex items-center justify-between w-full rounded-lg border border-gray-500 gap-2 relative ">
          <input type="text"
                 v-on:keyup.enter="onSearch"
                 v-model="search"
                 class="w-[80%] flex border-none bg-transparent py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 h-12 px-4"
                 placeholder="Search for gifs...">
          <div class="absolute right-2 flex items-center h-full- cursor-pointer" @click="onSearch">
            <span class="material-symbols-outlined">search</span>
          </div>
        </div>
      </div>
    </header>
    <div class="h-full w-full flex overflow-hidden pt-2 ">
      <div class="overflow-auto p-4- w-full">
        <div v-if="search && results.length"
             class="grid grid-cols-2 grid-flow-row auto-rows-auto gap-1">
          <div
              v-for="(result, r) in results"
              :key="r"
              class="h-20 rounded-lg bg-cover text-white flex items-center justify-center font-semibold font-xl border-2 border-transparent hover:border-blue transition duration-300 cursor-pointer group z-1 overflow-hidden"
              :style="`background-image: url(${result.media_formats['tinygif'].url})`"
              @click="$emit('gifSent', result.media_formats['gif'].url)"
          />
        </div>
        <div v-else-if="tags.length" class="grid grid-cols-2 grid-flow-row auto-rows-auto gap-1">
          <div
              v-for="(tag, t) in tags"
              :key="t"
              class="h-20 rounded-lg bg-cover text-white flex items-center justify-center font-semibold font-xl border-2 border-transparent hover:border-blue transition duration-300 cursor-pointer group z-1 overflow-hidden "
              :style="`background-image: url(${tag.image})`"
              @click="search = tag.searchterm; onSearch()"
          >
            {{ tag.searchterm }}
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
