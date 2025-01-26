"use client";
import React, { useState, useEffect } from "react";

const StartUp = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? hours : 12; // Adjust zero hour to 12
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes}:${seconds < 10 ? "0" + seconds : seconds} ${ampm}`;
  };

  return (
    <div className="p-5 bg-neutral text-primary flex flex-col items-center pt-20 h-screen">
      <h1 className="text-4xl font-bold mb-10">Sveiki!</h1>

      <p className="text-2xl font-semibold mb-5">
        Šodien:{" "}
        <span className="text-secondary font-medium">
          {formatDate(currentDateTime)}
        </span>
      </p>

      <p className="text-2xl font-semibold">
        Laiks:{" "}
        <span className="text-secondary font-medium">
          {formatTime(currentDateTime)}
        </span>
      </p>
    </div>
  );
};

export default StartUp;
