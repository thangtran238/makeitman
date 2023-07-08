import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Pops from "../pages/homepage/UI/receiver/Pops";

export default function Message({ id }) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/orders/${id}`)
      .then((res) => {
        const data = res.data;
        setMessages(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <i className="fa-solid fa-bell"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {error ? (
          <p>Error: {error}</p>
        ) : messages.length > 0 ? (
          messages.map((message) => (
            <Dropdown.Item key={message.id}>
              <Pops
                message={message}
              />
            </Dropdown.Item>
          ))
        ) : (
          <p>There aren't any notifications yet.</p>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
