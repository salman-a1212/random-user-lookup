import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [option, setOption] = useState("");
  const [records, setRecords] = useState("");
  const [nat, setNat] = useState("");

  const getRandomUser = async () => {
    const response = await axios.get(
      `https://randomuser.me/api/?results=${records}&gender=${option}&nat=${nat}`
    );
    setUsers(response.data.results);
    console.log(response.data.results);
  };

  useEffect(() => {
    getLocalUsers();
  }, []);

  useEffect(() => {
    saveUsers();
  }, [users]);

  const selectHandler = (e) => {
    setOption(e.target.value);
  };

  const showData = () => {
    getRandomUser();
  };

  const selectRecords = (e) => {
    setRecords(e.target.value);
  };

  const selectNat = (e) => {
    setNat(e.target.value);
  };

  const saveUsers = () => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const getLocalUsers = () => {
    if (localStorage.getItem("users") === null) {
      localStorage.setItem("users", JSON.stringify([]));
    } else {
      let usersLocal = JSON.parse(localStorage.getItem("users"));
      console.log(usersLocal);
      setUsers(usersLocal);
    }
  };

  return (
    <>
      <div className='App' style={{ margin: "25px" }}>
        <h2 style={{ margin: "10px" }}>Search Random Users</h2>
        <select name='gender' id='gender' onChange={selectHandler}>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value=''>Both</option>
        </select>
        <select name='records' id='records' onChange={selectRecords}>
          <option value='5'>5</option>
          <option value='25'>25</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
          <option value='150'>150</option>
          <option value='200'>200</option>
        </select>
        <select name='nat' id='nat' onChange={selectNat}>
          <option value=''>All</option>
          <option value='AU'>AU</option>
          <option value='BR'>BR</option>
          <option value='CA'>CA</option>
          <option value='CH'>CH</option>
          <option value='DE'>DE</option>
          <option value='DK'>DK</option>
          <option value='ES'>ES</option>
          <option value='FI'>FI</option>
          <option value='FR'>FR</option>
          <option value='GB'>GB</option>
          <option value='IE'>IE</option>
          <option value='IR'>IR</option>
          <option value='NO'>NO</option>
          <option value='NL'>NL</option>
          <option value='NZ'>NZ</option>
          <option value='TR'>TR</option>
          <option value='US'>US</option>
        </select>
        <button
          style={{
            padding: "5px",
            borderRadius: "5px",
            background: "#111",
            color: "#fff",
          }}
          onClick={showData}
        >
          Search
        </button>
      </div>
      <div
        className='App'
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto",
          gridGap: "10px",
          padding: "10px",
        }}
      >
        {users.map((user, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <p>{`${user.name.title} ${user.name.first} ${user.name.last}`}</p>
            <br />
            <p>{user.email}</p>
            <br />
            <p>
              {user.dob.date.substring(0, 10).split("-").reverse().join("-")}
            </p>
            <br />
            <p>{user.dob.age}</p>
            <br />
            {`${user.location.city}, ${user.location.country}`}
            <br />
            <br />
            <button
              style={{
                padding: "5px",
                fontSize: "1rem",
                background: "#111",
                borderRadius: "5px",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <span>
                <i className='fa-light fa-phone'></i>
              </span>
              <span> {user.cell}</span>
            </button>
            <br />
            <br />
            <img
              src={user.picture.medium}
              alt='thumbnail'
              style={{ borderRadius: "50%" }}
            ></img>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
