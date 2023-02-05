import React from "react";
export const loaderContext = React.createContext({
  loaderState: null,
  setLoaderState: () => {},
});

export const LoaderProvider = ({ children }) => {
  const [loaderState, setLoaderState] = React.useState(false);

  return (
    <loaderContext.Provider value={{ loaderState, setLoaderState }}>
      {children}
    </loaderContext.Provider>
  );
};
