import React from "react";
import {
    RadarChart,
    Radar,
    PolarAngleAxis,
    PolarRadiusAxis,
    PolarGrid,
    ResponsiveContainer,
} from "recharts";

function PerformanceRadarChart() {

    const data = [
        {
            habit: "Food",
            A: 120,
            // fullMark: 150,
        },
        {
            habit: "Sleep",
            A: 50,
            // fullMark: 60,
        },
        {
            habit: "DSA",
            A: 140,
            // fullMark: 150,
        },
    ];

    return (
        <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="habit" />
                    <PolarRadiusAxis />
                    <Radar
                        name="Mike"
                        dataKey="A"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PerformanceRadarChart;
