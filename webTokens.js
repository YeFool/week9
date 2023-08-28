const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateAndSign = () => {
    const userId = 123
    const admin = true

    const token = jwt.sign({id: userId, isAdmin: admin}, process.env.SECRET)
    console.log(token)
}


generateAndSign()

let generatedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTI2OTkyNDR9.iYaMBEzjy9cPYum-OCp68SkQVlnDqS512KQ2wQ-HfO4"
let otherToken = "Random"

const verifyToken = () => {
    try {
        const decodedToken = jwt.verify(generatedToken, process.env.SECRET)
        console.log(decodedToken)
        console.log("verified")
    } catch {
        console.log("unsuccessful")
    }
}

verifyToken()