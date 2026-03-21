export default async (req, context) => {
  // Разрешаем CORS для вашего фронтенда
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY'
  };

  // Обработка preflight-запросов (OPTIONS)
  if (req.method === 'OPTIONS') {
    return new Response('OK', { 
      status: 200,
      headers: corsHeaders
    });
  }

  try {
    // Получаем URL из query-параметра ?url=...
    const url = new URL(req.url);
    const targetUrl = url.searchParams.get('url');

    if (!targetUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing "url" query parameter' }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    // Делаем запрос к целевому API с API ключом
    const apiKey = context.env.VITE_API_KEY || process.env.VITE_API_KEY;
    
    const targetResponse = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-KEY': apiKey || ''
      }
    });

    const contentType = targetResponse.headers.get('content-type') || 'application/json';
    const data = contentType.includes('application/json')
      ? await targetResponse.json()
      : await targetResponse.text();

    return new Response(
      JSON.stringify(data),
      { 
        status: targetResponse.status,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to proxy request', details: error.message }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
};
