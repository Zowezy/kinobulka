<script setup>
import { userMovieStore } from '@/store/MovieStore';
import Card from '../Card.vue';
import { userSearchStore } from '@/store/SearchStore';
import { ref } from 'vue';
import Preloader from '../Preloader.vue';
import { useRoute } from 'vue-router';

const searchStore = userSearchStore();

const searchInput = ref();

const sendSearchQuery = () => {
  searchStore.getItemsByQuery(searchInput.value);
}

</script>

<template>
    <div class="fastSearch flex flex-col items-center mt-20">
      <div class="searchBar m-20">
        <form class="flex justify-center" action="" @submit.prevent="sendSearchQuery" >
          <input
            v-model="searchInput"
            type="text"
            class="rounded-tl-lg rounded-bl-lg bg-light-blue text-light-gray p-[15px] lg:w-md sm:w-50 text-main-gray"
            placeholder="Укажите название"
          />
          <button
            type="submit"
            class="rounded-tr-lg rounded-tr-lg rounded-br-lg bg-light-blue text-light-gray p-[15px] w-15 text-main-gray cursor-pointer"
          >
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.36502 0.00878906C13.1226 0.198993 16.1111 3.30653 16.1111 7.11133L16.1014 7.47656C15.9111 11.234 12.8045 14.2225 8.99979 14.2227L8.63358 14.2129C7.17167 14.1387 5.82662 13.6224 4.7283 12.7959L1.70682 15.8184C1.3163 16.2086 0.683214 16.2088 0.292758 15.8184C-0.0976402 15.4279 -0.0975316 14.7948 0.292758 14.4043L3.31424 11.3818C2.48782 10.2835 1.97125 8.93849 1.89725 7.47656L1.88846 7.11133C1.88846 3.18411 5.07263 0.000234582 8.99979 0L9.36502 0.00878906ZM8.99979 2C6.1772 2.00023 3.88846 4.28868 3.88846 7.11133C3.88858 9.93387 6.17727 12.2224 8.99979 12.2227C11.8224 12.2225 14.111 9.93394 14.1111 7.11133C14.1111 4.28861 11.8225 2.00012 8.99979 2Z"
              fill="#9BA6B2"
            />
          </svg>
        </button>
        </form>

      </div>
      <div v-if="searchStore.result.docs" class="cardList grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        <Card  v-for="items in searchStore.result.docs" :key="items.id" :item=items @click="$router.push({name:'Single',params:{id:items.id}})" />
      </div>
      <Preloader class="mt-50" v-if="searchStore.isLoading" />
    </div>
</template>