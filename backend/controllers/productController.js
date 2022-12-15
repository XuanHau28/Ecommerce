const Product = require('../models/productModel')
const ErrorHander = require('../utils/errorHander')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require("../utils/apifeatures");




//Create Product --Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;
    
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product,
    });
});


// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
  
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();
  
    let products = await apiFeature.query;
  
    let filteredProductsCount = products.length;
  
    apiFeature.pagination(resultPerPage);
  
    products = await apiFeature.query;
  
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  });

//Get Product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  });
//Update Product --Admin
exports.updateProduct = catchAsyncErrors ( async (req, res, next) => {
    
    let product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHander("Product not found", 404));
}

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify:false
    });

    res.status(202).json({
        success: true,
        product
    });
});

//Delete Product --Admin
exports.deleteProduct = catchAsyncErrors ( async(req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHander("Product not found", 404));
}

    await product.remove();

    res.status(202).json({
        success: true,
        message: "Product Delete Successfully"
    });

});

//Create New Review or Update the Review
exports.createProductReview = catchAsyncErrors (async (req, res, next) => {
    
    const {rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const product = await Product.findById(productId);

    const isReviewed = await product.reviews.find((rev) => rev.user.toString()===req.user._id.toString());

    if(isReviewed) {
        product.reviews.forEach((rev) =>  {
            if (rev.user.toString() === req.user._id.toString())
            (rev.rating = rating), (rev.comment = comment) 
        });
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;
    product.ratings = product.reviews.forEach(rev => {
        avg = avg + rev.rating
    }) / product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(202).json({
        success: true,
    });
});

//Get All Reviews of Product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if(!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

//Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if(!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    const reviews = product.reviews.filter(rev => rev.id.toString() !==  req.query.id.toString());

    let avg = 0;

   reviews.forEach(rev => {
        avg += rev.rating;
   });

   const ratings = avg / reviews.length;

   const numOfReviews = reviews.length;

   await Product.findByIdAndUpdate(
    req.query.productId,
    {
        reviews,
        ratings,
        numOfReviews
   },

   {
    new: true,
    runValidators: true,
    useFindAndModify: false
   }
);

    res.status(202).json({
        success: true,
    });
});