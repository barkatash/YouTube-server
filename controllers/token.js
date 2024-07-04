const tokenService = require('../services/token');

const login = async (req, res) => {
    const {username, password} = req.body;
    const response = await tokenService.login(username, password);
    if (response.success){
        return res.status(response.status).send(response.data);
    }
    return res.status(response.status).json({message: response.message});
};

module.exports = { login };