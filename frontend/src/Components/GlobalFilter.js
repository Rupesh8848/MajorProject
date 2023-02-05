import React from "react";
import { useAsyncDebounce } from "react-table";
import "./GlobalFilter.css";

export default function GlobalFilter({ filter, setFilter }) {
  const [value, setValue] = React.useState(filter);

  const changeHanlder = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 400);
  return (
    <span className="global-search-container">
      Search:
      <input
        className="global-search-bar"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          changeHanlder(e.target.value);
        }}
      />
    </span>
  );
}
