module.exports = {
    group: {
        prefix: '/pages'
    },
    routes: [
        {
            method: 'get',
            path: '/',
            handler: (req, res) => {
                res.send('Pages home page...');
            }
        },
        {
            method: 'get',
            path: '/about',
            handler: (req, res) => {
                res.send('About path...');
            }
        },
        {
            method: 'get',
            path: '/contact',
            handler: (req, res) => {
                res.send('Contact path...');
            }
        }
    ]
}