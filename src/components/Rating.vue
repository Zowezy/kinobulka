<script setup>
import { computed } from 'vue';

    const props = defineProps(['value','src'])
    const colorClass = computed(()=>{
        if (props.value >= 7) return 'text-main-green';
        if (props.value >=5) return 'text-main-yellow';
        return 'text-main-red'
    })

    const handleRate = computed(()=>{
        const numRate = props.value;
        return numRate.toFixed(1)
    })
    
</script>
<template>
    <li :class="['flex',colorClass]" ><img class="mr-2" :src="src" alt="">
        {{ handleRate }}
    </li>
</template>
