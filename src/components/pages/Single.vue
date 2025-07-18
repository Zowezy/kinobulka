<style>
iframe {
    border-radius: 6px;
    width: 100%;
}

#kinobd-loading {
    border-radius: 6px;
}

#kinobd {
    height: 100%;
}
</style>

<script setup>
import { computed, onMounted} from 'vue';
import Card from '../Card.vue';
import { useSingleStore } from '@/store/SingleStore';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import Preloader from '../Preloader.vue';
import Rating from '../Rating.vue';
import Players from '../Players.vue';

const singleStore = useSingleStore();
const route = useRoute()



const getData = async (id) => {
    await singleStore.fetchMovieData(id)
}


onMounted(() => {
    getData(route.params.id)
})

onBeforeRouteUpdate((to, from, next) => {
    if (to.params.id !== from.params.id) {
        getData(to.params.id)
    }
    next()
})


const getTiming = computed(() => {
    const length = singleStore.info.movieLength || 0;
    const hours = Math.floor(length / 60);
    const minutes = length % 60;
    return `${hours}ч ${minutes}мин`;
});



</script>


<template>
    <Preloader class="m-auto mt-100" v-if="singleStore.isLoading" />
    <div v-else class="container mx-auto max-w-7xl ">
        <div
            class="main grid grid-cols-1 xl:grid-cols-[30%_70%] bg-light-blue rounded-[6px] p-10 justify-center mt-20 sm:mt-20">
            <div class="poster flex justify-center">
                <img class="w-65 rounded-[6px]" :src="singleStore.info.poster" alt="">
            </div>
            <div class="mainText flex flex-col min-h-[auto] md:ml-15 mt-5 md:mt-0">
                <h2 class="text-white text-[26px] text-center sm:text-start">{{ singleStore.info.name }}</h2>
                <ul class="flex flex-wrap text-[14px] text-white mt-2">
                    <li class="flex mr-5 mt-2 sm:mt-0"><img class="mr-2" src="/icons/year.svg">{{ singleStore.info.year
                        }}
                    </li>
                    <li class="flex mr-5 mt-2 sm:mt-0"><img class="mr-2" src="/icons/time.svg">{{ getTiming }}</li>
                    <li class="flex mr-5 mt-2 sm:mt-0"><img class="mr-2" src="/icons/genre.svg">{{
                        singleStore.info.genre }}</li>
                    <li class="flex mr-5 mt-2 sm:mt-0"><img class="mr-2" src="/icons/language.svg">{{
                        singleStore.info.country }}</li>
                    <li></li>
                </ul>
                <p class="mt-3 text-justify text-main-gray text-[18px]">
                    {{ singleStore.info.description }}
                </p>
                <div class="ratings flex md:mt-auto mt-10">
                    <ul class="flex text">
                        <Rating :value="singleStore.info.ratings.kp" :src="'/icons/kp.svg'" />
                        <Rating :value="singleStore.info.ratings.imdb" :src="'/icons/imdb.svg'" />
                    </ul>
                </div>
            </div>
        </div>
        <Players v-show="singleStore.playlists.length > 0" :playlists="singleStore.playlists" />
        <div v-if="singleStore.info.similarMovies.length > 0" class="blockReco mb-10">
            <h1 class="text-[24px] text-white mt-20 mb-5">Могут заинтересовать</h1>
            <div class="cardList grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                <Card  v-for="item in singleStore.info.similarMovies"
                    @click="$router.push({ name: 'Single', params: { id: item.id } })" :key="item.id" :item="item" />
            </div>
        </div>
    </div>
</template>