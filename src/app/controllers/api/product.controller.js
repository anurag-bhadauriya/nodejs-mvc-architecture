class ProductController {

    async index(req, res) {
        // Fetching the user who called this api ( This info is set via authentication middleware)
        const user = req.user;
        return res.send(`This is product index for user: ${user.firstName}`);
    }
}

module.exports = new ProductController();