const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt')

exports.registerUser = catchAsyncError(async(req,res,next) => {
    const {name, email, password} = req.body;
    const user = await User.create({
        name,
        email,
        password
    })
    sendToken(user,201, res)    
})


exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return next(new ErrorHandler("Please enter email & password", 400));
    }
    //finding the user database
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    if (!(await user.isValidPassword(password))) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendToken(user, 201, res);
  });

  // Logout - /api/v1/logout
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Loggedout",
    });
  });