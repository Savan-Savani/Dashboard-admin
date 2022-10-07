const Credentials = require("../model/model")
const bcrypt = require("bcrypt");




exports.addEmployeeController = async (req, res) => {
    var { username, email, password, type, status, phoneNumber } = req.body
    username = username.toLowerCase()
    email = email.toLowerCase()
    password = await bcrypt.hash(password, 10);

    Credentials.findOne({ $or: [{ userName: username }, { email: email }] }).then(async (result) => {
        if (result) {
            if (username == result.userName) {
                res.send({ success: false, message: "username already exists" })

            } else if (email == result.email) {
                res.send({ success: false, message: "email already exists" })
            }
        } else {
            const data = await Credentials.find({}).sort({ _id: -1 }).limit(1)
            var temp = 0
            if (data.length == 0) {
                temp = temp + 1
            } else {
                temp = data[0].employeeId + 1
            }
            Credentials.create({
                employeeId: temp,
                userName: username, passWord: password, email: email, status: status, type: type, startDate: new Date(),phoneNumber:phoneNumber
            }).then((result) => {
                res.send({ success: true, data: result })
            }).catch((error) => {
                res.send({ success: false, message: error.message })
            })

        }
    })



}
exports.getEmployeeController = (req, res) => {
    Credentials.find({}).then((result) => {
        if (result.length == 0) {
            res.send({ success: false, message: "no employee available , create new one" })
        } else {
            res.send({ success: true, data: result })
        }
    }).catch((error) => {
        res.send({ success: false, message: error.message })
    })
}

exports.updateEmployeeController =async (req, res) => {
    var { passWord, type, status, _id,phoneNumber } = req.body
    Credentials.findOneAndUpdate({ _id: _id }, { status: status, type: type,phoneNumber:phoneNumber }).then((result) => {
        if (result == null) {
            res.send({ success: false, message: "this employee not available" })
        } else {
            res.send({ success: true, message: "employee updated" })
        }
    }).catch((error) => {
        res.send({ success: false, message: "process failed,Try again" })
    })
}

exports.deleteEmployeeController = (req, res) => {
    var { _id } = req.body
    Credentials.findOneAndDelete({ _id: _id }).then((result) => {
        if (result == null) {
            res.send({ success: false, message: "this employee not available" })
        } else {

            res.send({ success: true, message: "employee deleted " })
        }
    }).catch((error) => {
        res.send({ success: false, message: "process failed,Try again" })
    })

}

exports.changeEmployeePassword =async(req, res) => {
    var { _id,password } = req.body
    password = await bcrypt.hash(password, 10);
    Credentials.findOneAndUpdate({ _id: _id },{passWord:password}).then((result) => {
        if (result == null) {
            res.send({ success: false, message: "this employee not available" })
        } else {
            res.send({ success: true, message: "Password updated successfully" })
        }
    }).catch((error) => {
        res.send({ success: false, message: "process failed,Try again" })
    })

}