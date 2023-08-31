const User = require("./model")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
    console.log("next called")
    try {
        const user = await User.create(req.body);
        

        res.status(201).json ({
            message: "Successfully Registered",
            user: {username: req.body.username, email: req.body.email}
        });
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
    }
};

    const userLogin = async (req, res) => {
        try{
            if (req.authUser) {
                res.status(200).json({message: "Successful", user:{
                    username: req.authUser.username || null,
                    email: req.authUser.email || null,
                    // password: req.authUser.password
                }})
                return
            }

            const token = jwt.sign({id: req.user.id}, process.env.SECRET)
            res.status(200).json ({
                message: "success",
                user: {
                    username: req.body.username,
                    email: req.body.email,
                    token: token
                }
            })
        } catch {
            res.status(501).json({errorMessage: error.message, error: error});
        }

    }


const getAllUsers = async (req, res) => {
    try {
       const getUser = await User.findAll();
        res.status(200).json({message: "Successfully Retrieved", users: getUser});

    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
    }
};


const  deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.destroy({
            where: {
                username: req.body.username || null
           }
        })
        res.status(201).json({
            message: "Successfully deleted",
             amount: deletedUser
            })
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error})
        console.log(error)
    }
}


const updateUser = async (req, res) => {
    try {
        const userUpdate = await User.update(
            {
                password: req.body.password,
                email: req.body.email
            },
            {
                where: {
                    username: req.body.username
                }
            }
        );
        res.status(201).json({ message: "Success", updateResult: userUpdate });
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
};








module.exports = {
    registerUser,
    getAllUsers,
    deleteUser,
    updateUser,
    userLogin
};