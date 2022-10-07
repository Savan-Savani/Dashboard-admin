import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Space, Result, Select, Popconfirm } from "antd";
import { Modal, Button } from "antd";
import axios from "axios";
import noImg from "../../image/noImg.png"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { Form, Input, InputNumber } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/product.css";
import { Option } from "antd/lib/mentions";

const Product = () => {
  const [form] = Form.useForm();
  let ImgURL = "https://manakienterprise.herokuapp.com/"

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
  const [img, setImage] = useState([]);
  const [tempImg, settempImg] = useState("");

  const [recordId, setRecordId] = useState();
  const [isstatus, setIsStatus] = useState("true");


  const showModal = () => {
    form.resetFields();
    settempImg("");
    setIsModalVisible(true);
    setEditable(false);
  };
  const editModel = (record) => {
    setEditable(true);
    setIsModalVisible(true);
    setRecordId(record._id);
    if (record.image) {
      settempImg(`${ImgURL}${record.image}`);
    } else {
      settempImg(null);
    }

    form.setFieldsValue({
      Name: record.name,
      Price: Number(record.price),
      Detail: record.detail,
      Status: record.status ? "true" : "false",
    });
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    axios.get("/product/getProduct").then((res) => {
      var result = res.data.data;
      setNewData(result);
    });
  }, []);

  const [newData, setNewData] = useState([]);

  const deleteModel = (record) => {
    // setRecordId(record._id)
    axios.post(`/product/updateProduct/`, { _id: record._id, status: false })
      .then((result) => {
        axios.get("/product/getProduct").then((res) => {
          var result = res.data.data;
          setNewData(result);
        });
      });
  };

  const columns = [
    {
      title: "Product Id",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Rate / Unit",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Product Detail",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (text) => (
        <img src={text ? `${ImgURL}${text}` : noImg} height="50px" />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => <div style={{ color: record.status ? "green" : "red" }} >{record.status ? "Active" : "Deactive"}</div>,
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

  function processImage(event) {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    settempImg(imageUrl);
    setImage(imageFile);
  }

  const onFinishSubmit = async (values) => {
    var bodyFormData = new FormData();
    bodyFormData.append("name", values.Name);
    bodyFormData.append("price", values.Price);
    bodyFormData.append("detail", values.Detail);
    bodyFormData.append("img", img);
    bodyFormData.append("status", values.Status === "true" ? true : false);


    await axios.post(`/product/addProduct`, bodyFormData).then((res) => {
      if (res.data.success) {
        toast.success("Product added successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        form.resetFields();
        axios.get("/product/getProduct").then((res) => {
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

  const onFinishEdit = async (values) => {
    var bodyFormData = new FormData();
    bodyFormData.append("name", values.Name);
    bodyFormData.append("price", values.Price);
    bodyFormData.append("detail", values.Detail);
    bodyFormData.append("_id", recordId);
    bodyFormData.append("img", img);
    bodyFormData.append("status", values.Status === "true" ? true : false);


    await axios.post(`/product/updateProduct/`, bodyFormData).then((res) => {
      if (res.data.success) {
        toast.success("Product edited successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        form.resetFields();
        axios.get("/product/getProduct").then((res) => {
          var result = res.data.data;
          setNewData(result);
        });
        setIsModalVisible(false);
        setEditable(false);
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

  return (
    <div>
      <div>
        <div className="add_button">
          <Button type="primary" onClick={showModal}>
            Add Product
          </Button>
        </div>
        <Modal
          title="Product Details"
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
                name="Name"
                label="Product Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="Price"
                label="Rate per unit"
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: "Please add valid Rate"
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="Detail" label="Product Detail">
                <Input.TextArea />
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
              <Form.Item name="Image" label="Product Image" rules={[
                {
                  message: "Image file must be PNG/JPG/JPEG"
                },
              ]} >
                <label for="file-upload" class="custom-file-upload">
                  Upload Image (.jpg/.png)
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={processImage}
                />
                {tempImg !== "" ? <img src={tempImg ? tempImg : noImg} width={150}></img> : null}
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
          </div>
        </Modal>
      </div>
      <div>
        <Table columns={columns} dataSource={newData} scroll={{ x: 1000 }} className='data_table' />
      </div>
    </div>
  );
};

export default Product;
