import api from "@/api/api";
import { defineStore } from "pinia";

export const useSingleStore = defineStore('singleStore',{
    state: () =>({
        info: {
            id: null,
            name: '',
            description: '',
            year: null,
            length: 0,
            genre: '',
            poster: '',
            ratings: {
                kp: 0,
                imdb: 0
            },
            country: '',
            similarMovies: []
        },
        playlists: [],
        isLoading: true
    }),
    getters:{ // Функции предназначеные для вытягивания из общего стора определенную информацию
    },
    actions:{
        async fetchMovieData(movieId) {
            this.isLoading = true;
            try {
                await Promise.all([
                this.getAboutItem(movieId),
                this.getVideo(movieId)
                ]);
            } catch (error) {
                this.error = error;
                console.error('Ошибка загрузки:', error);
            } finally {
                this.isLoading = false;
            }
        },
        async getAboutItem(movieId) {
            try {
                const response = await api.getSingleItem(movieId);
                const {id,name,type,description,year,movieLength,seriesLength,genres,poster,rating,countries,similarMovies} = response;
                this.info = {
                id,
                name,
                poster: poster?.url || '',
                description,
                year,
                length: type === 'movie' ? movieLength : seriesLength,
                genre: genres?.[0]?.name || 'Не указано',
                ratings: {
                    kp: rating?.kp || 0,
                    imdb: rating?.imdb || 0
                },
                country:countries[0].name,
                similarMovies:similarMovies.slice(0,5)
                }
            } catch (error) {
                console.log('Ошибка: ' + error)
            }
        },
        async getVideo(id) {
            try {
                const response = await api.getVideos(id);
                this.playlists = response.data;
            } catch (error) {
                console.log('Ошибка: ' + error)
            }
        }
    }
})