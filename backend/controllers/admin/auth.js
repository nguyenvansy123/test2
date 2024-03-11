const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(async (user) => {
            if (user) {
                return res.status(406).json({ message: "Admin already registerd" })
            }

            const {
                username,
                email,
                password,
            } = req.body
            console.log(req.body,'admin/auth-18');
            const hash_password = await bcrypt.hash(password, 10);

            const _user = new User({
                username,
                email,
                hash_password,
                // username: shortid.generate(),
                role: "quản trị viên"
            });
            _user.save().then((data) => {
                if (data) {
                    return res.status(201).json({ message: "Admin created successfully...!" })
                }
            }).catch((err) => {
                if (err) {
                    return res.status(404).json({ message: "something went wrong" })
                }
            })
        }).catch((err) => {
            console.log(err)
        });
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user == null) {
                return res.status(404).json({ message: "Invalid email" })
            }

            if (user) {
                const isPassword = user.authenticate(req.body.password);
                // if (isPassword && user.role === "admin") {
                if (isPassword) {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
                    const { _id, email, role, fullname } = user;
                    res.cookie("token", token, { expiresIn: "1d" });
                    res.status(200).json({
                        token,
                        user: { _id, email, role, fullname }
                    })
                    console.log(token,'admin/auth-60')
                }
                else {
                    return res.status(400).json({
                        message: "Invalid password"
                    })
                }

            }
            else {
                return res.status(404).json({ message: "something went wrong" })
            }

        }).catch((err) => {
            console.log(err)
        });
}

exports.signout = (req, res) => {

    res.clearCookie("token");
    res.status(200).json({
        message: "Signout successfully....!!"
    })
}