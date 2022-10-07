import React, { useEffect, useRef } from "react";
import echarts from "echarts"
import ReactEcharts from 'echarts-for-react';
import axios from "axios";

const Dashboard = (props) => {



    var data = [
        {
            name: 'Production',
            value: 5,
            // children: [
            //     {
            //         name: 'Uncle Leo',
            //         value: 15,
            //         children: [
            //             {
            //                 name: 'Cousin Jack',
            //                 value: 2
            //             },
            //             {
            //                 name: 'Cousin Mary',
            //                 value: 5,
            //                 children: [
            //                     {
            //                         name: 'Jackson',
            //                         value: 2
            //                     }
            //                 ]
            //             },
            //             {
            //                 name: 'Cousin Ben',
            //                 value: 4
            //             }
            //         ]
            //     },
            //     {
            //         name: 'Father',
            //         value: 10,
            //         children: [
            //             {
            //                 name: 'Me',
            //                 value: 5
            //             },
            //             {
            //                 name: 'Brother Peter',
            //                 value: 1
            //             }
            //         ]
            //     }
            // ]
        },
        {
            name: 'Sales',
            value: 5,
            // children: [
            //     {
            //         name: 'Uncle Nike',
            //         // children: [
            //         //     {
            //         //         name: 'Cousin Betty',
            //         //         value: 1
            //         //     },
            //         //     {
            //         //         name: 'Cousin Jenny',
            //         //         value: 2
            //         //     }
            //         // ]
            //     }
            // ]
        }
    ];

    // var data = [
    //     {
    //         name: 'Grandpa',
    //         children: [
    //             {
    //                 name: 'Uncle Leo',
    //                 value: 15,
    //                 children: [
    //                     {
    //                         name: 'Cousin Jack',
    //                         value: 2
    //                     },
    //                     {
    //                         name: 'Cousin Mary',
    //                         value: 5,
    //                         children: [
    //                             {
    //                                 name: 'Jackson',
    //                                 value: 2
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         name: 'Cousin Ben',
    //                         value: 4
    //                     }
    //                 ]
    //             },
    //             {
    //                 name: 'Father',
    //                 value: 10,
    //                 children: [
    //                     {
    //                         name: 'Me',
    //                         value: 5
    //                     },
    //                     {
    //                         name: 'Brother Peter',
    //                         value: 1
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         name: 'Nancy',
    //         children: [
    //             {
    //                 name: 'Uncle Nike',
    //                 children: [
    //                     {
    //                         name: 'Cousin Betty',
    //                         value: 1
    //                     },
    //                     {
    //                         name: 'Cousin Jenny',
    //                         value: 2
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ];


    var getOption = () => ({
        title: {
            text: "JS Front End Frameworks",
            x: "left"
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: "vertical",
            left: "left",
            data: data
        },
        series: {
            type: 'sunburst',
            data: data,
            radius: [60, '90%'],
            itemStyle: {
                borderRadius: 7,
                borderWidth: 2
            },
            label: {
                show: true,
            }
        }
    });

    return (
        <div className="App">
            {console.log("props", props)}
            <ReactEcharts option={getOption()} style={{ height: 500 }} />
        </div>
    );
}
export default Dashboard