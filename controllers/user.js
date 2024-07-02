const userService = require('../services/user');

const getUser = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
    return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
};
const updateUser = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
};
const deleteUser = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
};

module.exports = { getUser, updateUser, deleteUser };