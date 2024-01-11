import { Router } from 'itty-router';
import Package from '../package-lock.json';

const router = Router();

router.get('/api/v1/:ip', async (request, env, context) => {
    let upstream: any = env.UPSTREAM || 'cfwho.com'
    let {params} = request

    // First, check they provided data via :ip
    if (!params.ip) return new Response('Not Found', { status: 404 })

    // Next, we perform the fetch as needed
    let res: any = await fetch(`https://${upstream}/api/v1/${params.ip}`, {
        headers: {
            'User-Agent': `${Package.name}/proxy ${Package.version}`
        }
    })

    // And return our response, whatever it may be
    return res
});

router.all("*", () => new Response("404, not found!", { status: 404 }));

export default {
	fetch: router.handle
}