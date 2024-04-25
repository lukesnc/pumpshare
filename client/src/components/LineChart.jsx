'use client';
import {LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


const data = [
    { name: "Exercise 1", value: 20000000 },
    { name: "Exercise 2", value: 15000000 },
    { name: "Exercise 3", value: 10000000 },
    { name: "Exercise 4", value: 5000000 }
];

const LineChartComponent = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={400} data ={data} margin={{right: 30 ,}}>
        <YAxis />
          <XAxis dataKey="name"/>
          <CartesianGrid />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="data" stroke='#3b82f6' />
          <Line type="monotone" dataKey="name" stroke='#3b82f6' />
          
        </LineChart>
        </ResponsiveContainer>
        
    )
};

export default LineChartComponent;