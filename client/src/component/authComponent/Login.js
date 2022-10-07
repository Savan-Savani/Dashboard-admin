import react, { useState, useEffect } from "react"
import "./css/login.css"
import { Form, Input, Button, Checkbox } from 'antd';
import "antd/dist/antd.css";
import axios from "axios"
import Welcome from "./Welcome";
import {useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forget from "./Forget"
import img from "../../image/front.jpeg"



const Login = () => {
    let navigate = useNavigate();
    const [form] = Form.useForm();

    const [isLogin, setisLogin] = useState(true)

    useEffect(() => {
        if (readCookie("isRemember") !== null) {
            form.setFieldsValue({
                usernameLogin: atob(`${readCookie("userName")}`),
                passwordLogin: atob(`${readCookie("password")}`),
                remember: Boolean(`${readCookie("isRemember")}`),
            });
        }
    }, [])

    const deleteAllCookies = () => {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    };

    const readCookie = (name) => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };


    const onFinishSignup = async (values) => {
        await axios.post(`/auth/signup`, { userName: values.usernameSignup, passWord: values.passwordSignup, email: values.emailSignup }).then((res) => {
            if (res.data.success) {
                form.resetFields();
                signupForm();
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
    };

    const onFinishLogin = async (values) => {
        await axios.post("/auth/login", { userName: values.usernameLogin, passWord: values.passwordLogin, email: values.emailSignup }).then((res) => {

            if (res.data.success) {
                if (values.remember) {
                    document.cookie = `userName = ${btoa(values.usernameLogin)}`;
                    document.cookie = `password = ${btoa(values.passwordLogin)}`;
                    document.cookie = `isRemember = ${values.remember}`;
                } else {
                    deleteAllCookies();
                }
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("type", res.data.userData.type);
                localStorage.setItem("user", res.data.userData._id);
                navigate({ pathname: '/dashboard/dashboard' })
                form.resetFields();
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
        }).catch((error) => {
            { console.log({ success: false, message: error.message }) }
        })
    }

    const loginForm = () => {
        setisLogin(false)
    }
    const signupForm = () => {
        setisLogin(true)
    }
    const forgetForm = () => {
        navigate({ pathname: '/forget' })
    }

    return (
        <>{isLogin ?
            <div className="login-page">
                <div className="login-box">
                    <div className="illustration-wrapper">
                        <img src={img} alt="Login" />
                    </div>
                    <Form
                        id="login-form"
                        name="login-form"
                        form={form}
                        initialValues={{ remember: true }}
                        onFinish={onFinishLogin}
                    >
                        <p className="form-title">Manaki Ent.</p>
                        <p>Login to your account</p>
                        <Form.Item
                            name="usernameLogin"
                            type="reset"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input
                                placeholder="Username" style={{ padding: "12px 15px" }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="passwordLogin"
                            type="reset"
                            rules={[{ required: true, message: 'Please input minimum 8 character password!', min: 8 }]}
                        >
                            <Input.Password
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item style={{ marginBottom: "0" }}>
                            <Button type="primary" htmlType="submit" className="login-form-button" >
                                LOGIN
                            </Button>
                        </Form.Item>
                        {/* <Form.Item style={{ marginBottom: "0" }}>
                            <p style={{ textAlign: "right" }}><Button type="link" onClick={forgetForm}>Forget Password?</Button></p>
                        </Form.Item> */}

                        {/* <Form.Item>
                            <p className="ant-form" style={{ textAlign: "center" }}>Don't have an account yet?<Button type="link" onClick={loginForm}>SignUp</Button></p>
                        </Form.Item> */}
                    </Form>
                </div>

            </div>
            :
            <div className="login-page">
                <div className="login-box">
                    <div className="illustration-wrapper">
                        <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login" />
                    </div>
                    <Form
                        id="login-form"
                        name="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinishSignup}
                    >
                        <p className="form-title">Sign Up</p>
                        <p></p>
                        <Form.Item
                            name="usernameSignup"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input
                                placeholder="Username" style={{ padding: "12px 15px" }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="emailSignup"
                            rules={[{ required: true, message: 'Please input valid Email!', type: 'email' }]}
                        >
                            <Input
                                placeholder="Email Id" style={{ padding: "12px 15px" }}
                            />
                        </Form.Item>

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

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" >
                                SIGNUP
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <p className="ant-form" style={{ textAlign: "center" }}>Already have an account yet?<Button type="link" onClick={signupForm}>LogIn</Button></p>
                        </Form.Item>
                    </Form>
                </div>
            </div>}
        </>
    )
}

export default Login