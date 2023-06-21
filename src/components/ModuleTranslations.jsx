import React, { useState, useEffect, useRef } from "react";
import he from "he";

const owner = "vtex-apps";
async function asyncMap(array, asyncCallback) {
  const results = [];

  await Promise.all(
    array.map(async (item) => {
      const result = await asyncCallback(item);
      results.push(result);
    })
  );

  return results;
}

const ModuleTranslations = ({ data, token }) => {
  const repoName = data.moduleName;

  const [fetchedTranslations, setFetchedTranslations] = useState([]);

  const tableRef = useRef(null);

  const copyTableToClipboard = () => {
    const table = tableRef.current;

    // Create a range object
    const range = document.createRange();
    range.selectNode(table);

    // Select the range
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    Document.execCommand("copy");

    window.getSelection().removeAllRanges();
  };

  useEffect(() => {
    asyncMap(data.languages, async (language) => {
      const response = await fetch(
        `https://api.github.com/search/code?q=repo:${owner}/${repoName}+filename:${language.trim()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    })
      .then((results) => {
        asyncMap(results, async (result) => {
          const filePath = result.items[0].path;
          if (!filePath) return <h2>{result.message}</h2>;

          const response = await fetch(
            `https://api.github.com/repos/${owner}/${repoName}/contents/${filePath}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const contentData = await response.json();
          const content = JSON.parse(atob(contentData.content));
          return setFetchedTranslations((prev) => [...prev, content]);
        }).catch((error) => {
          console.error("Error:", error);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function compareStrings(strings) {
    //   const objects = strings.map((string) => JSON.parse(string));
    const properties = Object.keys(strings[0]);

    let result = [];

    properties.forEach((prop) => {
      const values = strings.map((obj) => obj[prop]);
      result.push(values);
    });

    return result;
  }

  if (!fetchedTranslations.length) return;
  const translations = compareStrings(fetchedTranslations);
  console.log(
    "🚀 ~ file: ModuleTranslations.jsx:108 ~ ModuleTranslations ~ translations:",
    translations
  );

  console.log(
    "🚀 ~ file: ModuleTranslations.jsx:152 ~ ModuleTranslations ~ fetchedTranslations:",
    fetchedTranslations
  );

  //   const sortedStrings = compareStrings(fetchedTranslations);
  //   console.log(
  //     "🚀 ~ file: ModuleTranslations.jsx:93 ~ ModuleTranslations ~ sortedStrings:",
  //     sortedStrings
  //   );

  return (
    <div>
      <button onClick={copyTableToClipboard}>Copy Table</button>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>25</td>
            <td>New York</td>
          </tr>
          <tr>
            <td>Jane</td>
            <td>30</td>
            <td>Los Angeles</td>
          </tr>
          <tr>
            <td>Mike</td>
            <td>35</td>
            <td>Chicago</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ModuleTranslations;
