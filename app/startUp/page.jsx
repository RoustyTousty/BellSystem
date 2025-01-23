'use client'
import React, { useState, useEffect } from 'react';

const StartUp = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-10">Sveiki!</h1>

      <p className="text-2xl mb-10">
        Šodien: {currentDateTime.toLocaleDateString()}
      </p>

      <p className="text-2xl">
        Laiks: {currentDateTime.toLocaleTimeString()}
      </p>
      
    </div>
  );
};

export default StartUp;