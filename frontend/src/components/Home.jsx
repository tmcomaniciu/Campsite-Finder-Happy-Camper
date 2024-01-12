import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "../index.css";

function Camps() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:8000/camps`;
      // console.log('url', url)
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data)
      if (data.length) {
        setData(data);
      }
    };
    fetchData();
  }, []);

  const displayCamps = data.map((camp) => {
    return (
      <li key={camp._id}>
        <Card style={{ width: "18rem" }} className="mb-3">
          <Card.Img variant="top" src={`${camp.imageURL}/100px180`} />
          <Card.Body>
            <Card.Title>
              <Link to={`/camp/${camp._id}`}>{camp.name}</Link>
            </Card.Title>
            <Card.Body>
              {camp.city}, {camp.state}
            </Card.Body>
          </Card.Body>
        </Card>
      </li>
    );
  });

  return (
    <div className="center">
      <h2 className="h2">List of Camp sites</h2>
      <ul>{displayCamps}</ul>
    </div>
  );
}

export default Camps;
