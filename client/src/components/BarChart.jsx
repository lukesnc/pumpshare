import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const BarChartComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/exercises')
            .then(response => {
                const formattedData = response.data.map(item => ({
                    name: item.name,
                    sets: parseInt(item.sets), // Make sure sets and reps are integers
                    reps: parseInt(item.reps),
                    weight: parseInt(item.weight) // Parsing the weight to ensure it's a number
                }));
                setData(formattedData);
            })
            .catch(error => {
                console.error('Error fetching exercise data:', error);
            });
    }, []);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sets" fill="#8884d8" name="Sets" />
                <Bar dataKey="reps" fill="#82ca9d" name="Reps" />
                <Bar dataKey="weight" fill="#ffc658" name="Weight (lbs)" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;
