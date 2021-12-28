const http = require('http');
const {Database} = require('querybuilder');

const qb = new Database({
    host: '127.0.0.1',
    port: 5432,
    database: 'application',
    user: 'sslack',
    password: 'sslack',
});

const routing = {
    '/create': async (req, res) => {
        await qb.in('systemuser')
            .insert([
                {name: 'Mike', login: 'mike_100'},
                {name: 'Vova', login: 'vovanezha'},
                {name: 'Alex', login: 'alex_123'},
            ])
            .resolve();

        const rows = await qb.in('systemuser')
            .select()
            .resolve();

        res.end(JSON.stringify(rows));
    },
    '/delete': async (req, res) => {
        await qb.in('systemuser')
            .delete()
            .where({name: 'Mike'}, {name: 'Alex'})
            .resolve();

        const rows = await qb.in('systemuser')
            .select()
            .resolve();

        res.end(JSON.stringify(rows));
    },
    '/list': async (req, res) => {
        const rows = await qb.in('systemuser')
            .select()
            .resolve();

        res.end(JSON.stringify(rows));
    },
}


const server = http.createServer(async (req, res) => {
    const handler = routing[req.url] || (() => res.end('not found'));
    handler(req, res);
});


server.listen(8000);
