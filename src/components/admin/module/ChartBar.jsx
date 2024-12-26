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
function ChartBar() {
    const [revenueData, setReVenueData] = useState([]);
    const [year, setYear] = useState();
    useEffect(() => {
        if (!revenueData.length) {
            fetchSportswear();
        }
    }, [revenueData]);
    const fetchSportswear = async () => {
        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await SportswearService.getAllListSportswearRevenueResponseInAMonth(token);

            setReVenueData(response.sportswearRevenueResponseInAMonthList);
            setYear(response.year)
            // Assuming the list of users is under the key 'ourUsersList'
        } catch (error) {
            console.log('Error fetching users:');
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
            {/* <div className="dataCard revenueCard col-12 d-flex justify-content-end">
                <Line
                    data={{
                        labels: revenueData.map((data) => data.month),
                        datasets: [
                            {
                                label: "Doanh thu",
                                data: revenueData.map((data) => data.revenue),
                                backgroundColor: "red",
                                borderColor: "red",

                            },

                        ],
                    }}
                    options={{
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Tháng'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Số lượng'
                                }
                            }
                        },
                        plugins: {

                            title: {
                                text: 'Số lượng bán được theo tháng của năm ' + year,

                            },
                        },
                    }}
                />
            </div> */}

            <div className="" style={{ height: '450px', width: '200px' }}>
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
                // options={{

                //     plugins: {
                //         title: {
                //             text: "Revenue Source",
                //         },
                //     },
                // }}
                />
            </div>

            {/* <div className="">

                <Doughnut
                    data={{
                        labels: [],
                        datasets: [
                            {
                                label: ["Số lượng"],
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
                // options={{
                //     plugins: {
                //         labels: sourceData.map((data) => data.label),
                //         title: {
                //             text: "Revenue Sources",
                //         },
                //     },
                // }}
                />
            </div> */}
        </div>
    )
}
export default ChartBar;