const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    // Destructure the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    // Create a new product
    let product = new Product(fields);

    // Handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // Save the product to the DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Saving product in DB failed",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined; // This is just for performance optimization, YOU CAN REMOVE THIS IF YOU WANT!
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};



exports.deleteProduct = (req, res) => {
  const product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Cannot delete product",
      });
    }
    res.json({
      message: "Product deleted successfully",
      deletedProduct,
    });
  });
};



exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }
    // Updation code
    let product = req.product;
    product = _.extend(product, fields);

    // Handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }



//save to DB
product.save((err,product)=> {
            if(err){
            return res.status(400).json({
                error : "updation of product in DB failed"
            })
        }
        res.json(product)
        })
    });

};



//product listing
exports.getAllProducts = (req,res) => {
    let limit =req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy=req.query.sortBy ? req.query.sortBy : "_id";
        
    Product.find().select("-photo").limit(limit).populate("category").sort([[sortBy,"asc"]]).exec((err,products) => {
        if(err) {
            return res.status(400).json({
                error : "No product found"
            })
        }
        res.json(products)
    })
}  




exports.getAllUniqueCategories =(req,res) =>  {
    Product.distinct("category", {}, (err,category) => {
        if(err) {
            return res.status(400).json({
                error : "No category"
            })
        }
        res.json(categories);
    })

}



exports.updateStock = (req,res,next) => {

    let myOperations = req.bdy.order.products.map(prod => {
        return {
            updateOne : {
                filter : {_id : prod._id},
                update : {$inc: {stock : -prod.count ,sold : +prod.count}}
            }
        }
    })
    Product.bulkWrite(myOperations, {}, (err,products) => {
        if(err) {
            return res.status(400).json({
                error : "BULK operations failed"
            })
        }
        next();
    })
} 