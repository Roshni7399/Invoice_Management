import customer from "../model/Admin";

// Check Email
export const checkEmail = async (req, res, next) => {
  const email = req.body.email;
  //   console.log(req.headers);
  const check = await customer.findOne({ email });

  if (!checkEmail) {
    next();
  } else {
    res.send({
      status: "400",
      message: "Email Already Registered",
    });
  }
};
