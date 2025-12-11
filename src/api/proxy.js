// api/proxy.js
export default async function handler(request, response) {
  // Разрешаем CORS для вашего фронтенда (например, с GitHub Pages)
  response.setHeader('Access-Control-Allow-Origin', '*'); // или укажите ваш домен
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обработка preflight-запросов (OPTIONS)
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Получаем URL из query-параметра ?url=...
  const { url } = request.query;

  if (!url) {
    return response.status(400).json({ error: 'Missing "url" query parameter' });
  }

  try {
    // Делаем запрос к целевому API
    const targetResponse = await fetch(url);
    const contentType = targetResponse.headers.get('content-type') || 'application/json';

    // Передаём тело и тип контента
    const data = contentType.includes('application/json')
      ? await targetResponse.json()
      : await targetResponse.text();

    return response.status(targetResponse.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return response.status(500).json({ error: 'Failed to proxy request' });
  }
}