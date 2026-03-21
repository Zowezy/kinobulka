import axios from "axios";


export async function fetchWithProxyFallback(targetUrl, timeout = 10000) {
    // В режиме разработки пробуем использовать Vite proxy
    if (import.meta.env.DEV) {
      try {
        const kinopoiskId = targetUrl.split('kinopoisk=')[1];
        const viteProxyUrl = `/api/players?kinopoisk=${kinopoiskId}`;
        const response = await axios.get(viteProxyUrl, {
          responseType: 'json',
          timeout
        });
        return { data: response.data || response };
      } catch (error) {
      }
    }

    // В продакшене используем Netlify Functions (собственный сервер)
    if (!import.meta.env.DEV) {
      try {
        const response = await axios.get('/api/proxy', {
          params: { url: targetUrl },
          timeout,
          validateStatus: (status) => status < 500
        });
        
        if (response.status === 200 && response.data) {
          console.log('✅ Успешно через Netlify Functions');
          return { data: response.data };
        }
      } catch (error) {
        console.warn('⚠️ Netlify Functions недоступен, пробуем fallback прокси:', error.message);
      }
    }
  
    const proxyServices = [
      {
        name: 'codetabs',
        buildUrl: (url) => `https://api.codetabs.com/v1/proxy?quest=${url}`,
        transformResponse: (response) => response.data || response
      },
      {
        name: 'allorigins',
        buildUrl: (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
        transformResponse: (response) => {
          const data = response.data || response;
          if (typeof data === 'string') {
            try {
              return JSON.parse(data);
            } catch {
              return data;
            }
          }
          return data;
        }
      },
      {
        name: 'corsproxy',
        buildUrl: (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
        transformResponse: (response) => response.data || response
      },
      {
        name: 'cors-anywhere',
        buildUrl: (url) => `https://cors-anywhere.herokuapp.com/${url}`,
        transformResponse: (response) => response.data || response
      }
    ];
  
    const errors = [];
  
    // Пробуем каждый прокси по очереди
    for (const proxy of proxyServices) {
      try {
        const proxyUrl = proxy.buildUrl(targetUrl);
        // console.log(`🔄 Пробуем прокси: ${proxy.name}`);
        
        const response = await axios.get(proxyUrl, {
          responseType: 'json',
          timeout,
          validateStatus: (status) => status < 500
        });
  
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const data = proxy.transformResponse(response);
        if (data && (!data.error && !data.message?.includes('error'))) {
          // console.log(`✅ Успешно через прокси: ${proxy.name}`);
          return { data };
        } else {
          throw new Error('Invalid response data');
        }
      } catch (error) {
        // console.warn(`❌ Прокси ${proxy.name} недоступен:`, error.message);
        errors.push({ proxy: proxy.name, error });
        continue;
      }
    }
  
    const errorMessage = `Все прокси-сервисы недоступны. Ошибки: ${errors.map(e => `${e.proxy}: ${e.error.message}`).join('; ')}`;
    console.error('❌', errorMessage);
    throw new Error(errorMessage);
  }