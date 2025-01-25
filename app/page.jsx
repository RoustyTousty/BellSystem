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

  return (
    <div className="p-5 bg-neutral text-primary flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-10">Sveiki!</h1>

      <p className="text-2xl mb-5">
        Šodien:{" "}
        <span className="text-secondary font-medium">
          {currentDateTime.toLocaleDateString()}
        </span>
      </p>

      <p className="text-2xl">
        Laiks:{" "}
        <span className="text-secondary font-medium">
          {currentDateTime.toLocaleTimeString()}
        </span>
      </p>
    </div>
  );
};

export default StartUp;
