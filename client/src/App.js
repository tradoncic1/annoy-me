import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [comment, setComment] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!comment) alert("Must write something");
    else {
      fetch("http://141.170.204.254:6969/sendComment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comment }),
      })
        .then((res) => setComment(""))
        .catch((e) => alert("Mission failed"));
    }
  };

  const onChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Write something nice</h2>
        <form className="form" onSubmit={onSubmit}>
          <div className="comment-wrap">
            <textarea
              rows="5"
              onChange={onChange}
              value={comment}
              maxLength={250}
            ></textarea>
            <div>{comment.length}/250</div>
          </div>
          <input type="submit" value="Send" />
        </form>
      </header>
    </div>
  );
};

export default App;
