import React from "react";
export const sliderContext = React.createContext({
  sliderState: null,
  setSliderState: () => {},
});

export const SliderProvider = ({ children }) => {
  const [sliderState, setSliderState] = React.useState("public");

  return (
    <sliderContext.Provider value={{ sliderState, setSliderState }}>
      {children}
    </sliderContext.Provider>
  );
};
