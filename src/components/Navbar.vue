<script setup>
import { ref, watch } from 'vue';
const navItems = [
    { id: 1, path: '/', label: 'Поиск', src: `${import.meta.env.BASE_URL}icons/search.svg` },
    { id: 2, path: '/popular', label: 'Популярное', src: `${import.meta.env.BASE_URL}icons/search.svg`}
]
const activeMenu = ref(false);
function changeToggle() {
    activeMenu.value = !activeMenu.value;
}

</script>

<template>
    <button
        class="sm:hidden z-2 left-2.5 top-10 fixed rounded-[6px] text-64 absolute p-3 cursor-pointer text-white duration-200 ease-in bg-light-blue p-2 rounded-[6px]"
        @click="changeToggle">
        <span class="text-[19px]">☰</span>
    </button>
    <nav class="sidebar z-1 sm:fixed left-0 top-0 bg-light-blue float-left min-h-max h-[100%] fixed p-0 sm:p-1 overflow-hidden duration-200 ease-in"
        :class="[activeMenu ? 'w-[65px] sm:w-[250px]' : 'w-[0px] sm:w-[70px]']">
        <div class="hidden sm:block logo text-center mt-10">
            <p class="text-[32px]">🍞</p>
        </div>
        <div class="toggler mt-20 hidden sm:flex justify-center">
            <button
                class="bg-light-blue hover:bg-dark-blue cursor-pointer text-white p-2 rounded-[6px] text-[24px] w-full transition"
                @click="changeToggle">
                <span v-if="activeMenu" class=""><</span>
                <span v-else>></span>
            </button>
        </div>
        <div class="items mt-40 sm:mt-20">
            <router-link
                    v-for="item in navItems"
                    :key="item.id"
                    :to="item.path"
                    class="transition p-4 m-1 text-white text-[17px] cursor-pointer flex rounded-[6px] items-center hover:bg-dark-blue"
                    active-class="bg-dark-blue"
                    exact-active-class=""
                    >
                        <img class="mr-8 w-[19px]" :src="item.src" alt=""><span>{{ item.label }}</span>
                </router-link>
        </div>
    </nav>
</template>