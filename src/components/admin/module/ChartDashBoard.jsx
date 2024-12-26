import React, { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import sourceData from "./data/sourceData.json";
import SportswearService from "../../service/SportswearService";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function ChartDashBoard() {
    const [revenueData, setRevenueData] = useState([]);
    const [year, setYear] = useState();
    const [isInitialFetchDone, setIsInitialFetchDone] = useState(false);

    useEffect(() => {
        if (!isInitialFetchDone) {
            fetchSportswear();
            setIsInitialFetchDone(true);
        }
    }, [isInitialFetchDone]);

    const fetchSportswear = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await SportswearService.getAllListSportswearRevenueResponseInAMonth(token);

            setRevenueData(response.sportswearRevenueResponseInAMonthList);
            setYear(response.year);
            // Set loading state to false after successful fetch
        } catch (error) {
            console.error('Error fetching users:', error);

        }
    };

    return (
        <div className="div">
            {/* <div className="dataCard revenueCard">
                <Line
                    data={{
                        labels: revenueData.map((data) => data.month),
                        datasets: [

                            {
                                label: "Cost",
                                data: revenueData.map((data) => data.revenue),
                                backgroundColor: "#FF3030",
                                borderColor: "#FF3030",
                            },
                        ],
                    }}
                    options={{

                        plugins: {
                            title: {
                                text: "Monthly Revenue & Cost",

                            },
                        },
                    }}
                />
            </div> */}
            <div className="dataCard revenueCard col-12 d-flex justify-content-end">
                <Line
                    data={{
                        labels: revenueData.map((data) => `T${data.month}`),
                        datasets: [
                            {
                                label: "Doanh thu",
                                data: revenueData.map((data) => data.revenue),
                                backgroundColor: "red",
                                borderColor: "red",
                                yAxisID: 'y',
                            },
                            {
                                label: "Số lượng",
                                data: revenueData.map((data) => data.quantity),
                                backgroundColor: "blue",
                                borderColor: "blue",
                                yAxisID: 'y1',
                            },

                        ],
                    }}
                    options={{
                        scales: {
                            y: {
                                id: 'y',
                                position: 'left',
                            },
                            y1: {
                                id: 'y1',
                                position: 'right',
                                grid: {
                                    drawOnChartArea: false, // Tùy chọn để ẩn các đường kẻ lưới của trục y thứ hai
                                },
                            },
                            x: {
                                title: {
                                    display: false,
                                    text: 'Tháng'
                                }
                            },
                            y: {
                                title: {
                                    display: false,
                                    text: ''
                                }
                            }
                        },
                        plugins: {

                            title: {
                                text: 'Doanh thu 12 tháng của năm ' + year,

                            },
                        },
                    }}
                />
            </div>

            {/* <div className="dataCard customerCard">
                <Bar
                    data={{
                        labels: sourceData.map((data) => data.label),
                        datasets: [
                            {
                                label: "Count",
                                data: sourceData.map((data) => data.value),
                                backgroundColor: [
                                    "rgba(43, 63, 229, 0.8)",
                                    "rgba(250, 192, 19, 0.8)",
                                    "rgba(253, 135, 135, 0.8)",
                                ],
                                borderRadius: 5,
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                text: "Revenue Source",
                            },
                        },
                    }}
                />
            </div> */}

            {/* <div className="dataCard categoryCard">
                <Doughnut
                    data={{
                        labels: sourceData.map((data) => data.label),
                        datasets: [
                            {
                                label: "Count",
                                data: sourceData.map((data) => data.value),
                                backgroundColor: [
                                    "rgba(43, 63, 229, 0.8)",
                                    "rgba(250, 192, 19, 0.8)",
                                    "rgba(253, 135, 135, 0.8)",
                                ],
                                borderColor: [
                                    "rgba(43, 63, 229, 0.8)",
                                    "rgba(250, 192, 19, 0.8)",
                                    "rgba(253, 135, 135, 0.8)",
                                ],
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                text: "Revenue Sources",
                            },
                        },
                    }}
                />
            </div> */}
        </div>
    )
}
export default ChartDashBoard;