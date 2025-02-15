import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req, res) {
  const newUserData = req.body;

  newUserData.password = bcrypt.hashSync(newUserData.password, 10);

  const user = new User(newUserData);

  user.save()
    .then(() => {
      res.json({
        message: "User Created"
      });
    })
    .catch(() => {
      res.json({
        message: "User not created"
      });
    });
}

export function loginUser(req, res) {
  User.find({ email: req.body.email })
    .then((users) => {
      if (users.length === 0) {
        res.json({
          message: "User not found"
        });
      } else {
        const user = users[0];

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (isPasswordCorrect) {
          const token = jwt.sign({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isBlocked: user.isBlocked,
            type: user.type,
            profilePicture: user.profilePicture
          }, "cbc-secret-key-7973");

          res.json({
            message: "User Login",
            token: token
          });
        } else {
          res.json({
            message: "Invalid Password"
          });
        }
      }
    })
    .catch(() => {
      res.json({
        message: "Error finding user"
      });
    });
}

export function deleteUser(req,res) {
  User.deleteOne({email:req.body.email}).then(()=>{
    res.json({
      message :  "user deleted "
    })
  })
}