import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = () => {
  const [holidays, setHolidays] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://date.nager.at/api/v3/publicholidays/2024/BA"
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setHolidays(data);
        console.log(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Public holidays in Bosnia and Herzegovina</h1>
      {holidays ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Local Name</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday, index) => (
              <tr key={index}>
                <td>{holiday.date}</td>
                <td>{holiday.localName}</td>
                <td>{holiday.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
