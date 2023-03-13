import React , { useRef } from "react";

const AccordionItem = ({ faq, active, onToggle, index }) => {
  const { question, description } = faq;

  const contentEl = useRef();

  return (
    <li className={`accordion_item ${active ? "active" : ""}`}>
      <button className="button" onClick={onToggle}>
        <div className="faq_main_title">
          <h2>Que. {index}</h2>
          <p>{question}</p>
        </div>
        <span className="control">{active ? "" : ""} </span>
      </button>
      <div
        ref={contentEl}
        className="answer_wrapper"
        style={
          active
            ? { height: contentEl.current.scrollHeight }
            : { height: "0px" }
        }
      >
        <div className="faq_main_conte">
           <div className="answer1">Answer :</div>
           <div className="answer">{description}</div>
        </div>
      </div>
    </li>
  );
};

export default AccordionItem;
