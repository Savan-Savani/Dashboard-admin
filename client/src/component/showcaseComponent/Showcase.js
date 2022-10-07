import React, { Component, useState } from 'react';
import RightMenu from './RightMenu'
import { Drawer, Button } from 'antd';
import './css/showcase.css'
import logo from '../../image/logo1.png'
import Layout, { Content } from 'antd/lib/layout/layout';
import tempimg from "../../image/front.jpeg"
import Cards from './Cards';

const Showcase = () => {

    const [current, setcurrent] = useState('mail');
    const [visible, setvisible] = useState(false);

    const showDrawer = () => {
        setvisible(true);
    };
    const onClose = () => {
        setvisible(false)

    };


    return (
        <div>
            <nav className="menuBar">
                <div className="logo">
                    <img src={logo} height={50} />
                </div>
                <div className="menuCon">
                    <div className="rightMenu">
                        <RightMenu />
                    </div>
                    <Button className="barsMenu" type="primary" onClick={showDrawer}>
                        <span className="barsBtn"></span>
                    </Button>
                    <Drawer
                        title="Basic Drawer"
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                    >
                        <RightMenu />
                    </Drawer>
                </div>

            </nav>

            <div style={{ marginTop: "15px", display }}>
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />

            </div>
        </div>
    );

};


export default Showcase