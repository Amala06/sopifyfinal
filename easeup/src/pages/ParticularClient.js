import React, { useEffect, useState } from "react";
import { Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { calcLength, wrap } from "framer-motion";
import { Button, Card } from "react-bootstrap";

const ParticularClient = () => {
  const [emails, setEmail] = useState("");
  const [internItem, setInternItem] = useState("");
  const [particularData, setParticularData] = useState([]);
  const Toast = useToast();

  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);

  const [item, setItem] = useState(null);
  const [clientEmail, setClientEmail] = useState("");

  // const fetchItem = async () => {
  //   const response = await fetch(`/api/user/allclient/${email}`);
  //   const data = await response.json();
  //   setItem(data);
  //   console.log("data", data);
  // };

  const FetchInternClientarray = async () => {
    setEmail(userInfo.email);
    try {
      const res = await axios.get(`/api/user/singleIntern/${emails}`);
      setInternItem(res.data);
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };
  // FetchInternClientarray();
  console.log("j", clientEmail);

  const DeleteClientarrayItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `/api/user/DeleteClientarraySingleEmail/${emails}`,
        { email: clientEmail }
      );
      console.log("delete", clientEmail);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // fetchItem();
    FetchInternClientarray();
    // DeleteClientarrayItem();
  }, []);
  // console.log(internItem);
  return (
    <>
      <p>Particluar Client list</p>
      <Button onClick={FetchInternClientarray}>ok</Button>
      {/* <br /> */}
      {internItem.name}
      <div
        style={{
          display: "flex",
          width: "86%",
          flexWrap: "wrap",
          gap: "3rem",
          marginLeft: "12%",
        }}
      >
        {internItem.myClientsArray?.map((data) => {
          return (
            <>
              <Card style={{ width: "18rem", display: "block" }}>
                <Card.Body>
                  <Card.Title>{data.email}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button onClick={() => setClientEmail(data.email)}>
                    View
                  </Button>
                  <Button variant="danger" onClick={DeleteClientarrayItem}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
      ;
    </>
  );
};

export default ParticularClient;
