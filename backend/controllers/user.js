const User = require("../models/user");

async function getAllUsers(req, res) {
    try {
        const users = await User.find({ role: { $ne: "quản trị viên" } });
        const userData = users.map(user => ({
            name: user.username,
            email: user.email,
            role: user.role
        }));
        res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred" });
    }
}

async function getApprovedUsers(req, res) {
    try {
        const users = await User.find({ role: { $nin: ["quản trị viên", "thành viên không chính thức"] } });
        const userData = users.map(user => ({
            id: user._id,
            name: user.username,
            email: user.email,
            role: user.role
        }));
        res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred" });
    }
}

async function getAwaitApprovedUsers(req, res) {
    try {
        const users = await User.find({ role: { $nin: ["quản trị viên", "thành viên"] } });

        const userData = users.map(user => ({
            id: user._id,
            name: user.username,
            email: user.email,
            role: user.role
        }));
        res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "An error occurred" });
    }
}

async function deleteUserById(req, res) {

    try {
        const { id } = req.params;
        User.findOneAndDelete({ _id: id })
            .then((result) => {
                res.status(202).json({ message: "user deleted successfully" });
            })
            .catch((error) => {
                res.status(500).json({ error: "Internal server error", message: error.message });
            });
    }
    catch (err) {
        res.status(400).json({ err })
    }
}

async function approveUserById(req, res) {

    try {
        const { id } = req.params;
        const updateMember = await User.findByIdAndUpdate(id, { role: 'thành viên' }, { new: true })

        console.log("update thành công")
        res.status(202).json({ updateMember})
    }
    catch (err) {
        res.status(400).json({ err })
    }
}

module.exports = { getAllUsers, getApprovedUsers, getAwaitApprovedUsers, deleteUserById ,approveUserById};
