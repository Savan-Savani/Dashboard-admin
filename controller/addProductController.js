const ProductModel = require("../model/product.model")


exports.imgUploder = (req, res, next) => {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    // var response = '<a href="/">Home</a><br>'
    // response += "Files uploaded successfully.<br>"
    // response += `<img src="${req.file.path}" /><br>`
    // return res.send(response)
    if (req.file) {
        const pathName = req.file.path;
        res.send({ path: pathName })
    }
}

exports.addProductController = async (req, res) => {
    let imgURL = null
    if (req.file) {
        imgURL = `uploads/${req.file.filename}`
    }
    var { name, price, detail, status } = req.body
    ProductModel.findOne({ name: name }).then(async (result) => {
        if (result) {
            if (name == result.name) {
                res.send({ success: false, message: "product already exists" })
            }
        } else {
            const data = await ProductModel.find({}).sort({ _id: -1 }).limit(1)
            var temp = 0
            if (data.length == 0) {
                temp = temp + 1
            } else {
                temp = data[0].productId + 1
            }
            ProductModel.create({
                productId: temp,
                name: name, price: price, detail: detail, image: imgURL, status: status
            }).then((result) => {
                res.send({ success: true, data: result })
            }).catch((error) => {
                res.send({ success: false, message: error.message })
            })
        }
    })
}


exports.checkProductAvailable = (req, res, next) => {
    var { name } = req.body
    ProductModel.findOne({ name: name }).then((result) => {
        if (result) {
            return next({
                'type': 'error',
                'httpCode': 400,
                'message': {
                    'errCode': 'e402',
                    'text': 'Not name specified'
                }
            });
        } else {
        }
    }).catch((error) => {
        res.send({ success: false, message: error.message })
    })
}
exports.getProductController = (req, res) => {


    ProductModel.find().then((result) => {
        res.send({ success: true, data: result })
    }).catch((error) => {
        res.send({ success: false, message: error.message })
    })


}
exports.putProductController = (req, res) => {
    var { name, price, detail, _id, status } = req.body
    ProductModel.findOne({ _id: { $ne: _id }, name: name }).then((result) => {
        if (result) {
            res.send({ success: false, message: "This name is already exist" })
        } else {
            if (req.file) {
                ProductModel.findOneAndUpdate({ _id: _id }, { name: name, price: price, detail: detail, image: `uploads/${req.file.filename}`, status: status }).then((result) => {
                    if (result == null) {
                        res.send({ success: false, message: "this product not available" })
                    } else {
                        res.send({ success: true, message: "Product updated " })
                    }
                }).catch((error) => {
                    res.send({ success: false, message: "process failed,Try again" })
                })
            } else {
                ProductModel.findOneAndUpdate({ _id: _id }, { name: name, price: price, detail: detail, status: status }).then((result) => {
                    if (result == null) {
                        res.send({ success: false, message: "this product not available" })
                    } else {
                        res.send({ success: true, message: "Product updated " })
                    }
                }).catch((error) => {
                    res.send({ success: false, message: "process failed,Try again" })
                })
            }
        }
    }).catch((err) => {
        res.send({ success: false, message: "process failed,Try again" })
    });
}
exports.deleteProductController = (req, res) => {
    var { name, price, detail, image, _id } = req.body


    ProductModel.findOneAndDelete({ _id: _id }).then((result) => {
        if (result == null) {
            res.send({ success: false, message: "this product not available" })
        } else {

            res.send({ success: true, message: "Product deleted " })
        }
    }).catch((error) => {
        res.send({ success: false, message: "process failed,Try again" })
    })


}