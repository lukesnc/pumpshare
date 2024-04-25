'use client';
import {AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import { DefaultTooltipContent } from "recharts";

const data = [
    { name: "Exercise 1", value: 20000000, value2: 30000000 },
    { name: "Exercise 2", value: 15000000, value2: 50000000 },
    { name: "Exercise 3", value: 10000000, value2: 40000000 },
    { name: "Exercise 4", value: 125000000, value2: 20000000}
];

const AreaChartComponent = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={500} height={400} data ={data}>
          <YAxis />
          <XAxis dataKey="name"/>
          <CartesianGrid />
          <Tooltip />
          <Legend />
          <Area dataKey="value"></Area>
          <Area dataKey="value2"></Area>
        </AreaChart>
        </ResponsiveContainer>
        
    )
};

export default AreaChartComponent;