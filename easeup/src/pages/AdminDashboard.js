import {
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
  Card,
  HStack,
  useRadioGroup,
  RadioGroup,
  Stack,
  Radio,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Collapse, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { AiFillEdit } from "react-icons/ai";
import "./admin.css";
import {
  FaUserTie,
  FaUserEdit,
  FaUserCircle,
  FaCashRegister,
  FaRegListAlt,
  FaUserClock,
} from "react-icons/fa";
import Chart from "./Chart/Chart";
import "./admin.css";
import { UserData } from "./Data2";
import { RevenueData } from "./Revenuedata";

const AdminDashboard = () => {
  const [item, setItem] = useState("");
  const [totalIntern, setTotalIntern] = useState("");
  const [totalRevenue, setTotalRevenue] = useState("");
  const [monthRevenue, setmonthRevenue] = useState("");
  const [totalAmountPaid, setTotalAmountPaid] = useState("");
  const [value, setValue] = React.useState("February");
  const [FilterData, setFilterData] = useState([]);
  const [updateprice, setUpdatePrie] = useState("");
  const [email, setEmail] = useState("");
  const [emailamt, setEmailamt] = useState("");
  const [money, setMoney] = useState("0");
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [amountpaid, setAmountpaid] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    setEmailamt(e);
  };

  const updatePrice = async () => {
    // e.preventDefault();
    try {
      const res = await axios.put(`/api/user/price/${email}`, { price: price });
      // console.log("user", user);
      console.log("price", price);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  // console.log(money);
  useEffect(() => {
    updatePrice();
  }, []);

  const updateAmountstatus = async () => {
    try {
      const res = await axios.put(`/api/user/updateAmountPaid/${emailamt}`, {
        IsAmountpaid: amountpaid,
      });

      console.log("IsAmountpaid", amountpaid);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    updateAmountstatus();
  }, []);
  console.log(amountpaid);
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // console.log(value);
  const fetchItem = async () => {
    const response = await fetch("/api/user/totalClientsnumber");
    const data = await response.json();
    setItem(data);
    console.log("data", data);
  };
  const fetchIntern = async () => {
    const response = await fetch("/api/user/totalintern");
    const data = await response.json();
    setTotalIntern(data);
    console.log("data", data);
  };
  const fetchTotalRevenue = async () => {
    const response = await fetch("/api/user/totalrevenue");
    const data = await response.json();
    setTotalRevenue(data);
  };
  const fetchTotalAmtPaid = async () => {
    const response = await fetch("/api/user/amount/totalamountpaidclients");
    const data = await response.json();
    setTotalAmountPaid(data);
  };
  const fetchMonthRevenue = async () => {
    const response = await fetch(`/api/user/${value}`);
    const data = await response.json();
    setmonthRevenue(data);
  };

  console.log(email);

  const getapi = async (url) => {
    try {
      const res = await axios.get(url);
      setFilterData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getapi("/api/user/onlyuser");
  }, [FilterData]);

  useEffect(() => {
    // const fun = email;
    fetchItem();
    fetchIntern();
    fetchTotalRevenue();
    fetchTotalAmtPaid();
  }, []);
  useEffect(() => {
    fetchMonthRevenue();
  }, [value]);
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.month),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroudColor: ["red"],
      },
    ],
  });
  const [revenuedata, setrevenuedata] = useState({
    labels: RevenueData.map((data) => data.month),
    datasets: [
      {
        label: "Revenue Generated",
        data: RevenueData.map((data) => data.revenueGain),
        backgroudColor: ["red"],
      },
    ],
  });
  return (
    <>
      {/* <SimpleGrid
        spacing={6}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        style={{ marginLeft: "5rem", marginTop: "3rem", marginRight: "5rem" }}
      >
        <Card>
          <CardHeader>
            <Heading size="md"> Total Clients</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.{item}
            </Text>
          </CardBody>
          <CardFooter>
            <Button>{item}</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md">Total Interns</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>{totalIntern}</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Total Amount paid clients</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>{totalAmountPaid}</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Total Revenue</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>{totalRevenue}</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Amount Pending Clients</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>{Number(item) - Number(totalAmountPaid)}</Button>
          </CardFooter>
        </Card>
      </SimpleGrid> */}
      <div className="admin-mainContainer">
        <div className="admin-mainHead-div">
          <div className="admin-mainHead">Admin Portal</div>
        </div>
        <div className="admin-subContainer">
          <div className="admin-graphContainer">
            <Chart chartData={userData} />
            <Chart chartData={revenuedata} />
          </div>
          <div className="admin-cardsContainer">
            <div className="admin-card">
              <div className="admin-card-icon-background">
                <div className="admin-card-icon">
                  <FaUserTie />
                </div>
              </div>
              <div className="admin-card-number">{item}</div>
              <div className="admin-card-head">Client</div>
            </div>
            <div className="admin-card admincard-2">
              <div className="admin-card-icon-background">
                <div className="admin-card-icon icon2">
                  <FaUserEdit />
                </div>
              </div>
              <div className="admin-card-number">{totalIntern}</div>
              <div className="admin-card-head">Interns</div>
            </div>
            <div className="admin-card admincard-3">
              <div className="admin-card-icon-background icon3-back">
                <div className="admin-card-icon icon3">
                  <FaCashRegister />
                </div>
              </div>
              <div className="admin-card-number">₹ {totalRevenue}</div>
              <div className="admin-card-head">Total Revenue</div>
            </div>
            <div className="admin-card admincard-4">
              <div className="admin-card-icon-background icon4-back">
                <div className="admin-card-icon icon4">
                  <FaRegListAlt />
                </div>
              </div>
              <div className="admin-card-number">63</div>
              <div className="admin-card-head">Pending Work</div>
            </div>
            <div className="admin-card admincard-5">
              <div className="admin-card-icon-background icon4-back">
                <div className="admin-card-icon icon4">
                  <FaUserClock />
                </div>
              </div>
              <div className="admin-card-number">
                {Number(item) - Number(totalAmountPaid)}
              </div>
              <div className="admin-card-head">Pending Amount Cients</div>
            </div>
            <div className="admin-card admincard-6">
              <div className="admin-card-icon-background icon4-back">
                <div className="admin-card-icon icon4">
                  <FaUserClock />
                </div>
              </div>
              <div className="admin-card-number">{totalAmountPaid}</div>
              <div className="admin-card-head">Total amount Paid clients</div>
            </div>
          </div>
        </div>
      </div>
      <RadioGroup
        onChange={setValue}
        value={value}
        style={{ marginLeft: "5rem", marginTop: "3rem", marginRight: "5rem" }}
      >
        <Stack direction="row">
          {monthNames.map((data) => {
            return (
              <>
                <Radio value={data}>{data}</Radio>
              </>
            );
          })}
        </Stack>
        <br />
        Revenue: {monthRevenue}
      </RadioGroup>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Price</th>
            <th>Update Price</th>
            <th>Is Amount Paid</th>
            {/* <th>Age</th> */}
            {/* <th>City</th>
          <th>Marks in 10th</th>
          <th>Marks in 12th</th>
          <th>Marks in Bachelor</th> */}
            {/* <th>Area of Specialization</th> */}
            {/* <th>Internship Experience</th>
          <th>Social Service Experience</th>
          <th>Extra Curriculam</th>
          <th>Other Relevant Information</th>
          <th>Funding Procedure</th>
          <th>Career Goal</th>
          <th>Family Background</th>
          <th>Anthing Else (Relevant)</th>
          <th>Consultancy applied</th>
          <th>Coupon Code</th>
          <th>Country</th>
          <th>Format File</th>
          <th>Resume</th>
          <th>Phone Number</th>
          <th>Heard About us</th> */}
            <th>Selected Additional Services</th>
            {/* <th>More Details</th>
            <th>Seleted</th> */}
          </tr>
        </thead>
        <tbody>
          <>
            {FilterData.map((data) => {
              const {
                id,
                name,
                email,
                password,
                college,
                course,
                age,
                work,
                city,
                tenth,
                twelth,
                bachelor,
                specialization,
                internship,
                social,
                extra,
                other,
                fund,
                careergoal,
                familybg,
                anythingelse,
                consultancy,
                coupon,
                country,
                phone,
                hear,
                selectedValues,
                status,
                file,
                resume,
                price,
                IsAmountpaid,
              } = data;
              return (
                <>
                  <tr key={data}>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.price}</td>
                    <td>
                      {/* <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={() => setEmail(data.email)}
                      >
                        Update Price
                      </Button> */}
                      {/* <Button
                        variant="warning"
                        onClick={(e) => handleShow(data.email)}
                        style={{ height: "2rem", fontSize: "13px" }}
                      >
                        Update Price
                      </Button> */}

                      <Accordion
                        defaultActiveKey="0"
                        onClick={() => setEmail(data.email)}
                        style={{ width: "15rem" }}
                      >
                        <Accordion.Item>
                          <Accordion.Header>
                            <Button
                              variant="warning"
                              style={{ fontSize: "14px" }}
                            >
                              Update Price
                            </Button>
                          </Accordion.Header>
                          <Accordion.Body>
                            <Input
                              placeholder="Enter the price"
                              onChange={(e) => setPrice(e.target.value)}
                            ></Input>
                            <Button variant="primary" onClick={updatePrice}>
                              Save Changes
                            </Button>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>

                      {/* <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Update the Price </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                       
                          <Input
                            placeholder="Enter the price"
                            onChange={(e) => setPrice(e.target.value)}
                          ></Input>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="primary" onClick={updatePrice}>
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal> */}
                      {/* <Button onClick={updatePrice}>Done</Button> */}
                    </td>
                    <td>
                      {data.IsAmountpaid ? (
                        <>
                          <Button
                            variant="success"
                            style={{ height: "2rem", fontSize: "13px" }}
                          >
                            Paid
                          </Button>
                          {/* <Button
                            variant="warning"
                            onClick={(e) => handleShow(data.email)}
                            style={{ height: "2rem", fontSize: "13px" }}
                          >
                            Edit
                          </Button> */}
                          {/* <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Amount payment updation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                         

                              <p>
                                Choose YES if the client has paid amount OR
                                choose NO if the client has NOT paid the amount
                                :{" "}
                              </p>
                              <br></br>
                              <Form>
                                <Form.Check
                                  inline
                                  label="YES"
                                  name="group1"
                                  type="radio"
                                  value="true"
                                  onChange={(e) => setAmountpaid(true)}
                                  id={`inline-radio-1`}
                                />
                                <Form.Check
                                  inline
                                  label="NO"
                                  name="group1"
                                  type="radio"
                                  value="false"
                                  onChange={(e) => setAmountpaid(false)}
                                  id={`inline-radio-2`}
                                />
                              </Form>

                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button
                                variant="primary"
                                onClick={updateAmountstatus}
                              >
                                Save Changes
                              </Button>
                            </Modal.Footer>
                          </Modal> */}
                          {/* <Button onClick={updatePrice}>Done</Button> */}
                        </>
                      ) : (
                        <>
                          {" "}
                          <Button
                            variant="danger"
                            style={{ height: "2rem", fontSize: "13px" }}
                          >
                            Unpaid
                          </Button>
                          <Button
                            variant="warning"
                            onClick={(e) => handleShow(data.email)}
                            style={{ height: "2rem", fontSize: "13px" }}
                          >
                            <AiFillEdit />
                          </Button>
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Amount payment updation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              {/* <Input
                                  placeholder="Enter the price"
                                  onChange={(e) => setPrice(e.target.value)}
                                ></Input> */}

                              <p>
                                Choose YES if the client has paid amount OR
                                choose NO if the client has NOT paid the amount
                                :{" "}
                              </p>
                              <br></br>
                              <Form>
                                <Form.Check
                                  inline
                                  label="YES"
                                  name="group1"
                                  type="radio"
                                  value="true"
                                  onChange={(e) => setAmountpaid(true)}
                                  id={`inline-radio-1`}
                                />
                                <Form.Check
                                  inline
                                  label="NO"
                                  name="group1"
                                  type="radio"
                                  value="false"
                                  onChange={(e) => setAmountpaid(false)}
                                  id={`inline-radio-2`}
                                />
                              </Form>

                              {/* <Button onClick={updatePrice}>Done</Button> */}
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button
                                variant="primary"
                                onClick={updateAmountstatus}
                              >
                                Save Changes
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </>
                      )}
                      {data.IsAmountpaid}
                    </td>

                    <td>{data.selectedValues}</td>
                  </tr>
                </>
              );
            })}
          </>
          {/* </tr> */}
        </tbody>
      </Table>
    </>
  );
};

export default AdminDashboard;
