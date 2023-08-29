const {Router} = require("express");
const userRouter = Router();


const {registerUser, getAllUsers, deleteUser, updateUser, userLogin} = require("./controllers");
const { hashPass, comparePass, tokenCheck } = require("../middleware");



userRouter.post("/users/registerUser", hashPass, registerUser);
userRouter.get("/users/getAllUsers", tokenCheck, getAllUsers); //protected route
userRouter.put("/users/updateUser", updateUser);
userRouter.delete("/users/deleteUser", deleteUser);
userRouter.post("/users/userLogin", comparePass, userLogin);

userRouter.get("/users/authCheck", tokenCheck, userLogin)


module.exports = userRouter;