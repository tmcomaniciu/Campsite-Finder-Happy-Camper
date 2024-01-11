import React, { useState, useEffect } from "react";
import "../Night.css"; // Import your CSS file

const Night = () => {
  const [isEvening, setIsEvening] = useState(false);

  useEffect(() => {
    const updateStylesBasedOnTime = () => {
      const now = new Date();
      const currentHour = now.getHours();

      // Change styles at 6:00 PM (18:00)
      setIsEvening(currentHour >= 18);
      //console.log(currentHour);
      //console.log(isEvening);
    };

    const intervalId = setInterval(updateStylesBasedOnTime, 1000 * 60); // Check every minute

    // Initial check
    updateStylesBasedOnTime();

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return <div className={`${isEvening ? "evening" : "app-container"}`}></div>;
};

export default Night;
