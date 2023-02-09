import React from "react";
import { sliderContext } from "../Context/sliderContext";
import "./SliderSwitch.css";
export default function SliderSwitch() {
  const { sliderState, setSliderState } = React.useContext(sliderContext);

  function handleChange() {
    setSliderState((oldState) =>
      oldState === "public" ? "private" : "public"
    );
  }
  return (
    <>
      <div className="slider-container">
        <label>Mode: </label>
        <label className="toggle">
          <input
            type="checkbox"
            checked={sliderState == "private" ? true : false}
            onChange={handleChange}
          />
          <span className="slider"></span>
          <span className="labels" data-on="Private" data-off="Public"></span>
        </label>
      </div>
    </>
  );
}
