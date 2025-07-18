import api from "@/api/api";
import { defineStore } from "pinia";

export const userMovieStore = defineStore('movieStore',{
    state: () =>({
        movie:[],
        tv:[],
        isLoading:true,
        countMovie: 2
    }),
    actions:{
        async getPopularItems(type,year) {
            this.isLoading = true;
            try {
                const response = await api.getPopularItems(type,year);
                if (type == 'movie') {
                    this.movie = response.docs;
                } else {
                    this.tv = response.docs;
                }
            } catch (error) {
                console.log('Ошибка: ' + error)
            } finally {
                this.isLoading = false;
            }
        }
    }
})