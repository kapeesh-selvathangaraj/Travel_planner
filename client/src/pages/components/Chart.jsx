/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";
import { format } from "timeago.js";

export default function Chart({ data }) {
  const realData = data?.map((item) => ({
    price: item.totalPrice,
    date: format(item.createdAt),
  }));

  // Dynamically set bar colors based on price
  const getColor = (price) => {
    if (price < 50) return "#ff4d4d"; // Red for low prices
    if (price < 150) return "#ffa500"; // Orange for medium prices
    return "#32cd32"; // Green for high prices
  };

  return (
    <div className="w-full m-2 h-60">
      <h2 className="text-xl font-semibold">Bookings</h2>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart data={realData}>
          {/* Adding gridlines for better clarity */}
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* Custom Legend */}
          <Legend
            iconType="circle"
            iconSize={10}
            layout="horizontal"
            verticalAlign="top"
            align="center"
          />

          {/* Customized Tooltip */}
          <Tooltip
            content={(props) => (
              <div
                className="bg-gray-800 text-white py-2 px-4 rounded-md shadow-md"
                style={{ maxWidth: "200px", fontSize: "14px" }}
              >
                {props.payload?.map((item) => {
                  return (
                    <div key={item.payload.date}>
                      <p><strong>Price:</strong> ${item.value}</p>
                      <p><strong>Date:</strong> {item.payload.date}</p>
                    </div>
                  );
                })}
              </div>
            )}
          />

          {/* Y-axis with label */}
          <YAxis 
            dataKey={"price"} 
            label={{ value: "Price ($)", angle: -90, position: "insideLeft" }} 
          />

          {/* X-axis with label */}
          <XAxis 
            dataKey={"date"} 
            label={{ value: "Booking Date", position: "bottom" }}
            tick={{ fontSize: 12 }}
          />

          {/* Bar with dynamic color */}
          <Bar dataKey={"price"} radius={[10, 10, 0, 0]}>
            {realData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.price)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
