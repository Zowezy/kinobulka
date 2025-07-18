<script setup>
import { ref } from 'vue';


const props = defineProps(['playlists'])

const isModalOpen = ref(false);
const linkSource = ref({
    name:props.playlists[0].source,
    link:props.playlists[0].iframeUrl
})

const changeSource = (item) => {
    linkSource.value = {
        name:item.source,
        link:item.iframeUrl
    }
}

const closeModal = (event) => {
    if (event.target.classList.contains('wrapPlayers')) {
        isModalOpen.value = false;
    }
}

</script>

<template>
    <div class="blockPlayer flex-col flex-column mt-20">
        <div class="selectSource flex justify-end items-center mb-2">
            <span class="text-white">Выбор плеера: </span>
            <button @click="() => isModalOpen = true" class="p-3 rounded-[6px] text-white bg-light-blue px-5 py-2 ml-1 cursor-pointer ">{{ linkSource.name }}</button>
            <div v-show="isModalOpen" @click="closeModal" class="wrapPlayers fixed top-0 left-0 w-full h-full bg-black/25 backdrop-blur-sm z-10">
                <div class="players fixed left-1/2 top-1/2 md:w-[40%] md:h-[20%] w-[80%] h-[35%] bg-light-blue z-20 transform -translate-x-1/2 -translate-y-1/2 flex justify-center text-center rounded-[6px]">
                    <div class="listOfPlayers mt-15">
                        <h1 class="text-white text-2xl mb-5 text-center">Доступные плееры:</h1>
                        <button @click="() => changeSource(item)" v-for="item in props.playlists" :key="item.id" class="bg-dark-blue py-2 px-5 text-white font-bold rounded-[6px] text-lg m-1 cursor-pointer">{{ item.source }}</button>
                    </div>
                </div>
            </div>
        </div>
        <iframe class="w-100 h-150" :src="linkSource.link" frameborder="0" allowfullscreen>
        </iframe>
    </div>
</template>