import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
//import Button from "react-bootstrap/Button";
//import Card from "react-bootstrap/Card";

function Camp() {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:8000/camps/${id}`;
      // console.log('url', url);
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      setData(data);
    };
    fetchData();
  }, [id]);

  const display = data && (
    <div>
      <h1>{data.name}</h1>
      <img src={`${data.imageURL}`} alt="" />
      <p>{data.description}</p>
      <p>Located at {}</p>
    </div>
    // <Card style={{ width: '18rem' }}>
    //     <Card.Img variant="top" src={`${data.imageURL}/500px500`} />
    //     <Card.Body>
    //         <Card.Title>{data.name}</Card.Title>
    //         <Card.Text>
    //             {data.description}
    //         </Card.Text>
    //         <Card.Body>{data.city}, {data.state}</Card.Body>
    //     </Card.Body>
    // </Card>
  );

  return <div>{display}</div>;
}

export default Camp;
