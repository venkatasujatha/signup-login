const { dataSource } = require("../database");
const bcrypt = require("bcryptjs");
const studentRepo = dataSource.getRepository("student");
//const student = require("../entity/student");
const signUp = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = encryptedPassword;
    console.log("password::   " + encryptedPassword);
    const { userName } = req.body.userName;
  
    if(!(req.body.userName && req.body.password && req.body.firstName && req.body.lastName && req.body.phoneNumber && req.body.gender && req.body.DOB))
    {
        return res.status(400).json({ message: "please provide the valid details" });
    }
    else{

        const resp = await studentRepo.save(req.body);

        res.status(200).json({
            status: "success",
            response: resp,
            message: "account created successfully",
          });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      status: "failure",
      response: null,
      message: "already exists,please provide the valid details ",
    });
  }
};
const login = async (req, res) => {
  try {
    const resp = await studentRepo.findOne({
      where: { userName: req.body.userName },
    });
    console.log("user", resp);
    if (!resp) {
      console.log("Invalid user name");
      res.status(400).json({
        status: "failure",
        message: "invalid userName",
      });
    } else {
      const encryptedPassword = await bcrypt.compare(
        req.body.password,
        resp.password
      );
      console.log("password", encryptedPassword);

      if (encryptedPassword) {
        console.log("student  signin");
        res.status(200).json({
          status: "success",
          message: "logged in successfull",
        });
      } else {
        res.status(400).json({
          status: "failure",
          message:
            "invalid userName or password, please provide the valid password",
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { signUp, login };
