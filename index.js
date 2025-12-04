addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const title = url.searchParams.get('title')

  if (!title) {
    return new Response(JSON.stringify({
      status: false,
      message: 'Title is required',
      creator: 'Chamod Nimsara'
    }), { headers: { 'Content-Type': 'application/json' } })
  }

  try {
    const response = await fetch(`https://lrclib.net/api/search?q=${encodeURIComponent(title)}`, {
      headers: {
        referer: `https://lrclib.net/search/${encodeURIComponent(title)}`,
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36'
      }
    })

    const data = await response.json()

    return new Response(JSON.stringify({
      status: true,
      data,
      creator: 'Chamod Nimsara'
    }), { headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    return new Response(JSON.stringify({
      status: false,
      message: err.message,
      creator: 'Chamod Nimsara'
    }), { headers: { 'Content-Type': 'application/json' } })
  }
}
