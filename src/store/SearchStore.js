import api from "@/api/api";
import { defineStore } from "pinia";

export const userSearchStore = defineStore('searchStore',{
    state: () =>({
        query:'',
        result:[

        ],
        isLoading:false
    }),
    getters:{ // Функции предназначеные для вытягивания из общего стора определенную информацию
    },
    actions:{
        async getItemsByQuery(query) {
            this.result = null;
            this.isLoading = true;
            try {
                const response = await api.getSearchItems(query);
                this.result = response
            } catch (error) {
                console.log('Ошибка:' + error);
            } finally {
                this.isLoading = false;
            }
        }
    }
})