import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  HStack,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  Checkbox,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
const avatars = [
  {
    name: "Ryan Florence",
    url: "https://bit.ly/ryan-florence",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];

export default function RegisterListener() {
  const [email, setEmail] = React.useState("");
  //   const [show, setShow] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [nameOfUser, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [age, setAge] = React.useState("");
  const [city, setCity] = React.useState("");
  const [tenth, setTenth] = React.useState("");
  const [twelth, setTwelth] = React.useState("");
  const [bachelor, setBachelor] = React.useState("");
  const [specialization, setSpecialization] = React.useState("");
  const [college, setCollege] = React.useState("");
  const [course, setCourse] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [work, setWork] = React.useState("");
  const [intern, setIntern] = React.useState("");
  const [social, setsocial] = React.useState("");
  const [extra, setextra] = React.useState("");
  const [other, setother] = React.useState("");
  const [fund, setfund] = React.useState("");
  const [careergoal, setcareergoal] = React.useState("");
  const [familybg, setfamilybg] = React.useState("");
  const [anythingelse, setanythingelse] = React.useState("");
  const [consultancy, setconsultancy] = React.useState("");
  const [coupon, setcoupon] = React.useState("");

  const [hear, sethear] = React.useState("1");

  const [selectedValues, setSelectedValues] = React.useState([]);
  const [file, setFile] = React.useState(null);
  const [resume, setResume] = React.useState(null);

  const handleChange = (event) => {
    event.preventDefault();
    const { value, checked } = event.target;
    if (checked) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleResumeChange = (event) => {
    setResume(event.target.files[0]);
  };
  console.log(file);

  const handleUpload = async () => {
    // const formData = new FormData();
    // formData.append("pdf", file);
    // try {
    //   const response = await axios.post("/upload", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  console.log(selectedValues);
  console.log(hear);
  const toast = useToast();
  const history = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !nameOfUser ||
      !email ||
      !password ||
      !phone ||
      !age ||
      !tenth ||
      !city ||
      !twelth ||
      !bachelor ||
      !specialization ||
      !college ||
      !course ||
      !country ||
      !work ||
      !intern ||
      !social ||
      !extra ||
      !fund ||
      !careergoal ||
      !familybg ||
      !other ||
      !anythingelse ||
      !consultancy ||
      !coupon ||
      !hear ||
      !selectedValues ||
      !file ||
      !coupon ||
      !resume
    ) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }

    const formdata = new FormData();
    formdata.append("name", nameOfUser);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("college", college);
    formdata.append("course", course);
    formdata.append("city", city);
    formdata.append("age", age);
    formdata.append("tenth", tenth);
    formdata.append("twelth", twelth);
    formdata.append("bachelor", bachelor);
    formdata.append("specialization", specialization);
    formdata.append("internship", intern);
    formdata.append("social", social);
    formdata.append("extra", extra);
    formdata.append("work", work);
    formdata.append("selectedValues", selectedValues);
    formdata.append("other", other);
    formdata.append("fund", fund);
    formdata.append("coupon", coupon);
    formdata.append("hear", hear);
    formdata.append("careergoal", careergoal);
    formdata.append("familybg", familybg);
    formdata.append("anythingelse", anythingelse);
    formdata.append("consultancy", consultancy);
    formdata.append("country", country);
    formdata.append("phone", phone);
    formdata.append("file", file);
    formdata.append("resume", resume);
    console.log({ file, resume });

    // console.log({ nameOfUser, email, password, pref1, pref2 });
    try {
      const config = {
        // headers: {
        //   // "Content-type": "multi-part/formdata",
        // },
      };

      const { data } = await axios.post(
        "/api/user/listener",

        formdata,
        // name: nameOfUser,
        // email,
        // password,
        // college: college,
        // course: course,
        // age,
        // city,
        // tenth,
        // twelth,
        // bachelor,
        // specialization,
        // internship: intern,
        // social,
        // extra,
        // other,
        // fund,
        // careergoal,
        // familybg,
        // anythingelse,
        // consultancy,
        // coupon,
        // country,
        // file,
        // resume,
        // phone,

        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      history("/ListenerChat");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <Navigation />
      <Box position={"relative"}>
        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
        >
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
            >
              {/* Expert consultants{" "} */}
              Expert Content{" "}
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                &
              </Text>{" "}
              Management Students
            </Heading>
            <Stack direction={"row"} spacing={4} align={"center"}>
              <AvatarGroup>
                {avatars.map((avatar) => (
                  <Avatar
                    key={avatar.name}
                    name={avatar.name}
                    src={avatar.url}
                    size={{ base: "md", md: "lg" }}
                    position={"relative"}
                    zIndex={2}
                    _before={{
                      content: '""',
                      width: "full",
                      height: "full",
                      rounded: "full",
                      transform: "scale(1.125)",
                      bgGradient: "linear(to-bl, red.400,pink.400)",
                      position: "absolute",
                      zIndex: -1,
                      top: 0,
                      left: 0,
                    }}
                  />
                ))}
              </AvatarGroup>
              <Text
                fontFamily={"heading"}
                fontSize={{ base: "4xl", md: "6xl" }}
              >
                +
              </Text>
              <Flex
                align={"center"}
                justify={"center"}
                fontFamily={"heading"}
                fontSize={{ base: "sm", md: "lg" }}
                bg={"gray.800"}
                color={"white"}
                rounded={"full"}
                minWidth={useBreakpointValue({ base: "44px", md: "60px" })}
                minHeight={useBreakpointValue({ base: "44px", md: "60px" })}
                position={"relative"}
                _before={{
                  content: '""',
                  width: "full",
                  height: "full",
                  rounded: "full",
                  transform: "scale(1.125)",
                  bgGradient: "linear(to-bl, orange.400,yellow.400)",
                  position: "absolute",
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}
              >
                YOU
              </Flex>
            </Stack>
          </Stack>
          <Stack
            bg={"gray.50"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
          >
            <Stack spacing={4}>
              <Heading
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Join our team
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
              <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                suscipit earum minus esse repellendus! Recusandae ducimus facere
                ullam veniam vel maxime, facilis amet debitis beatae ipsa
                eveniet explicabo, consequatur officiis!
              </Text>
            </Stack>
            <Box as={"form"} mt={10}>
              <Stack spacing={4}>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Firstname Lastname"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="firstnamelastname@gmail.com"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />

                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create Password"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your Age"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter your City"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                  Enter your past academics (Include 10/12/bachelors scores and
                  field of specialization. Also include year of passing)
                </Text>
                <HStack>
                  <Box>
                    <FormControl id="p1" isRequired>
                      <FormLabel>10th Percentage</FormLabel>
                      <Input
                        onChange={(e) => setTenth(e.target.value)}
                        type="text"
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="p1" isRequired>
                      <FormLabel>12th Percentage</FormLabel>
                      <Input
                        onChange={(e) => setTwelth(e.target.value)}
                        type="text"
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <HStack>
                  <Box>
                    <FormControl id="p2">
                      <FormLabel>Bachelor Score</FormLabel>
                      <Input
                        onChange={(e) => setBachelor(e.target.value)}
                        type="text"
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="p3">
                      <FormLabel>Field of Specialization</FormLabel>
                      <Input
                        onChange={(e) => setSpecialization(e.target.value)}
                        type="text"
                      />
                    </FormControl>
                  </Box>{" "}
                </HStack>

                <Input
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Phone Number"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  onChange={(e) => setCollege(e.target.value)}
                  type="text"
                  placeholder="Enter the College/University you are applying to"
                />

                <Input
                  onChange={(e) => setCourse(e.target.value)}
                  type="text"
                  placeholder="Enter the course you are applying"
                />
                <Input
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  placeholder="Enter the country you are applying to"
                />
                <Textarea
                  onChange={(e) => setWork(e.target.value)}
                  placeholder="Work ex details if any (Your designation and duties)(If multiple work ex then also write start and end dates)"
                ></Textarea>

                <Textarea
                  onChange={(e) => setIntern(e.target.value)}
                  placeholder="Internship Details if any"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Textarea
                  onChange={(e) => setsocial(e.target.value)}
                  placeholder="Social Work if any"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Textarea
                  onChange={(e) => setextra(e.target.value)}
                  placeholder="Extra curricular achivements if any"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Textarea
                  onChange={(e) => setother(e.target.value)}
                  placeholder="Any other achivements"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />

                <Textarea
                  onChange={(e) => setfund(e.target.value)}
                  placeholder="Funding details (Let us know the fees you have paid and how your education is being sponsored)"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Textarea
                  onChange={(e) => setcareergoal(e.target.value)}
                  placeholder="Any short term / long term career objectives of you have after the course (its an optional question.. Will help us to make it more personalised) "
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Textarea
                  onChange={(e) => setfamilybg(e.target.value)}
                  placeholder="Family background (Number of members and what do they do)"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Textarea
                  onChange={(e) => setanythingelse(e.target.value)}
                  placeholder="Anything else"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  onChange={(e) => setconsultancy(e.target.value)}
                  type="text"
                  placeholder="Enter the name of the consultancy"
                />
                <Input
                  onChange={(e) => setcoupon(e.target.value)}
                  type="text"
                  placeholder="Add coupon Code if any"
                />
              </Stack>
              <br />
              <FormControl id="url">
                <FormLabel spacing={[1, 5]}>
                  Are you intersted in any of the additional services
                </FormLabel>
                <Stack spacing={[1, 5]} direction={["column", "column"]}>
                  <Checkbox
                    size="md"
                    colorScheme="blue"
                    value="CA Valuation"
                    onChange={handleChange}
                  >
                    CA Valuation
                  </Checkbox>
                  <Checkbox
                    size="md"
                    colorScheme="blue"
                    value="LORs"
                    onChange={handleChange}
                  >
                    LORs
                  </Checkbox>
                  <Checkbox
                    size="md"
                    colorScheme="blue"
                    onChange={handleChange}
                    value="University/College assignments"
                  >
                    University/College assignments
                  </Checkbox>
                  <Checkbox
                    size="md"
                    colorScheme="blue"
                    onChange={handleChange}
                    value="Education Loan"
                  >
                    Education Loan
                  </Checkbox>
                  <Checkbox
                    size="md"
                    colorScheme="blue"
                    onChange={handleChange}
                    value="Post landing service such as accommodation, job, forex,
                    insurance"
                  >
                    Post landing service such as accommodation, job, forex,
                    insurance
                  </Checkbox>
                </Stack>
              </FormControl>
              <br />
              <FormControl id="url">
                <FormLabel spacing={[1, 5]}>
                  Where did you hear about us
                </FormLabel>

                <RadioGroup onChange={sethear} value={hear}>
                  <Stack direction="row">
                    <Radio value="Instagram page">Instagram page</Radio>
                    <Radio value="Through Vineet">Through Vineet</Radio>
                    <Radio value="Facebook">Facebook</Radio>
                    <Radio value="Friend">Friend</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <br />
              <Input
                type="file"
                name="file"
                placeholder="Upload resume"
                onChange={handleFileChange}
                accept="application/pdf"
              ></Input>
              <button onClick={handleUpload}>upload</button>
              <br />

              <Input
                type="file"
                name="resume"
                placeholder="Upload resume"
                accept="application/pdf"
                onChange={handleResumeChange}
              ></Input>
              <br />
              <Text>
                Lastly, if you have any references then do contact us for
                referral bonus
              </Text>
              <Button
                onClick={submitHandler}
                type="submit"
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
              >
                Submit
              </Button>
              <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                Already have account?{" "}
                <Link to="/listenerlogin">
                  <u style={{ color: "blue" }}>Log In</u>{" "}
                </Link>{" "}
              </Text>
            </Box>
            form
          </Stack>
        </Container>
        <Blur
          position={"absolute"}
          top={-10}
          left={-10}
          style={{ filter: "blur(70px)" }}
        />
      </Box>
    </>
  );
}

export const Blur = (IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...IconProps}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
