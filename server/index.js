const fs = require('fs');
const path = require('path');
const http = require('http');
const vm = require('vm');

const {Database} = require('querybuilder');
const box = require('box');

const ROUTES_PATH = './routes';
const HANDLERS_PATH = './handlers';

// TODO: use .env
const qb = new Database({
    host: '127.0.0.1',
    port: 5432,
    database: 'sslack',
    user: 'sslack',
    password: 'sslack',
});

async function createHandlers() {
    const handlersDir = fs.readdirSync(HANDLERS_PATH);

    const handlers = {};

    for await (const filename of handlersDir) {
        const {exports} = await box.execute(
            path.join(HANDLERS_PATH, filename),
            {
                context: vm.createContext({
                    ...box.COMMON_CONTEXT,
                    qb,
                })
            }
        );

        const name = `${filename[0].toUpperCase()}${filename.replace('.js', '').slice(1)}`
        handlers[name] = exports;
    }

    return handlers;
}

async function createRoutes(handlers) {
    const routesDir = fs.readdirSync(ROUTES_PATH);

    const routes = {};

    for await (const filename of routesDir) {
        const {exports} = await box.execute(
            path.join(ROUTES_PATH, filename),
            {
                context: vm.createContext({
                    ...box.COMMON_CONTEXT,
                    qb,
                    handlers,
                })
            }
        );

        exports.forEach(route => {
            const endpoint = `/${filename.replace('.js', '')}${route.route}`;

            routes[endpoint] = {method: route.method, handler: route.handler};
        })
    }

    return routes;
}

async function parseBody(req) {
    let body = [];
    return new Promise((resolve, reject) => {
        req
            .on('error', (err) => {
                reject(err);
            })
            .on('data', (chunk) => {
                body.push(chunk);
            })
            .on('end', () => {
                body = Buffer.concat(body).toString();

                try {
                    resolve(JSON.parse(body));
                } catch {
                    reject(new Error('Failed to parse provided JSON'));
                }
            });
    })
}

const handleRoute = (routes) => async (req, res) => {
    const route = routes[req.url];

    if (!route) {
        return res.end('not found');
    }

    if (route.method !== req.method) {
        return res.writeHead(404).end('invalid method');
    }

    try {
        const body = await parseBody(req);
        route.handler({req, res, body});
    } catch (error) {
        return res.writeHead(400).end(error.message)
    }
}

const server = http.createServer(async (req, res) => {
    const handlers = await createHandlers();

    const routes = await createRoutes(handlers);
    const handle = handleRoute(routes);

    handle(req, res);
});


server.listen(8000);
