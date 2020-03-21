import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

const colHeader = ["Artist", "Track Name", "Collection Name"];

function SearchScreen() {
  const [rows, setRows] = useState([]);

  function keyPress(text) {
    if (text.keyCode === 13) {
      let apiLink = encodeURI(
        `https://itunes.apple.com/search?term=${text.target.value}`
      );
      generatedRows(apiLink);
    }
  }

  function generatedHeader() {
    let res = [];
    let i = 0;
    for (i = 0; i < colHeader.length; i++) {
      res.push(<th id={colHeader[i]}>{colHeader[i]}</th>);
    }
    return res;
  }

  function generatedRows(apiLink) {
    axios.get(apiLink)
      .then(response => {
        return response.data;
      })
      .then(dataRec => {
        let data = dataRec.results
        console.log(data)
        let i = 0;
        let res = [];
        for (i = 0; i < data.length; i++) {
          res.push(
            <tr key={i}>
              <td key={uuidv4()}>{data[i].artistName}</td>
              <td key={uuidv4()}>{data[i].trackName}</td>
              <td key={uuidv4()}>{data[i].collectionName}</td>
            </tr>
          );
        }
        console.log(res);
        setRows(res);
      });
  }
  return (
    <div>
      <div>
        <div
          className="col-4"
          style={{ display: "inline-block", padding: "20px", height: "10vh" }}
        >
          <span>Search : </span><input type="text" onKeyDown={keyPress} />
        </div>
      </div>
      <div
        className="col-12"
        style={{ padding: "20px", height: "90vh", overflow: "auto" }}
      >
        <table className="table table-hover table-bordered">
          <thead>
            <tr>{generatedHeader()}</tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
}

export default SearchScreen;
