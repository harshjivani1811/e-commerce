const multer = require("multer");
const Product = require("../models/Product");
const { v4 : uuidv4} = require("uuid")

// Multer configuration
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
 
    cb(null, "./uploads/products");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + file.originalname.replace(/ /g, ""));
    },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/svg" ||
    file.mimetype === "image/svg+xml"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid Mime Type, only JPG, JPEG, PNG and SVG allowed"),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

exports.uploadImage = async (req, res) => {
  try {
    upload.single("productImg")(req, res, (err) => {
      console.log(req.file);
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Invalid File Type, only PDF, JPG, DOC and JPEG allowed",
          success: false,
        });
      }
      if (req["file"]["path"] !== undefined) {
        // console.log(req.file);
        // next();
        return res.status(200).json({
          path: req.file.path,
          success: true,
        });
      } else {
        return res.status(400).json({
          Error: "Upload Failed. Try Again.",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, category, stock, photo } = req.body;

  if (!name || !description || !price || !category || !stock || !photo) {
    return res.status(400).json({
      success: false,
      error: "Please include all fields",
    });
  }
  const productData = new Product(req.body);

  const product = await productData
    .save()
    .then((data) => {
      if (data) {
        return res.status(200).json({
          success: true,
          msg: "Product successfully created",
          data,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        success: false,
        error: "Product not created",
      });
    });
};

exports.getProduct = (req, res) => {
  try {
    const { _id } = req.body;
    Product.findOne({ _id }, (err, product) => {
      if (err) {
        return res.status(400).json({
          success: false,
          err: "No product found...",
        });
      }

      if (!product) {
        return res.status(400).json({
          success: false,
          err: "No product found...",
        });
      }

      return res.status(200).json({
        success: true,
        data: product,
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      err: "No product found...",
    });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const product = await Product.find({});
    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      err: "No product found...",
    });
  }
};

exports.updateProduct = async (req, res) => {
  User.findOne({ _id: req.body._id }, async (err, user) => {
    if (err) {
      return res.status(400).json({
        success: false,
        err: "No user found...",
      });
    }

    if (req.body.name) {
      product.name = req.body.name;
    }
    if (req.body.description) {
      product.description = req.body.description;
    }
    if (req.body.price) {
      product.price = req.body.price;
    }
    if (req.body.category) {
      product.category = req.body.category;
    }
    if(req.body.stock){
      product.stock = req.body.stock;
    }
    if(req.body.photo){
      product.photo = req.body.photo;
    }
    if(req.body.sold){
      product.sold = req.body.sold;
    }

    const updatedData = await User.findOneAndUpdate(
      { _id: req.body._id },
      product,
      (err, product) => {
        if (err) {
          return res.status(400).json({
            success: false,
            err: "No product found...",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Product data successfully updated",
        });
      }
    );
  });
};

exports.deleteProduct = async (req, res) => {
  try {
    const { _id } = req.body;
    await Product.findOneAndDelete({ _id }).then((product, err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: "Product not deleted",
        });
      }
      if (!product) {
        return res.status(400).json({
          success: false,
          error: "No product found for this id.",
        });
      }
      return res.status(200).json({
        success: true,
        msg: "Product deleted successfully!",
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "Product not deleted",
    });
  }
};