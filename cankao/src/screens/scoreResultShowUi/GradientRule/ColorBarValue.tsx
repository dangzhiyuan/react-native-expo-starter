import React from "react";
import GradientRule1 from "./GradientRule1";
import GradientRule2 from "./GradientRule2";
import GradientRule3 from "./GradientRule3";
import GradientRule4 from "./GradientRule4";
import GradientRule5 from "./GradientRule5";
import GradientRule6 from "./GradientRule6";
import GradientRule7 from "./GradientRule7";

const GradientComponents = {
  1: GradientRule1,
  2: GradientRule2,
  3: GradientRule3,
  4: GradientRule4,
  5: GradientRule5,
  6: GradientRule6,
  7: GradientRule7,
};

const ColorBarValue = ({ item }) => {
  const Component = GradientComponents[item.range_type];
  return Component ? <Component data={item} /> : null;
};

export default ColorBarValue;
