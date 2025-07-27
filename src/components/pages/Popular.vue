<style scoped>
    button.active {
        background: #171A21;
        color: white;
    }
    button {
        padding: 10px 20px;
        margin: 3px;
        color: #9BA6B2;
    }
</style>
<script setup>
import { ref, watch } from 'vue';
import Card from '../Card.vue';
import { userMovieStore } from '@/store/MovieStore';
import Preloader from '../Preloader.vue';

const movieStore = userMovieStore();

const type = ref('movie');
const year = new Date().getFullYear();

const changeType = (val) => {
    type.value = val
}

watch(type, async(newType) => {
    const apiType = newType === 'tv' ? 'tv-series' : newType;
    if (movieStore[newType].length === 0) {
        await movieStore.getPopularItems(apiType, year);
    }
}, { immediate: true });

</script>
<template>
    <div class="collection flex flex-col items-center">
        <div class="header lg:w-[100%] mt-20 flex flex-col lg:flex-row justify-center lg:justify-between mb-10">
            <h1 class="block text-[32px] text-center lg:mb-0 mb-5 text-white text-center">Популярное</h1>
            <div class="toogler flex bg-light-blue rounded-[6px] text-[18px]">
                <button @click="changeType('movie')" :class="type == 'movie' ? 'active' : ''" class="cursor-pointer rounded-[6px] transition">Фильмы</button>
                <button @click="changeType('tv')" :class="type == 'tv' ? 'active' : ''" class="cursor-pointer rounded-[6px] transition">Сериалы</button>
            </div>
        </div>
        <Preloader v-if="movieStore.isLoading" />
        <div v-else class="cardList grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            <Card 
            v-for="item in (type === 'movie' ? movieStore.movie : movieStore.tv)" 
            @click="$router.push({name:'Single',params:{id:item.id}})"
            :key="item.id" 
            :item="item" />
        </div>
    </div>
</template>