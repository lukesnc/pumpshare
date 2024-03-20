import { features } from "../constants";
import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from 'recharts';



const Dashboard = () => {

    const data = [
        { name: "Exercise 1", value: 20000000 },
        { name: "Exercise 2", value: 15000000 },
        { name: "Exercise 3", value: 10000000 },
        { name: "Exercise 4", value: 5000000 }
    ];

    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        justifyContent: 'center', // horizontally center the items
        alignItems: 'center', // vertically center the items
    };
    
    const chartContainerStyle = {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
    };

    return (
        <div className='flex flex-col'>
            <div classname=''>
                <div className='flex flex-col mt-[5em]' style={chartContainerStyle}>
                    <h2>Pie Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className='flex flex-col' style={chartContainerStyle}>
                    <h2>Bar Chart</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 40,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" stackId="a" fill="#8884d8" />
                            <Bar dataKey="value" stackId="a" fill="#82ca9d" />
                            <Bar dataKey="value" fill="#ffc658" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
