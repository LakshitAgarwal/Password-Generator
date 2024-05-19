import "./App.css";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

function App() {
  const [length, setLength] = useState(7);
  const [includeNum, setIncludeNum] = useState(false);
  const [includeSpecChar, setIncludeSpecChar] = useState(false);
  const [password, setPassword] = useState("");

  const genPass = useCallback(() => {
    let generatedPassword = "";
    let allStr = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    let allNum = "1234567890";
    let allSpecChar = "!@#$%^&*()~`";
    if (includeNum) {
      allStr += allNum;
    }
    if (includeSpecChar) {
      allStr += allSpecChar;
    }
    for (let index = 0; index < length; index++) {
      let charNum = Math.floor(Math.random() * allStr.length + 1);
      generatedPassword += allStr.charAt(charNum);
    }
    setPassword(generatedPassword);
  }, [length, includeNum, includeSpecChar]);

  useEffect(() => {
    genPass();
  }, [length, includeNum, includeSpecChar]);

  return (
    <div className="container">
      <h1 className="title">Password Generator</h1>
      <input
        className="field"
        placeholder="Password"
        type="text"
        value={password}
        readOnly
      />
      <input
        value={length}
        className="passRange"
        min={7}
        max={50}
        type="range"
        onChange={(e) => {
          setLength(e.target.value);
        }}
      />
      <label htmlFor="passwordLength">Length :{length}</label>
      <div className="checkbox-label-1">
        <input
          className="isNum"
          type="checkbox"
          id="numbers"
          defaultChecked={includeNum}
          onChange={() => {
            setIncludeNum((prevState) => !prevState);
          }}
        />
        <label htmlFor="numbers">Numbers</label>
      </div>
      <div className="checkbox-label-2">
        <input
          className="isSpecChar"
          type="checkbox"
          defaultChecked={includeSpecChar}
          id="specialChars"
          onChange={() => {
            setIncludeSpecChar((prevState) => !prevState);
          }}
        />
        <label htmlFor="specialChars">Special Characters</label>
      </div>
    </div>
  );
}

export default App;
