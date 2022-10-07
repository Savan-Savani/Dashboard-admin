import react, { useState, useEffect } from "react"

import { Form, Input, Button, Checkbox } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Forget = () => {
    const [form] = Form.useForm();
    let navigate = useNavigate();

    const loginForm = () => {
        navigate({ pathname: '/login' })
    }
    const onResetPage = async (values) => {

        axios.post("/auth/forget", { email: values.emailSignup }).then((res) => {
            if (res.success) {
                alert("check your email")
            } else {
                toast.warn(res.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })

    }

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="illustration-wrapper">
                    <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login" />
                </div>
                <Form
                    id="login-form"
                    name="login-form"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={onResetPage}
                >
                    <p className="form-title" style={{ textAlign: "left", marginBottom: "2%" }}>Forgot Password</p>
                    <p style={{ textAlign: "left", fontSize: "15px " }}>Fill the form to reset your password. </p>
                    <Form.Item
                        name="emailSignup"
                        rules={[{ required: true, message: 'Please input valid Email!', type: 'email' }]}
                    >
                        <Input
                            placeholder="Email Id" style={{ padding: "12px 15px" }}
                        />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: "0" }}>
                        <Button type="primary" htmlType="submit" className="login-form-button" >
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <p className="ant-form" style={{ textAlign: "center" }}><Button type="link" onClick={loginForm}>Return to LogIn ?</Button></p>
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}

export default Forget