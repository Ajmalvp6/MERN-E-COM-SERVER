const product = require("../models/productsModel");




// add product

exports.addproduct = async (req, res) => {
  let products = await product.find();

  let id;

  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  try {
    const { name, image, category, new_price, old_price } = req.body;

    console.log(req.body);

    const newProduct = new product({
      name,
      image,
      category,
      new_price,
      old_price,
      id,
    });

    await newProduct.save();

    return res.json({
      success: true,
      message: "product added successfully",
      name: req.body.name,
    });
  } catch (error) {
    res.status(404).json({ error, message: "add product api failed" });
  }
};


// remove product 


exports.removeProduct = async (req, res) => {
    const { id } = req.body;  

    try {
        const delProd = await product.findOneAndDelete({id});  

        if (delProd) {
            res.status(200).json({success:true, message: "Product deleted successfully",name:delProd.name });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};



// get all products


exports.allProducts=async (req,res)=>{

 try{const Products = await product.find()

 res.status(200).json({message:'get all products successfully',success:true,Products})
  }
  catch(error){
    res.status(404).json({message:`all product api failed ${error}`})
  }


}




