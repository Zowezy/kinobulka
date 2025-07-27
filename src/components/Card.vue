<script setup >
import { computed, ref } from 'vue';
import 'animate.css'

    const props = defineProps(['item']);

    const rateColor = computed(() => {
        if (!props.item.rating?.kp) return '';
        const rating = props.item.rating.kp;
        if (rating >= 7) return 'text-main-green';
        if (rating >= 5) return 'text-main-yellow';
        return 'text-main-red';
    });

    const rateValue = computed(() => {
    return props.item.rating?.kp ? props.item.rating.kp.toFixed(1) : '?';
    });

    const getPosterImage = computed(() => {
        return props.item.poster?.url ? props.item.poster.url : '/no_img.png';
    });

</script>

<style>

</style>
<template>
    <div class="card bg-light-blue relative cursor-pointer mt-5 animate__animated animate__fadeIn hover:scale-105 transition-transform duration-300 ease-in-out">
        <div class="poster h-[100%] h-[330px]">
            <img class="h-[100%] w-[100%] object-cover rounded-[6px]" :src="getPosterImage" alt="">
        </div>
        <div class="mainText px-3 py-4">
            <h1 class="text-sm text-white block h-[50px]">{{ props.item.name }}</h1>
            <div class="miniDescr flex justify-between text-main-gray text-[12px] mt-[10px]">
                <p>{{ props.item.genres ? props.item.genres[0].name : '' }}</p>
                <p>{{ props.item.year }}</p>
            </div>
        </div>
        <div :class="rateColor" class="rate w-[32px] h-[32px] bg-dark-blue absolute p-1 text-center rounded-[100%] text-main-green top-[3%] right-[2%]">
            {{ rateValue }}
        </div>
    </div>
</template>