import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [value, setValue] = useState("random person");
  const [title, setTitle] = useState("name");

  const getPerson = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const person = data.results[0];
      const { phone, email, gender } = person;
      const { title, first, last } = person.name;
      const { large } = person.picture;
      const { age } = person.dob;
      const { city, state, country } = person.location;

      const newPerson = {
        phone,
        email,
        gender,
        name: `${title} ${first} ${last}`,
        image: large,
        age,
        address: `${city} ${state} ${country}`,
      };
      // console.log(data.results[0]);
      setPerson(newPerson);
      setLoading(false);
      setTitle("name");
      setValue(newPerson.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPerson();
  }, []);

  const handleValue = (value) => {
    if (value.target.classList.contains("icon")) {
      const newData = value.target.dataset.mazi;
      console.log(newData);
      setTitle(newData);
      setValue(person[newData]);
    }
  };

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button className="icon" data-mazi="name" onMouseOver={handleValue}>
              <FaUser />
            </button>
            <button
              className="icon"
              data-mazi="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-mazi="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-mazi="address"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-mazi="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-mazi="gender"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={getPerson}>
            {loading ? "loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
