import Admin from "../model/Admin";

// Check Email
export const checkEmail = async (req, res, next) => {
  const email = req.body.email;
  console.log(req.headers);
  const check = await Admin.findOne({ email });

  if (!checkEmail) {
    next();
  } else {
    res.send({
      status: "400",
      message: "Already registered",
    });
  }
};

// Check Token
export const checkToken = async (req, res, next) => {
  const token = req.headers.Authorization;

  const checktoken = await Admin.find();
  if (!token) {
    return res.send({
      status: false,
      message: "not Success",
      code: 200,
    });
  } else {
    next();
  }
};
