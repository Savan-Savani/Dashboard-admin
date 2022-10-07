const express = require('express');
const router = express.Router();
var multer = require('multer')


const product = require("../controller/addProductController")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
var upload = multer({ storage: storage })

router.post("/addProduct", upload.single("img"), product.addProductController)
router.get("/getProduct", product.getProductController)
router.post("/updateProduct", upload.single("img"), product.putProductController)
router.delete("/deleteProduct", product.deleteProductController)
router.post('/upload', upload.single("img"), product.imgUploder)




module.exports = router;
