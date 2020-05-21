import React from "react";
import classNames from "classnames";
import "components/Button.scss";

//Props: confirm(true), danger(true), disabled(true), onClick(fn) 
export default function Button(props) {
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   })

   return <button 
      className={buttonClass} 
      onClick={props.onClick} 
      disabled={props.disabled}
   >
   {/* props.children used to specify button text */}
      {props.children} 
   </button>;
}
