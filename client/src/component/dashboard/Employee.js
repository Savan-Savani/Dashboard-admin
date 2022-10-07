import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Select, Popconfirm, Divider } from "antd";
import { Modal, Button } from "antd";
import axios from "axios";

import { Form, Input } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";

const Employee = () => {
  const [form] = Form.useForm();
  const [changeForm] = Form.useForm();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [editable, setEditable] = useState(false);

  const [recordId, setRecordId] = useState();

  const [isDisable, setIsDisable] = useState(false);

  const [isType, setisType] = useState("employee");
  const [isstatus, setIsStatus] = useState("true");

  const showModal = () => {
    form.resetFields();
    setEditable(false);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const editModel = (record) => {
    setEditable(true);
    setIsDisable(true);
    setIsModalVisible(true);
    setRecordId(record._id);

    form.setFieldsValue({
      userName: record.userName,
      email: record.email,
      passWord: record.passWord,
      phoneNumber: record.phoneNumber,
      Status: record.status ? "true" : "false",
      type: record.type,
    });
  };

  useEffect(() => {
    axios.get("/employee/getemployee").then((res) => {
      var result = res.data.data;
      setNewData(result);
    });
  }, []);

  const [newData, setNewData] = useState([]);

  const deleteModel = (record) => {
    // setRecordId(record._id)
    axios
      .post(`/employee/updateemployee/`, { _id: record._id, status: false })
      .then((result) => {
        axios.get("/employee/getemployee").then((res) => {
          var result = res.data.data;
          setNewData(result);
        });
      });
  };

  const columns = [
    {
      title: "Employee Id",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Employee Name",
      dataIndex: "userName",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },

    {
      title: "User Type",
      dataIndex: "type",
      render: (text, record) => {
        return <div style={{ textTransform: "capitalize" }}>{text}</div>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => <div style={{ color: record.status ? "green" : "red" }} >{record.status ? "Active" : "Deactive"}</div>,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (text, record) => {
        return <div>{new Date(text).toLocaleDateString("en-JM")}</div>;
      },
    },
    {
      title: "Action",
      dataIndex: "",
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => editModel(record)} />
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => deleteModel(record)}
            okText="Delete"
          >
            <DeleteOutlined style={{ marginLeft: "10px" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onFinishSubmit = async (values) => {

    await axios
      .post(`/employee/addemployee`, {
        username: values.userName,
        email: values.email,
        password: values.passWord,
        type: values.type,
        status: values.Status === "true" ? true : false,
        phoneNumber: values.phoneNumber
      })
      .then((res) => {
        if (res.data.success) {
          form.resetFields();
          changeForm.resetFields();
          toast.success("emploee added", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          axios.get("/employee/getemployee").then((res) => {
            var result = res.data.data;
            setNewData(result);
          });
          setIsModalVisible(false);
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
      });
  };

  const HandlePassWordChange = async (values) => {
    await axios
      .post(`/employee/changeEmployeePassword`, {
        _id: recordId,
        password: values.password,
      })
      .then((res) => {
        if (res.data.success) {
          form.resetFields();
          changeForm.resetFields()
          toast.success("Password updated successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
        setIsModalVisible(false);
      });
    setEditable(false);
  };

  const onFinishEdit = async (values) => {
    await axios
      .post(`/employee/updateemployee/`, {
        _id: recordId,
        password: values.passWord,
        type: values.type,
        status: values.Status === "true" ? true : false,
        phoneNumber: values.phoneNumber
      })
      .then((res) => {
        if (res.data.success) {
          form.resetFields();

          toast.success("Data updated successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          // toast(res.data.message)
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
        axios.get("/employee/getemployee").then((res) => {
          var result = res.data.data;
          setNewData(result);
        });

        setIsModalVisible(false);
      });
    setEditable(false);
  };

  return (
    <div>
      <div>
        <div className="add_button">
          <Button type="primary" onClick={showModal}>
            Add Employee
          </Button>
        </div>
        <Modal
          title="Employee Details"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          maskClosable={false}
        >
          <div>
            <Form
              {...layout}
              name="nest-messages"
              form={form}
              onFinish={editable ? onFinishEdit : onFinishSubmit}
              validateMessages={validateMessages}
            >
              <Form.Item
                name="userName"
                label="Name"
                rules={[
                  {
                    message: "Please input valid Username!",
                    required: true,
                  },
                ]}
              >
                <Input disabled={editable ? isDisable : false} />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email Id"
                rules={[
                  {
                    required: true,
                    message: "Please input valid Email!",
                    type: "email",
                  },
                ]}
              >
                <Input disabled={editable ? isDisable : false} />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]{10}$/,
                    message: "Please input valid Phone Number!",
                  },
                ]}
              >
                <Input type="text" />
              </Form.Item>
              {editable ? null : (
                <Form.Item
                  name="passWord"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input minimum 8 character password!",
                      min: 8,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}

              <Form.Item
                name="type"
                label="Type:"
                initialValue={isType}
                // className="profileSelect_wrp"
                rules={[
                  {
                    message: "The input is not valid title!",
                  },
                  {
                    // required: true,
                    message: "Please provide your title!",
                  },
                ]}
              >
                <Select
                  getPopupContainer={(triggerNode) => triggerNode.parentElement}
                  className="profile_title"
                >
                  <Option value="employee">Employee</Option>
                  <Option value="admin">Admin</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Status"
                label="Status"
                initialValue={isstatus}
                rules={[
                  {
                    message: "The input is not valid Status!",
                  },
                  {
                    // required: true,
                    message: "Please provide your status!",
                  },
                ]}
              >
                <Select
                  disabled={editable ? false : true}
                  getPopupContainer={(triggerNode) => triggerNode.parentElement}
                  // onChange={handleChange}
                  className="profile_title"
                >
                  <Option value="true">Active</Option>
                  <Option value="false">Deactive</Option>
                </Select>
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                {editable ? (
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                ) : (
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                )}
              </Form.Item>
            </Form>
            {editable ? (
              <>
                <Divider />
                <Form
                  {...layout}
                  name="nest-messages"
                  form={changeForm}
                  onFinish={HandlePassWordChange}
                  validateMessages={validateMessages}
                >
                  <Form.Item
                    name="password"
                    label="New password"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                      Change Password
                    </Button>
                  </Form.Item>
                </Form>
              </>
            ) : null}
          </div>
        </Modal>
      </div>{" "}
      <div>
        <Table columns={columns} className='data_table' dataSource={newData} scroll={{ x: 1000 }} />
      </div>
    </div>
  );
};

export default Employee;
