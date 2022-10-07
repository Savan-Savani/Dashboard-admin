const BillingModel = require('../model/billingModel')


exports.addBillingController = (req, res) => {


    var { companyname, address, gstnumber, mobilenumber, data, item, ppu, units, total, date, gst, invoiceNumber } = req.body
    {
        var total = 0
        data.map((key, i) => {
            total = total + (Number(key.ppu) * Number(key.units))
        })
    }

    var gstcount = total * (gst / 100)

    var grandtotal = total + Math.trunc(gstcount);

    BillingModel.create({
        companyname: companyname,
        address: address, gstnumber: gstnumber, mobilenumber: mobilenumber, data: data, total: total, gst: Math.trunc(gstcount), grandtotal: grandtotal, date: date, gstPercentage: gst, invoiceNumber: invoiceNumber
    }).then((result) => {
        res.send({ success: true, data: result })
    }).catch((error) => {
        res.send({ success: false, message: error.message })
    })
}

exports.getBillingController = (req, res) => {
    if (req.query.id !== "all") {
        if (req.query.month == 50 && req.query.year == 50) {
            BillingModel.find({ companyname: req.query.id }).then((result) => {
                let totalGst = 0
                let totalAmount = 0
                result = result.filter(
                    (e) => {
                        totalGst = totalGst + Number(e.gst);
                        totalAmount = totalAmount + Number(e.grandtotal)
                        return true
                    }
                )
                if (!result) {
                    res.send({
                        success: false,
                        message: "no customer available , create new one",
                    });
                } else {
                    res.send({ success: true, data: result, totalGst: totalGst, totalAmount: totalAmount });
                }
            }).catch((error) => {
                res.send({ success: false, message: error.message });
            });
        } else {



            BillingModel.find({ companyname: req.query.id }).then((result) => {
                let totalGst = 0
                let totalAmount = 0
                result = result.filter(
                    (e) => {
                        if (e.date.getMonth() + 1 === Number(req.query.month) && e.date.getFullYear() === Number(req.query.year)) {
                            totalGst = totalGst + Number(e.gst);
                            totalAmount = totalAmount + Number(e.grandtotal)
                            return true
                        } else {
                            return false
                        }
                    }
                );
                if (!result) {
                    res.send({
                        success: false,
                        message: "no customer available , create new one",
                    });
                } else {
                    res.send({ success: true, data: result, totalGst: totalGst, totalAmount: totalAmount });
                }
            })
                .catch((error) => {
                    res.send({ success: false, message: error.message });
                });
        }
    } else {
        if (req.query.month == 50 && req.query.year == 50) {
            BillingModel.find({}).then((result) => {
                let totalGst = 0
                let totalAmount = 0
                result = result.filter(
                    (e) => {
                        totalGst = totalGst + Number(e.gst);
                        totalAmount = totalAmount + Number(e.grandtotal)
                        return true
                    }
                )
                if (!result) {
                    res.send({
                        success: false,
                        message: "no customer available , create new one",
                    });
                } else {
                    res.send({ success: true, data: result, totalGst: totalGst, totalAmount: totalAmount });
                }
            }).catch((error) => {
                res.send({ success: false, message: error.message });
            });
        } else {



            BillingModel.find({}).then((result) => {
                let totalGst = 0
                let totalAmount = 0
                result = result.filter(
                    (e) => {
                        if (e.date.getMonth() + 1 === Number(req.query.month) && e.date.getFullYear() === Number(req.query.year)) {
                            totalGst = totalGst + Number(e.gst);
                            totalAmount = totalAmount + Number(e.grandtotal)
                            return true
                        } else {
                            return false
                        }
                    }
                ); if (result.length == 0) {
                    res.send({
                        success: false,
                        message: "no customer available , create new one",
                    });
                } else {
                    res.send({ success: true, data: result, totalGst: totalGst, totalAmount: totalAmount });
                }
            })
                .catch((error) => {
                    res.send({ success: false, message: error.message });
                });
        }
    }
};

exports.deleteBillingController = (req, res) => {
    BillingModel.findOneAndDelete({ _id: req.body.id }).then((result) => {
        if (result == null) {
            res.send({ success: false, message: "this bill not available" })
        } else {

            res.send({ success: true, message: "bill deleted " })
        }
    }).catch((error) => {
        res.send({ success: false, message: "process failed,Try again" })
    })
}