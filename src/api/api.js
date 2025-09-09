import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.kinopoisk.dev/v1.4/', // Пример API
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-KEY': import.meta.env.VITE_API_KEY
  }
});

const playersApi = axios.create({
  baseURL:'https://p.ddbb.lol/api'
})

const playersApiLumen = axios.create({
  baseURL:'https://portal.lumex.host/api/'
})

const setupInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      console.log(`[${instance.defaults.baseURL}] Запрос:`, config.url);
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      console.error(`Ошибка от ${instance.defaults.baseURL}:`, error.response?.status);
      return Promise.reject(error);
    }
  );
};

// Применяем интерсепторы
setupInterceptors(api);
setupInterceptors(playersApi);

// methods
export default {
  // Поисковая выдача
    getSearchItems(query) {
        return api.get(`movie/search?query=${query}&limit=30`)
    },
  // Единый фильм
    getSingleItem(id) {
        return api.get(`movie/${id}`)
    },
  // Популярное
    getPopularItems(type,year) {
      console.log('ENV:', import.meta.env);
      return api.get(`movie?page=1&limit=30&selectFields=id&selectFields=name&selectFields=year&selectFields=rating&selectFields=genres&selectFields=poster&sortField=lists&sortField=externalId.kpHD&sortType=-1&sortType=-1&type=${type}&status=&year=${year}`)
    },
    getVideo(id) {
      return playersApiLumen.get(`short?api_token=84a1846c97497dccf7c9758d20552c3e&kinopoisk_id=${id}`)
    },
    // getVideos(id) {
    //   return axios.get(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://p.ddbb.lol/api/players?kinopoisk=${id}`)}`, {
    //     responseType: 'json'
    //   });
    // },
    // getVideos(id) {
    //   return axios.get(`https://p.ddbb.lol/api/players?kinopoisk=${id}`,{
    //     responseType: 'json'
    //   });
    // },
    getVideos(id) {
      const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=';
      const targetUrl = `https://p.ddbb.lol/api/players?kinopoisk=${id}`;
      return axios.get(proxyUrl + targetUrl,{
        responseType: 'json'
      });
    }
}