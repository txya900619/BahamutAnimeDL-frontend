<template>
  <div id="search-bar" class="navbar-item-container">
    <div
      class="navbar-item"
      :class="{
        'input-focus': focused,
      }"
      @click="
        () => {
          input.focus();
        }
      "
    >
      <div class="input-slot">
        <div class="icon-warp">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            role="img"
            aria-hidden="true"
          >
            <path
              d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
            ></path>
          </svg>
        </div>
        <div class="input-warp">
          <input
            ref="input"
            v-model="inputValue"
            @focus="
              () => {
                if (!focused) {
                  focused = true;
                }
              }
            "
            @blur="focused = false"
          />
        </div>
      </div>
    </div>
    <div v-if="tempSearchResult" class="temp-search-result">
      <LoadingCircle v-if="waiting" />
      <div
        v-if="
          (searchResult.anime ? !searchResult.anime.length : true) && !waiting
        "
        class="notfound"
      >
        找不到與{{ inputValue }}有關的動畫
      </div>
      <div
        v-if="
          !waiting && (searchResult.anime ? searchResult.anime.length : false)
        "
        class="card-container"
      >
        <AnimeCard
          v-for="animeInfo in searchResult.anime"
          :key="animeInfo.video_sn"
          :info="animeInfo"
        />
      </div>
    </div>
    <div
      v-if="tempSearchResult"
      class="background-shadow"
      @click="tempSearchResult = false"
    />
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { animeSearchResponseBody } from "@/types/AnimeCard";
import Axios from "axios";
import { defineComponent, inject, ref, watch } from "vue";
import AnimeCard from "../../shared/AnimeCard.vue";
import LoadingCircle from "../../shared/LoadingCircle.vue";

export default defineComponent({
  name: "SearchBar",
  components: { AnimeCard, LoadingCircle },
  setup() {
    const isScrollLock = inject(store.isScrollLock, ref(false));
    const focused = ref(false);
    const input = ref(null);
    const inputValue = ref<string>("");
    const searchResult = ref<animeSearchResponseBody>(
      {} as animeSearchResponseBody
    );
    const tempSearchResult = ref(false);
    const waiting = ref(false);

    watch(inputValue, (v) => {
      waiting.value = true;
      tempSearchResult.value = Boolean(inputValue.value);
      isScrollLock.value = Boolean(inputValue.value);
      delay(async (v) => {
        searchResult.value = (
          await Axios.get(`/api/anime/v1/search.php?kw=${v}`)
        ).data;
        waiting.value = false;
      })(v);
    });

    return {
      focused,
      input,
      inputValue,
      searchResult,
      tempSearchResult,
      waiting,
    };
  },
});

function delay(fn: (...args: unknown[]) => void) {
  let timer: number | null = null;
  return (...args: unknown[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, 500);
  };
}
</script>
