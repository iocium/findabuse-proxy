const Router = require('./router')
const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token, cf-access-client-id, cf-access-client-secret'
    }
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function get(request) {
    let path = new URL(request.url).pathname

    let res = await fetch(`${UPSTREAM}${path}`, {
        headers: {
            'User-Agent': 'findabuse.email/proxy 1.0.0'
        }
    })
    res = await res.text()

    try {
        res = JSON.parse(res)
        return new Response(JSON.stringify(res), headers)
    } catch (e) {
        return new Response(res, {
            'Content-Type': 'text/plain'
        })
    }

}

async function handleRequest(request) {
    const r = new Router()

    r.get('/.*', () => get(request))

    const resp = await r.route(request)
    return resp
}