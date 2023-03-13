import React , { useState } from "react";
import { faqs } from "../FAQ/data";
import AccordionItem from "../FAQ/AccordionItem";

const Accordion = ({data}) => {
  const [clicked, setClicked] = useState("1");

  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked("0");
    }
    setClicked(index);
  };

  return (
    <ul className="accordion">
      {data.map((faq, index) => (
        <AccordionItem
          onToggle={() => handleToggle(index)}
          active={clicked === index}
          key={index}
          faq={faq}
          index = {index + 1}
        />
      ))}
    </ul>
  );
};

export default Accordion;
