import "./styles.scss";

import { useState, useRef, useEffect } from "react";
import deepai from "deepai";
import APIKEY from "../config";

export default function App() {
  const textRef = useRef();
  const [resImage, setResImage] = useState("");
  const [error, setError] = useState("");
  const [sucess, setsucess] = useState("");

  useEffect(() => {
    deepai.setApiKey(APIKEY.KEY);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const text = textRef.current.value;

    if (text) {
      deepai
        .callStandardApi("text2img", {
          text
        })
        .then((res) => {
          setResImage(res.output_url);
          setsucess("Here's your image 🥳");
          setError("");
        })
        .catch((err) => {
          setError("Failed to get image");
          setsucess("");
        });
    } else {
      setError("Please enter some text");
      setsucess("");
    }
  };

  return (
    <div className="App">
      <div className="content">
        <h1>Seku Search</h1>
        <form onSubmit={onSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Input your text here"
            ref={textRef}
          />
          <button type="submit">Get Image</button>
        </form>
        <span className="white">{sucess}</span>
        <span className="red">{error}</span>
        {resImage ? (
          <img src={resImage} alt="generated" />
        ) : (
          <span>No image caught</span>
        )}
      </div>
    </div>
  );
}
