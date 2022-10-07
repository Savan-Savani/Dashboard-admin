import { Button, Form, Input, Popconfirm, Select, Table } from "antd";
import moment from "moment";
import { DatePicker, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, CloseCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import '../../css/production.css'
import "react-toastify/dist/ReactToastify.css";

const Production = () => {
  const dateFormatList = ['MMM - YYYY', 'MMM - YY'];
  const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY'];
  const type = localStorage.getItem("type");
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newData, setNewData] = useState([]);
  const [product, setProduct] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [recordId, setRecordId] = useState();
  const [editable, setEditable] = useState(false);
  const [empId, setEmpId] = useState("all");
  const [month, setMonth] = useState(moment().month() + 1);
  const [year, setYear] = useState(moment().year());

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

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf("day");
  }
  const showModal = () => {
    form.resetFields();
    if (type === "admin") {
      form.setFieldsValue({
        date: moment(),
      })
    } else {
      form.setFieldsValue({
        date: moment(),
        employee: localStorage.getItem("user")
      })
    }
    setIsModalVisible(true);
    setEditable(false);
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
      setProduct(result);
    });
    filterForm.setFieldsValue({
      EmployeeSelect: type === "admin" ? "all" : localStorage.getItem("user")
    })
    if (type !== "admin") {
      setEmpId(localStorage.getItem("user"))
    }
  }, []);
  useEffect(() => {
    axios.get("/employee/getemployee").then((res) => {
      var result = res.data.data;
      setEmployee(result);
    });
  }, []);

  const { Option } = Select;

  const children = [];
  children.push(
    <Option key="all" value="all">
      All
    </Option>
  );
  for (let i = 0; i < employee.length; i++) {
    if (employee[i].type == "employee" && employee[i].status) {
      children.push(
        <Option key={employee[i].userName} value={employee[i]._id}>
          {employee[i].userName}
        </Option>
      );
    }
  }
  const item = [];
  for (let i = 0; i < product.length; i++) {
    if (product[i].status) {
      item.push(
        <Option key={product[i].name} value={product[i]._id}>
          {product[i].name}
        </Option>
      );
    }
  }

  const editModel = (record) => {
    setIsModalVisible(true);
    setRecordId(record._id);
    setEditable(true);

    form.setFieldsValue({
      employee: record.employee.userName,
      product: record.product.name,
      weight: record.weight,
      date: moment(record.date)
    });
  };

  const adminColumns = [
    {
      title: "Employee Name",
      dataIndex: "employee",
      render: (text, record) => {
        return <div>{text.userName}</div>;
      },
    },
    {
      title: "Product Name",
      dataIndex: "product",
      render: (text, record) => {
        return <div>{text.name}</div>;
      },
    },
    {
      title: "Units",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return <div>{new Date(text).toLocaleDateString("en-JM")}</div>;
      },
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   render: (text, record) => <div style={{color:record.status?"green":"red"}} >{record.status ? "Active" : "Deactive"}</div>,
    // },
    {
      title: "Action",
      dataIndex: "",
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => editModel(record)} />
          <Popconfirm
            icon={<CloseCircleFilled style={{ color: "red" }} />}
            title="Are you sure?"
            onConfirm={() => deleteModel(record)}
            okText="Delete"
          >
            <DeleteOutlined style={{ marginLeft: "10px" }} />
          </Popconfirm>
        </div>
      )
    },
  ];

  const empColumns = [
    {
      title: "Employee Name",
      dataIndex: "employee",
      render: (text, record) => {
        return <div>{text.userName}</div>;
      },
    },
    {
      title: "Product Name",
      dataIndex: "product",
      render: (text, record) => {
        return <div>{text.name}</div>;
      },
    },
    {
      title: "Weight in Unit",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return <div>{new Date(text).toLocaleDateString("en-JM")}</div>;
      },
    },
  ];

  useEffect(() => {
    axios
      .get(
        `/production/getProduction?id=${empId}&month=${month}&year=${year}`,
        { _id: empId }
      )
      .then((res) => {
        var result = res.data.data;
        if (res.data.success) {
          setNewData(result.reverse());
          filterForm.setFieldsValue({
            count: res.data.count,
          });
        } else {
          setNewData([]);
          filterForm.setFieldsValue({
            count: 0,
          });
        }
      });
  }, [empId, month, year]);

  const onFinishSubmit = async (values) => {
    await axios
      .post(`/production/addProduction`, {
        employee: values.employee,
        product: values.product,
        weight: values.weight,
        date: new Date(values.date)
      })
      .then((res) => {
        if (res.data.success) {
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
        axios.get(`/production/getProduction?id=${empId}&month=${month}&year=${year}`).then((res) => {
          var result = res.data.data;
          setNewData(result.reverse());
          filterForm.setFieldsValue({
            count: res.data.count
          })
        });
        setIsModalVisible(false);
      });
  };
  const onFinishEdit = async (values) => {
    await axios
      .post(`/production/updateProduction/`, {
        _id: recordId,
        employee: values.employee,
        product: values.product,
        weight: values.weight,
      })
      .then((res) => {
        if (res.data.success) {
          form.resetFields();
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
        axios.get(`/production/getProduction?id=${empId}&month=${month}&year=${year}`).then((res) => {
          var result = res.data.data;
          setNewData(result.reverse());
          filterForm.setFieldsValue({
            count: res.data.count
          })
        });

        setIsModalVisible(false);
      });
    setEditable(false);
  };

  const deleteModel = (record) => {
    axios
      .post(`/production/deleteProduction`, { _id: record._id })
      .then((result) => {
        axios.get(`/production/getProduction?id=${empId}&month=${month}&year=${year}`).then((res) => {
          var result = res.data.data;
          setNewData(result.reverse());
          filterForm.setFieldsValue({
            count: res.data.count
          })
        });
      });
  };
  function handleChange(value) {
    setEmpId(value);
  }

  function monthChange(date, dateString) {
    setMonth(date.month() + 1);
    setYear(date.year());
  }

  return (
    <div>
      <div>
        <div className="add_button">
          <Button type="primary" onClick={showModal} className="add_button">
            Add Details
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }} hidden={type !== "admin"}>
          <Form
            {...layout}
            name="header"
            form={filterForm}
            validateMessages={validateMessages}
            className="filter_form"
          >
            <Form.Item
              name="EmployeeSelect"
              label="Employee"
            // initialValue={isType}
            // className="profileSelect_wrp"
            >
              <Select
                // getPopupContainer={(triggerNode) => triggerNode.parentElement}
                onChange={handleChange}
                className="profile_title"
                tokenSeparators={[","]}
              >
                {children}
              </Select>
            </Form.Item>
            <Form.Item name="month" label="Month of production" className="profile_title">
              <Space direction="vertical" size={12}></Space>
              <DatePicker
                format={dateFormatList}
                picker="month"
                disabledDate={disabledDate}
                defaultValue={moment()}
                onChange={monthChange}
                allowClear={false}
              />
            </Form.Item>

            <Form.Item name="count" label="Total Units">
              <Input disabled />
            </Form.Item>
          </Form>
        </div>
      </div>
      <div>
        <Modal
          title="Production Details"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          maskClosable={false}
        >
          <div>
            <Form
              {...layout}
              name="body"
              form={form}
              onFinish={editable ? onFinishEdit : onFinishSubmit}
              validateMessages={validateMessages}
            >
              <Form.Item
                name="employee"
                label="Employee Name"
                rules={[{ required: true, message: 'Please select employee!' }]}
              >
                <Select
                  getPopupContainer={(triggerNode) => triggerNode.parentElement}
                  // onChange={handleChange}
                  className="profile_title"
                  tokenSeparators={[","]}
                  disabled={type !== "admin"}
                >
                  {employee.filter((e => e.type === "employee" && e.status)).map((e) => {
                    return (
                      <Option key={e.userName} value={e._id}>
                        {e.userName}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="product"
                label="product name"
                // initialValue={isType}
                // className="profileSelect_wrp"
                rules={[{ required: true, message: 'Please select product!' }]}
              >
                <Select
                  getPopupContainer={(triggerNode) => triggerNode.parentElement}
                  // onChange={handleChange}
                  className="profile_title"
                  tokenSeparators={[","]}
                >
                  {item}
                </Select>
              </Form.Item>

              <Form.Item name="weight" label="weight in unit" rules={[{ required: true, pattern: /^[0-9]*$/, message: 'Please input valid units!' }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="date"
                label="date"
                rules={[
                  {
                    type: "date",
                  },
                ]}
              >
                <DatePicker disabled={type !== "admin"} allowClear={false} format={dateFormat} />
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                {editable ? (
                  <Button type="primary" htmlType="submit">
                    Edit
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
        <Table dataSource={newData} columns={type === "admin" ? adminColumns : empColumns} scroll={{ x: 1000 }} className='data_table' />
      </div>
    </div>
  );
};

export default Production;
