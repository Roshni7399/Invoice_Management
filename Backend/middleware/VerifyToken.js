
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    let jwtSecretKey = "smartData";
    if (!token){
         return res.send({
            status : "200",
            message : "null",
        })
    }
    const decode = jwt.verify(token, jwtSecretKey);

    req.user = decode;
    next();

  } catch (error) {
    return res.send({
        status : "400",
        message : "Failedd",
        result: error
        
        
    })
  }
};
