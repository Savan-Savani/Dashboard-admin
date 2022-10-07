import react, { useState, useEffect } from "react"

import { Form, Input, Button, Checkbox } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";




const Reset = () => {
    let navigate = useNavigate();
    let token = useParams();
    const headers = {
        'Content-Type': 'application/json',
        'token': token.token
    }
    
    const resetForm = async (values) => {
        await axios.post("/auth/reset", { passWord: values.passwordSignup }, {
            headers: headers
        }).then((res) => {
            if (res.data.success) {
                toast.warn(res.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate({ pathname: '/' })
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
                    initialValues={{ remember: true }}
                    onFinish={resetForm}
                >
                    <p className="form-title" style={{ textAlign: "left", marginBottom: "2%", fontSize: "35px " }}>Create new password</p>
                    <p style={{ textAlign: "left", fontSize: "15px " }}>Your new password must be diffrent from <br />previous used password.</p>

                    <Form.Item
                        name="passwordSignup"
                        rules={[{ required: true, message: 'Please input minimum 8 character password!', min: 8 }]}
                        hasFeedback
                    >
                        <Input.Password
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="consfirmPasswordSignup"
                        dependencies={['passwordSignup']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('passwordSignup') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Confirm Password"
                        />
                    </Form.Item>
                    {/* <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item> */}
                    <Form.Item style={{ marginBottom: "0" }}>
                        <Button type="primary" htmlType="submit" className="login-form-button" >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    )
}

export default Reset