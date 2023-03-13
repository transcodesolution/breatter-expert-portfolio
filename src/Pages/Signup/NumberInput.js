import React from "react";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Numberinput = ({ setValue }) => {
  return (
    <div>
      <PhoneInput
        country={"in"}
   
        value=""
        onChange={(phone) => {
          console.log(phone)
          setValue("phoneNumber", phone)}}
      />
    </div>
  );
};

export default Numberinput;
