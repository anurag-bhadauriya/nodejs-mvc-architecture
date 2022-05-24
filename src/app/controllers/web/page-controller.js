
class PageController {
    constructor() { }

    home(req, res) {
        res.send('Pages home page...');
    }

    about(req, res) {
        res.send('About path...');
    }

    contact(req, res) {
        res.send('Contact path...');
    }
}

module.exports = new PageController();