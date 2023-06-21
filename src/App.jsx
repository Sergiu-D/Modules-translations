import { useState, useEffect } from "react";
// Components
import LanguageInput from "./components/LanguageInput";
import TokenInput from "./components/TokenInput";
import Results from "./components/Results";
// import StyledTextarea from "./components/StyledTextarea";
// Styles
import "./App.css";

// Material UI
// import FormControl from "@mui/base/FormControl";
import TextareaAutosize from "@mui/base/TextareaAutosize";

// Save to local storage
function saveToLocalStorage(object, inputName) {
  const json = JSON.stringify(object);
  localStorage.setItem(inputName, json);
}

function App() {
  // const [count, setCount] = useState(0);
  const [token, setToken] = useState("");
  console.log("🚀 ~ file: App.jsx:23 ~ App ~ token:", token);
  const [languages, setLanguages] = useState("");
  const [textAreaInput, setTextAreaInput] = useState("");
  const [isSubbmited, setIsSubmitted] = useState(false);
  const [modulesObject, setModulesObject] = useState([]);
  const [fetchingData, setFetchingData] = useState([]);

  console.log("🚀 ~ file: App.jsx:24 ~ App ~ languages:", languages);
  useEffect(() => {
    if (localStorage.getItem("gitHubToken") !== null)
      setToken(JSON.parse(localStorage.getItem("gitHubToken")));
    if (localStorage.getItem("languages") !== null)
      setLanguages(JSON.parse(localStorage.getItem("languages")));
    if (localStorage.getItem("modules") !== null)
      setTextAreaInput(JSON.parse(localStorage.getItem("modules")));
  }, []);

  const handleTokenChange = (input) => {
    const value = input.target.value;
    saveToLocalStorage(value, "gitHubToken");
    setToken(value);
  };
  const handleLanguagesChange = (input) => {
    const value = input.target.value;
    saveToLocalStorage(value, "languages");
    setLanguages(value);
  };

  const handleTextAreaChange = (input) => {
    const value = input.target.value;
    saveToLocalStorage(value, "modules");
    setTextAreaInput(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const arrTextAreaInput = textAreaInput.split(",");

    const modules = arrTextAreaInput.map((module) => module.split(":")[0]);
    const modulesNames = modules.map((module) => module.split(".")[1]);
    const modulesNamesFinal = modulesNames.map((str) => str.replace(/"/g, ""));

    const arrLanguages = languages.split(",");
    const languagesArray = arrLanguages.map((language) => `${language}.json`);

    const fetchingDataObject = modulesNamesFinal.map((module) => {
      return { moduleName: module, languages: languagesArray };
    });
    setFetchingData(fetchingDataObject);

    setIsSubmitted(true);
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TokenInput value={token} handleChange={handleTokenChange} />
        <LanguageInput value={languages} handleChange={handleLanguagesChange} />
        <TextareaAutosize
          aria-label="minimum height"
          minRows={40}
          maxRows={80}
          placeholder="Enter modules..."
          value={textAreaInput}
          onChange={handleTextAreaChange}
        />
        <button>Submit</button>
      </form>
      {isSubbmited && <Results data={fetchingData} token={token} />}
    </>
  );
}

export default App;
