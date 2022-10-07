import React, { useEffect, useState } from 'react';
import { Modal, Button, Select, Popconfirm, AutoComplete } from 'antd';
import axios from "axios"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/billing.css"
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./ComponentToPrint.js"
import { useReactToPrint } from "react-to-print";

import { DatePicker, Space } from 'antd';
import moment from 'moment';

import { Form, Input, InputNumber, Table } from 'antd';
import { DeleteOutlined, DeleteTwoTone, PrinterOutlined, CopyFilled, CloseCircleFilled } from '@ant-design/icons';
import Dashboard from './Dashboard';
const Billing = () => {
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    const [filterForm] = Form.useForm();
    const dateFormat = ['MMM - YYYY', 'MMM - YY'];
    let componentRef = useRef(null);
    const [form] = Form.useForm();
    const [year, setYear] = useState(moment().year());
    const [month, setMonth] = useState(moment().month() + 1);
    const [customerId, setCustomerId] = useState("all");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [product, setProduct] = useState([])
    const [dataSource, setDataSource] = useState([{ key: 1, item: '', ppu: 0, units: 0, description: "" }]);
    const [finishValue, setFinishValue] = useState({})
    const [result, setResult] = useState([]);
    const [billData, setbillData] = useState([]);
    const [lastBill, setlastBill] = useState();
    const [billNumber, setBillNumber] = useState("Bill");
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const handlePrint = useReactToPrint({
        documentTitle: billNumber,
        onBeforeGetContent: () => {
            onFinishHandle();
        },
        content: () => componentRef.current
    });

    const handleShowBill = useReactToPrint({
        documentTitle: billNumber,
        removeAfterPrint: false,
        content: () => componentRef.current
    });
    const handleShowBillData = (values) => {
        setFinishValue({
            address: values.address,
            companyname: values.companyname,
            gstnumber: values.gstnumber,
            mobilenumber: values.mobilenumber,
            date: moment(new Date(values.date)).format("DD/MM/YYYY"),
            count: values.total,
            gstper: values.gstPercentage,
            gstvalue: Math.trunc(values.total * (values.gst / 100)),
            total: values.total + Math.trunc(values.total * (values.gst / 100)),
            billNumber: values.invoiceNumber

        })
        setBillNumber(values.invoiceNumber)
        setDataSource(values.data)
    };


    useEffect(() => {

        filterForm.setFieldsValue({
            EmployeeSelect: "all"
        })
    }, []);


    const showModal = () => {
        setIsModalVisible(true);
        setFinishValue({})
        form.resetFields();
        setDataSource([{
            key: 1,
            item: '',
            ppu: 0,
            units: 0,
            description: ""
        }])
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSearch = (value) => {
        var res = []
        billData.map((key, i) => {
            if (res.includes(key.companyname) !== true)
                res.push(key.companyname)
        })
        var filteredResult = res.filter(word => word.startsWith(value))
        setResult(filteredResult)
    };

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'item',

            width: '5%',
            render: (text, record) => (

                <Select style={{ width: "100%" }} value={text} rules={[
                    {
                        required: true,
                    },
                ]}
                    tokenSeparators={[',']} onChange={(e) => {
                        record.item = e
                        record.description = product.find((ele) => ele.name === e).detail
                    }}
                >
                    {item}
                </Select>
            ),
        },
        {
            title: 'Quantity    ',
            dataIndex: 'units',
            width: '5%',
            render: (text, record) => (
                <Input type="text" style={{ width: '100%' }} onChange={(e) => {
                    record.units = e.target.value
                }}></Input>
            ),
        },
        {
            title: 'Rate/unit',
            dataIndex: 'ppu',
            width: '5%',
            render: (text, record) => (
                <Input type="text" style={{ width: '100%' }} onChange={(e) => HandleValueChange(record.key, e.target.value, "ppu")}></Input>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'units',
            width: '5%',
            render: (text, record) => (
                <div>
                    {record.units * record.ppu}
                </div>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'delete',
            width: '3%',
            render: (text, record) => (
                <>
                    <DeleteTwoTone onClick={() => { HandleDeleteItem(record.key) }} />
                </>
            ),
        },
    ];
    const columns1 = [
        {
            title: 'Invoice Number',
            dataIndex: 'invoiceNumber',
            width: '5%',
            key: 'invoiceNumber'
        },
        {
            title: 'Invoice date',
            dataIndex: 'date',

            width: '5%',
            render: (text, record) => {
                return <div>{new Date(text).toLocaleDateString("en-JM")}</div>;
            },
        },
        {
            title: 'Customer Name',
            dataIndex: 'companyname',

            width: '5%',
            key: 'companyname'
        },

        // {
        //     title: 'address',
        //     dataIndex: 'address',

        //     width: '5%',
        //     key: 'address'
        // },

        {
            title: 'GSTIN',
            dataIndex: 'gstnumber',

            width: '5%',
            key: 'gstnumber'
        },

        {
            title: 'Phone',
            dataIndex: 'mobilenumber',

            width: '5%',
            key: 'mobilenumber'
        },
        // {
        //     title: 'item',
        //     dataIndex: 'item',

        //     width: '5%',
        //     key: 'item'
        // },
        // {
        //     title: 'price per unit',
        //     dataIndex: 'ppu',
        //     width: '5%',
        //     key: 'ppu'
        // },
        // {
        //     title: 'units',
        //     dataIndex: 'units',
        //     width: '5%',
        //     key: 'units'
        // },
        // {
        //     title: 'description',
        //     dataIndex: 'description',
        //     width: '5%',
        //     key: 'description'
        // },
        {
            title: 'Taxable Value',
            dataIndex: 'total',
            width: '5%',
            key: 'total'
        },
        {
            title: 'Tax',
            dataIndex: 'gst',
            width: '5%',
            key: 'gst'
        },
        {
            title: 'Total',
            dataIndex: 'grandtotal',
            width: '5%',
            key: "grandtotal"
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            width: '3%',
            render: (text, record) => (
                <div>
                    <Popconfirm
                        icon={<CloseCircleFilled style={{ color: "red" }} />}
                        title="Are you Sure?"
                        onConfirm={() => handleDetailDelete(record)}
                        okText="Delete"
                    >
                        <DeleteOutlined onClick={() => console.log('visible change')} />
                    </Popconfirm>
                    <Popconfirm
                        icon={<CopyFilled style={{ color: "#1890ff" }} />}
                        title="Print your bill!"
                        onConfirm={handleShowBill}
                        okText="Yes"
                        cancelText="No"
                    >
                        <PrinterOutlined style={{ marginLeft: "15px" }} onClick={() => { handleShowBillData(record) }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const handleDetailDelete = (key) => {

        axios.post("/billing/deletebilling", { id: key._id }).then((res) => {
            if (res.data.success) {
                toast.success(res.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsModalVisible(false);
                form.resetFields()
                axios.get(`/billing/getbilling?id=${customerId}&month=${month}&year=${year}`).then((res) => {
                    var result = res.data.data
                    setbillData(result.reverse());
                    setlastBill(result[0].invoiceNumber)
                    filterForm.setFieldsValue({
                        totalGst: res.data.totalGst,
                        totalAmount: res.data.totalAmount

                    });
                })

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



    const HandleAddItem = () => {
        setDataSource([...dataSource, {
            key: dataSource[dataSource.length - 1].key + 1,
            item: '',
            ppu: 0,
            units: 0,
            description: ""
        }])
    }

    const HandleDeleteItem = (key) => {
        if (dataSource.length > 1) {
            const temp = dataSource.filter((e) => e.key !== key);
            setDataSource(temp);
        } else {
            toast.warn("Minimum one item require", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const HandleValueChange = (key, value, type) => {

        const index = dataSource.findIndex((obj => obj.key == key));
        const temp = dataSource
        temp[index][type] = value
        setDataSource(temp)

    }
    useEffect(() => {

        axios.get("/product/getProduct").then((res) => {
            var result = res.data.data
            setProduct(result)
        })
    }, [])

    const { Option } = Select;
    const item = [];
    for (let i = 0; i < product.length; i++) {
        if (product[i].status) {
            item.push(<Option key={product[i].name} value={product[i].name}  >{product[i].name}</Option>);
        }
    }

    useEffect(() => {
        axios.get(`/billing/getbilling?id=${customerId}&month=${month}&year=${year}`,
            { _id: customerId }).then((res) => {
                var result = res.data.data
                if (res.data.success) {
                    setbillData(result.reverse());
                    setlastBill(result[0].invoiceNumber)
                    filterForm.setFieldsValue({
                        totalGst: res.data.totalGst,
                        totalAmount: res.data.totalAmount
                    });
                } else {
                    setbillData([]);
                    filterForm.setFieldsValue({
                        totalGst: 0,
                        totalAmount: 0
                    });
                }
            });
    }, [customerId, month, year]);

    const onFinishHandle = async () => {

        let values = form.getFieldsValue(true);
        let anyBlank = dataSource.find((e) => e.ppu === 0 || e.units === 0 || e.item === "")
        if (anyBlank) {
            toast.warn("please check item not valid", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            let count = 0
            dataSource.forEach((e) => {
                count = count + e.ppu * e.units
            })

            var currentyear = new Date().getFullYear()
            var nextyear = ((new Date().getFullYear() + 1).toString()).slice(-2)
            var date = new Date().getDate()
            var month = new Date().getMonth() + 1
            let tempNumber
            if (lastBill !== undefined) {
                tempNumber = lastBill.split("/")
            }

            let billNumberTemp
            if (lastBill === undefined) {
                var bill = `2021-22/1`
                billNumberTemp = bill
                setBillNumber(billNumberTemp)

            } else {
                if (date == 5 && month == 4) {
                    let year = `${currentyear}-${nextyear}`
                    if (year == tempNumber[0]) {

                        billNumberTemp = `${currentyear}-${nextyear}/${parseInt(tempNumber[1]) + 1}`
                        setBillNumber(billNumberTemp)

                    } else {
                        billNumberTemp = `${currentyear}-${nextyear}/1`
                        setBillNumber(billNumberTemp)

                    }
                } else {
                    var bill = `${tempNumber[0]}/${parseInt(tempNumber[1]) + 1}`
                    billNumberTemp = bill
                    setBillNumber(billNumberTemp)
                }
            }
            setFinishValue({
                address: values.address,
                companyname: values.companyname,
                gstnumber: values.gstnumber,
                mobilenumber: values.mobilenumber,
                date: moment(new Date(values.date)).format("DD/MM/YYYY"),
                count: count,
                gstper: values.gstper,
                gstvalue: Math.trunc(count * (values.gstper / 100)),
                total: count + Math.trunc(count * (values.gstper / 100)),
                billNumber: billNumberTemp
            })

            await axios.post('/billing/addbilling/', { companyname: values.companyname, address: values.address, gstnumber: values.gstnumber, mobilenumber: values.mobilenumber, date: new Date(values.date), data: dataSource, gst: values.gstper, invoiceNumber: billNumberTemp }).then((res) => {
                if (res.data.success) {
                    toast.success("bill added", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setDataSource([{
                        ppu: 0,
                        units: 0
                    }])
                    setIsModalVisible(false);
                    form.resetFields()
                    axios.get(`/billing/getbilling?id=${customerId}&month=${month}&year=${year}`).then((res) => {
                        var result = res.data.data
                        setbillData(result.reverse());
                        setlastBill(result[0].invoiceNumber)
                        filterForm.setFieldsValue({
                            totalGst: res.data.totalGst,
                            totalAmount: res.data.totalAmount
                        });
                    })

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
        }
    }
    const HandleError = async (values) => {
        toast.warn("please check item not valid", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }


    const handleField = (value, option) => {
        var fieldData = billData.find((key, i) => {
            return value == key.companyname
        })
        form.setFieldsValue({
            address: fieldData.address, gstnumber: fieldData.gstnumber, mobilenumber: fieldData.mobilenumber
        })
    }


    function disabledDate(current) {
        // Can not select days before today and today
        return current && current > moment().endOf("day");
    }

    function monthChange(date, dateString) {

        if (date === null) {
            setMonth(50)
            setYear(50)
        } else {
            setMonth(date.month() + 1);
            setYear(date.year());
        }

    }
    function handleChange(value) {
        setCustomerId(value);
    }

    const customer = [];
    const uniqueCustomer = [];
    customer.push(
        <Option key="all" value="all">
            All
        </Option>
    );
    for (let i = 0; i < billData.length; i++) {
        if (!uniqueCustomer.includes(billData[i].companyname)) {
            customer.push(
                <Option key={billData[i].companyname} value={billData[i].companyname}>
                    {billData[i].companyname}
                </Option>
            );
            uniqueCustomer.push(billData[i].companyname)
        }
    }




    return (
        <div>
            <>


                <div>

                    <div className='add_button'>

                        <Button type="primary" onClick={showModal}>
                            Create bill
                        </Button>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }} >
                        <Form
                            {...layout}
                            name="header"
                            form={filterForm}
                            validateMessages={validateMessages}
                            className="filter_form"
                        >
                            <Form.Item
                                name="EmployeeSelect"
                                label="Customer"
                            // initialValue={isType}
                            // className="profileSelect_wrp"
                            >
                                <Select
                                    // getPopupContainer={(triggerNode) => triggerNode.parentElement}
                                    onChange={handleChange}
                                    className="profile_title"
                                    tokenSeparators={[","]}
                                >
                                    {customer}

                                </Select>
                            </Form.Item>
                            <Form.Item name="month" label="Month of production" className="profile_title">
                                <Space direction="vertical" size={12}></Space>
                                <DatePicker
                                    format={dateFormat}
                                    picker="month"
                                    disabledDate={disabledDate}
                                    defaultValue={moment()}
                                    onChange={monthChange}

                                />
                            </Form.Item>

                            <Form.Item name="totalGst" label="Total GST">
                                <Input disabled />
                            </Form.Item>
                            <Form.Item name="totalAmount" label="Total Amount">
                                <Input disabled />
                            </Form.Item>
                        </Form>
                    </div>
                </div>

                <Modal title="Add Bill Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} maskClosable={false}>
                    <Form {...layout} name="nest-messages" form={form} onFinish={handlePrint} validateMessages={validateMessages} initialValues={{ date: moment() }}>
                        <Form.Item
                            name={'companyname'}
                            label="Customer Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <AutoComplete
                                onSearch={handleSearch}
                                onSelect={handleField}
                            >
                                {result.map((email) => (
                                    <Option key={email} value={email}>
                                        {email}
                                    </Option>
                                ))}
                            </AutoComplete>
                        </Form.Item>
                        <Form.Item name={'address'} label="Address" >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            name={'gstnumber'}
                            label="GSTIN"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={'mobilenumber'}
                            label="Mobile Number"
                            rules={[
                                {
                                    pattern: /^[0-9]{10}$/,
                                    required: true,
                                    types: 'number',
                                    message: "please add valid Phone number"

                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={'gstper'}
                            label="CGST+SGST(%)"
                            rules={[
                                {
                                    pattern: /^[0-9]*$/,
                                    required: true,
                                    types: 'number',
                                    message: "please add valid Number"
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name='date' label="Date" >
                            <DatePicker format={dateFormatList} allowClear={false} />
                        </Form.Item>
                        <div className='main_table_add'>
                            <Table dataSource={dataSource} columns={columns} scroll={{ x: 300 }} className='data_table' />
                            <Button type="primary" className='add_item' onClick={HandleAddItem}>
                                Add item
                            </Button>
                        </div>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Table dataSource={billData} columns={columns1} scroll={{ x: 300 }} className='data_table' />
            </>
            <div style={{ display: "none" }}>
                <ComponentToPrint dataSource={dataSource} finishValue={finishValue} ref={componentRef} />
            </div>

        </div>
    )
}
export default Billing
