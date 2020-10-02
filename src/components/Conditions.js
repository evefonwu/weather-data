import React from "react";
import { WiDaySunny, WiRain, WiDayCloudy } from "react-icons/wi";

function Conditions({ description }) {
  const condition = description.toLowerCase();
  if (condition.includes("clear")) {
    return <WiDaySunny size={50} />;
  } else if (condition.includes("rain")) {
    return <WiRain size={50} />;
  } else if (condition.includes("cloudy")) {
    return <WiDayCloudy size={50} />;
  }
  return <>{description}</>;
}

export default Conditions;
