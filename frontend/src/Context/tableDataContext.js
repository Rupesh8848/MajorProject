import React from "react";
export const tableContext = React.createContext({
  tableState: [],
  settableState: () => {},
});

export const TableProvider = ({ children }) => {
  const [tableState, settableState] = React.useState([]);

  return (
    <tableContext.Provider value={{ tableState, settableState }}>
      {children}
    </tableContext.Provider>
  );
};
