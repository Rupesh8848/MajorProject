import React from "react";
export const modalContext = React.createContext({
  modalState: null,
  setModalState: () => {},
});

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = React.useState("hide");

  return (
    <modalContext.Provider value={{ modalState, setModalState }}>
      {children}
    </modalContext.Provider>
  );
};
