import React, { useRef } from "react";
import "../../css/componenttoprint.css"
import { Button, Form, Input, Popconfirm, Select, Table } from 'antd';
import logo from "../../image/logo1.png"


class ComponentToPrint extends React.Component {
    render() {
        return (
            <div >
                <div>
                    <div className="bill_body" >
                        <header className="clearfix">
                            <div id="logo">
                                <img src={logo} />
                            </div>
                            <h1>MANAKI ENTERPRISE</h1>

                            <div id="company" >
                                <div>Manaki Enterprise </div>
                                <div> 796 Silver Harbour,<br /> TX 79273, US</div>
                                <div>9999999999 </div>
                                <div><a href="mailto:john@example.com">john@example.com</a></div>

                            </div>
                            <div id="project" className="clearfix" >
                                <div><span>Cust Name :</span>{this.props.finishValue.companyname}</div>
                                <div><span>Address :</span>{this.props.finishValue.address}</div>
                                <div><span>GSTIN :</span>{this.props.finishValue.gstnumber}</div>
                                <div><span>Mobile NO. :</span>{this.props.finishValue.mobilenumber}</div>
                                <div><span>DATE :</span>{this.props.finishValue.date}</div>
                                <div><span>Invoice No. :</span>{this.props.finishValue.billNumber}</div>
                            </div>
                        </header>
                        <main>
                            <table >
                                <thead >
                                    <tr>
                                        <th className="service" style={{ width: "40%" }}>Product Name</th>
                                        <th className="desc" style={{ width: "30%" }}>Description</th>
                                        <th style={{ width: "10%" }}>Units</th>
                                        <th style={{ width: "10%" }}>Rate per Unit</th>
                                        <th style={{ width: "10%" }}>Total</th>

                                    </tr>
                                </thead>
                                <tbody className="body_table">
                                    {/* <tr>
                                        {this.props.dataSource.map((key, index) => {
                                            return (
                                                <div>
                                                    <tr>
                                                        <td className="service">{key.item}</td>
                                                        <td className="desc">{key.ppu}</td>
                                                        <td className="unit">{key.units}</td>
                                                        <td className="qty">{key.ppu * key.units}</td>
                                                    </tr>
                                                </div>
                                            )
                                        })}
                                    </tr> */}
                                    {
                                        this.props.dataSource.map((key, i) => {
                                            return (
                                                <tr>
                                                    <td className="service" style={{ width: "40%" }}>{this.props.dataSource[i].item}</td>
                                                    <td className="desc" style={{ width: "30%" }}>{this.props.dataSource[i].description} </td>
                                                    <td className="unit" style={{ width: "10%" }}>{this.props.dataSource[i].units}</td>
                                                    <td className="qty" style={{ width: "10%" }}>{this.props.dataSource[i].ppu}</td>
                                                    <td className="total" style={{ width: "10%" }}>{this.props.dataSource[i].ppu * this.props.dataSource[i].units}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    {/* <tr>
                                        <td className="service">SEO</td>
                                        <td className="desc">Optimize the site for search engines (SEO)</td>
                                        <td className="unit">$40.00</td>
                                        <td className="qty">20</td>
                                        <td className="total">$800.00</td>
                                    </tr>
                                    <tr>
                                        <td className="service">Training</td>
                                        <td className="desc">Initial training sessions for staff responsible for uploading web content</td>
                                        <td className="unit">$40.00</td>
                                        <td className="qty">4</td>
                                        <td className="total">$160.00</td>
                                    </tr> */}
                                    <tr>
                                        <td colspan="4">SUBTOTAL</td>
                                        <td className="total">{this.props.finishValue.count}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4">CGST {this.props.finishValue.gstper / 2}%</td>
                                        <td className="total">{this.props.finishValue.gstvalue / 2}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4">SGST {this.props.finishValue.gstper / 2}%</td>
                                        <td className="total">{this.props.finishValue.gstvalue / 2}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" className="grand total">TOTAL</td>
                                        <td className="grand total">{this.props.finishValue.total}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div id="notices">
                                <div>NOTICE:</div>
                                <div className="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
                            </div>
                        </main>
                        <footer>
                            Invoice was created on a computer and is valid without the signature and seal.
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}
export default ComponentToPrint