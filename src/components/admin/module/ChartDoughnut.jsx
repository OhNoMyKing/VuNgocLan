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
function ChartDoughnut() {
    const [revenueData, setReVenueData] = useState([]);
    const [year, setYear] = useState();
    const [month, setMonth] = useState([new Date().getMonth() + 1]);
    const [isInitialFetchDone, setIsInitialFetchDone] = useState(false);

    useEffect(() => {
        fetchSportswear();


        // if (!isInitialFetchDone) {
        //     fetchSportswear();
        //     setIsInitialFetchDone(true);
        // }
    }, [month]);
    const handleMonthChange = (e) => {
        setMonth(e.target.value);

    };
    const fetchSportswear = async () => {
        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await SportswearService.getListLabelAndValue(token, month);
            console.log(response)

            setReVenueData(response.labelAndValueList);
            // console.log(response)
            // Assuming the list of users is under the key 'ourUsersList'
        } catch (error) {
            console.log('Error fetching users:');
        }
    };
    return (

        <div className="div">
            <div className="row">


                <div className="col-lg-12 overflow-hidden">

                    <div className="card overflow-hidden">
                        <div className="card-body p-4">
                            <h5 className="card-title mb-9 fw-semibold">Yearly Breakup</h5>
                            <div>
                                <select className="form-select" value={month} onChange={handleMonthChange}>
                                    <option value="1">Tháng 1</option>
                                    <option value="2">Tháng 2</option>
                                    <option value="3">Tháng 3</option>
                                    <option value="4">Tháng 4</option>
                                    <option value="5">Tháng 5</option>
                                    <option value="6">Tháng 6</option>
                                    <option value="7">Tháng 7</option>
                                    <option value="8">Tháng 8</option>
                                    <option value="9">Tháng 9</option>
                                    <option value="10">Tháng 10</option>
                                    <option value="11" >Tháng 11</option>
                                    <option value="12">Tháng 12</option>

                                </select>
                            </div>
                            <div className="row align-items-center">

                                <div className="col-6">
                                    <h4 className="fw-semibold mb-3">$36,358</h4>
                                    <div class="mt-6  small">

                                        <span class="mr-3">
                                            <i class="fas fa-circle text-danger"></i> Áo câu lạc bộ
                                        </span>
                                    </div>
                                    <div class="mt-6  small">
                                        <span class="mr-3">
                                            <i class="fas fa-circle text-warning"></i> Áo Training
                                        </span>

                                    </div>
                                    <div class="mt-6  small">

                                        <span class="mr-3">
                                            <i class="fas fa-circle text-primary"></i> Thể thao khác
                                        </span>

                                    </div>

                                </div>
                                <div className="col-6">
                                    <div className="d-flex justify-content-center">
                                        <div id="breakup">
                                            <div className="">

                                                <Doughnut
                                                    data={{
                                                        labels: [],
                                                        datasets: [
                                                            {
                                                                label: ["Số lượng"],
                                                                data: revenueData.map((data) => data.value),
                                                                backgroundColor: [
                                                                    "red",
                                                                    "yellow",
                                                                    "blue",
                                                                ],
                                                                borderColor: [
                                                                    "red",
                                                                    "yellow",
                                                                    "blue",
                                                                ],
                                                            },
                                                        ],
                                                    }}

                                                />

                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </div>
    )
}
export default ChartDoughnut;