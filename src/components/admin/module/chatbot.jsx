import React, { useState } from 'react';
import { useEffect } from 'react';
import "./chat.css";
import { Card } from 'antd';
import { Line } from '@ant-design/plots';
const Chatbot = () => {

  const months = [
    { thang: "2024-01", tongTien: 1000000 },
    { thang: "2024-02", tongTien: 1250000 },
    { thang: "2024-03", tongTien: 950000 },
    { thang: "2024-04", tongTien: 1400000 },
    { thang: "2024-05", tongTien: 1550000 },
    { thang: "2024-06", tongTien: 2100000 },
    { thang: "2024-07", tongTien: 1950000 },
    { thang: "2024-08", tongTien: 1750000 },
    { thang: "2024-09", tongTien: 1800000 },
    { thang: "2024-10", tongTien: 1750000 },
    { thang: "2024-11", tongTien: 2000000 },
    { thang: "2024-12", tongTien: 1700000 },
  ];
  const config = {
    data: months,
    xField: "thang",
    yField: "tongTien"
  }

  return (
    <Card title="basic">
      <Line {...config} />
    </Card>
  );
};

export default Chatbot; 