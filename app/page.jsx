"use client";
import React, { useState, useEffect } from "react";

const StartUp = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [greeting, setGreeting] = useState("Labrīt!"); // Default greeting

  useEffect(() => {
    const interval = setInterval(() => {
      const newDateTime = new Date();
      setCurrentDateTime(newDateTime);
      updateGreeting(newDateTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateGreeting = (date) => {
    const hours = date.getHours();
    if (hours >= 4 && hours < 12) {
      setGreeting("Labrīt!"); // 4:01 AM - 12:00 PM
    } else if (hours >= 12 && hours < 16) {
      setGreeting("Labdien!"); // 12:01 PM - 4:00 PM
    } else {
      setGreeting("Labvakar!"); // 4:01 PM - 4:00 AM
    }
  };

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
      <h1 className="text-4xl font-bold mb-10">{greeting}</h1>

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
