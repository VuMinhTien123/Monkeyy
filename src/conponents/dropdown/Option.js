import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
  const { setShow } = useDropdown();
  const { onClick } = props;

  const handlClick = () => {
    onClick && onClick();
    setShow(false)
  }
  return (
    <div
      className="px-5 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-100"
      onClick={handlClick}
    >
      {props.children}
    </div>
  );
};

export default Option;