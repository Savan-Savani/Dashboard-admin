const ProductionModel = require("../model/production.model");

exports.addProductionController = (req, res) => {
  var { employee, product, weight,date } = req.body;

  ProductionModel.create({
    employee: employee,
    product: product,
    weight: weight,
    date: date,
    status: true,
  })
    .then((result) => {
      res.send({ success: true, data: result });
    })
    .catch((error) => {
      res.send({ success: false, message: error.message });
    });
};

exports.getProductionController = (req, res) => {
  if (req.query.id !== "all") {
    ProductionModel.find({ employee: req.query.id })
      .populate("employee")
      .populate("product")
      .then((result) => {
        let count = 0
        result = result.filter(
            (e) => {
                if(e.date.getMonth() + 1 === Number(req.query.month) && e.date.getFullYear() === Number(req.query.year)){
                  count = count + Number(e.weight);
                    return true 
                }else{
                    return false
                }
              }
          );
        if (!result) {
          res.send({
            success: false,
            message: "no employee available , create new one",
          });
        } else {
          res.send({ success: true, data: result,count: count });
        }
      })
      .catch((error) => {
        res.send({ success: false, message: error.message });
      });
  } else {
    ProductionModel.find({})
      .populate("employee")
      .populate("product")
      .then((result) => {
        let count = 0
        result = result.filter(
          (e) => {
              if(e.date.getMonth() + 1 === Number(req.query.month) && e.date.getFullYear() === Number(req.query.year)){
                count = count + Number(e.weight);
                  return true 
              }else{
                  return false
              }
            }
        );
        if (result.length == 0) {
          res.send({
            success: false,
            message: "no employee available , create new one",
          });
        } else {
          res.send({ success: true, data: result,count: count });
        }
      })
      .catch((error) => {
        res.send({ success: false, message: error.message });
      });
  }
  // }
};
exports.deleteProductionController = (req, res) => {
  var { _id } = req.body;
  ProductionModel.findOneAndDelete({ _id: _id })
    .then((result) => {
      if (result == null) {
        res.send({ success: false, message: "this employee is not available" });
      } else {
        res.send({ success: true, message: "employee deleted " });
      }
    })
    .catch((error) => {
      res.send({ success: false, message: "process failed,Try again" });
    });
};
exports.updateProductionController = (req, res) => {
  var { weight, _id, status } = req.body;

  ProductionModel.findOneAndUpdate(
    { _id: _id },
    { weight: weight, status: status }
  )
    .then((result) => {
      if (result == null) {
        res.send({ success: false, message: "this employee not available" });
      } else {
        res.send({ success: true, message: "weight updated " });
      }
    })
    .catch((error) => {
      res.send({ success: false, message: "process failed,Try again" });
    });
};
