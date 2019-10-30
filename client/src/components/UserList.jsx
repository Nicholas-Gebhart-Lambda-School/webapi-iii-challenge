import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetch from "../services/fetch";

const UserCard = ({ name, id }) => {
  return (
    <Link to={`/${id}`} style={{ textDecoration: "none" }}>
      <div>
        <h2>View {name}'s Post History</h2>
      </div>
    </Link>
  );
};

export default () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch().then(res => {
      console.log(res);
      setData(res.data);
    });
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        textDecoration: "none",
        fontFamily: "sans-serif",
        width: "fit-content",
        margin: "0 auto"
      }}
    >
      {data.map(user => {
        return <UserCard key={user.id} name={user.name} id={user.id} />;
      })}
    </div>
  );
};
