const users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const product = require("../models/productsModel");

// register

exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already registered with this email please login",
      });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await new users({
      email,
      password: hashedpassword,
      name,
      cartData: cart,
    });

    await user.save();

    res
      .status(201)
      .json({ success: true, message: "user register successfully" });
  } catch (error) {
    res.status(404).json({ message: "register api failed" });
  }
};

// user login

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found or invalid email" });
    }

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      return res
        .status(404)
        .json({ success: false, message: "incorrect password" });
    } else {
      const token = jwt.sign(
        {
          user: {
            userId: user._id,
          },
        },
        process.env.JWTKEY
      );

      return res
        .status(200)
        .json({ success: true, message: "login success", token,user });
    }
  } catch (error) {
    res.status(404).json({ message: "login api failed" });
  }
};

// new collection

exports.newCollection = async (req, res) => {
  let products = await product.find({});

  let newCollection = products.slice(1).slice(-8);

  res
    .status(200)
    .json({ message: "New collection feched successfully", newCollection });
};

// popular in women

exports.popularinWomen = async (req, res) => {
  let products = await product.find({ category: "women" });

  let popular_in_women = products.slice(0, 4);

  res
    .status(200)
    .json({ message: "popular in women feched successfuly", popular_in_women });
};

// add to cart

exports.addtoCart = async (req, res) => {
  try {
    const userId = req.payload;
    const itemId = req.body.itemId;

    // Find the user
    const userData = await users.findOne({ _id: userId });
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Initialize item if it doesn't exist in the cart
   
 if (!userData.cartData[itemId]) {
      userData.cartData[itemId] = 0;
    }
    // Increment the item count
    userData.cartData[itemId] += 1;

    // Update the user's cart in the database
    const result = await users.findOneAndUpdate(
      { _id: userId },
      { cartData: userData.cartData },
      { new: true }
    );

    // Respond with the updated cart
    res.status(200).json({ message: 'success', result: result.cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// remove product from cart 


exports.removeFromCart = async (req, res) => {
  const userId = req.payload;
  const itemId = req.body.itemId;

  try{const userData = await users.findOne({ _id: userId });

  if (!userData) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (userData.cartData[itemId] > 0) {
    userData.cartData[itemId] -= 1;

    await users.findByIdAndUpdate(
      userId, // Corrected argument
      { cartData: userData.cartData } 
    );

    res.json({ message: "product removed" }); 
  }

  else{
    return res.status(400).json({ message: "Item not in cart or quantity is already zero" });
  }
  
}

catch(error){
  res.json(404).json({message:"removeFromCart Api failed"})
}
  
};



// getcartproducts Api

exports.getCartProducts=async(req,res)=>{

  const userId = req.payload 

  

  const userData = await users.findOne({_id:userId})

  if(!userData){
    return res.status(404).json({message:"user not found or not an valid user"})
  }

  res.json(userData.cartData)

}
