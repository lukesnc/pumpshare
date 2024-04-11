'use client';
import {BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


const data = [
    { name: "Exercise 1", value: 20000000, value2: 30000000 },
    { name: "Exercise 2", value: 15000000, value2: 50000000 },
    { name: "Exercise 3", value: 10000000, value2: 40000000 },
    { name: "Exercise 4", value: 125000000, value2: 20000000}
];

const BarChartComponent = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={400} data ={data}>
        <YAxis />
          <XAxis dataKey="name"/>
          <CartesianGrid />
          <Tooltip />
          <Legend />
          <Bar dataKey="value"></Bar>
          <Bar dataKey="value2"></Bar>
        </BarChart>
        </ResponsiveContainer>
        
    )
};

export default BarChartComponent;