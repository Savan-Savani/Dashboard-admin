import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

const RightMenu = () => {
    return (
        <Menu mode="horizontal ">
            <Menu.Item key="mail">
                <a href={null}>Products</a>
            </Menu.Item>
            <Menu.Item key="app">
                <a href={null}>About us</a>
            </Menu.Item>
        </Menu>
    );
};


export default RightMenu