import { useState, useEffect } from "react";
import {
  Button,
  Center,
  Checkbox,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

import university from "./university.json";

function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [room, setRoom] = useState(1);
  const [number, setNumber] = useState(1);
  const [courseName, setCourseName] = useState("");
  const [choose, setChoose] = useState(false);
  const [sending, setSending] = useState(false);
  const [uni, setUni] = useState([]);
  const [selectUni, setSelectUni] = useState("");
  const [state, setState] = useState(0);
  const [faculties, setFaculties] = useState([]);
  const [selectFaculty, setSelectFaculty] = useState("");
  const [major, setMajor] = useState([]);
  const [selectMajor, setSelectMajor] = useState("");
  const [course, setCourse] = useState([]);
  const [mark, setMark] = useState("");

  const toast = useToast();

  const { REACT_APP_SHEET_URL } = process.env;

  const handleSending = async () => {
    setSending(true);
    if (
      !name ||
      !surname ||
      ((!selectUni || !selectFaculty || !selectMajor || !courseName) && !mark)
    ) {
      setSending(false);
      toast({
        title: "ผิดพลาด",
        description: "กรอกข้อมูลไม่ครบ",
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      const data = {
        name,
        surname,
        room,
        number,
        uni: selectUni,
        fac: selectFaculty,
        major: selectMajor,
        courseName,
        choose,
        mark,
      };
      console.log(data);
      const url = `${REACT_APP_SHEET_URL}&name=${name}&surname=${surname}&room=${room}&number=${number}&uni=${selectUni}&fac=${selectFaculty}&major=${selectMajor}&courseName=${courseName}&choose=${choose}&mark=${mark}`;
      await axios.get(url);
      setCourseName("");
      setSelectUni("");
      setState(0);
      setFaculties([]);
      setSelectFaculty("");
      setMajor([]);
      setSelectMajor("");
      setCourse([]);
      setMark("");
      setSending(false);
      toast({
        title: "ส่งเรียบร้อย",
        description: "ส่งข้อมูลเรียบร้อย",
        position: "top-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleClear = () => {
    setName("");
    setSurname("");
    setRoom("");
    setNumber("");
    setCourseName("");
    setSelectUni("");
    setState(0);
    setFaculties([]);
    setSelectFaculty("");
    setMajor([]);
    setSelectMajor("");
    setCourse([]);
    setMark("");
    setChoose(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleRoomChange = (value) => {
    setRoom(value);
  };

  const handleNumberChange = (value) => {
    setNumber(value);
  };

  const handleCourseChange = (event) => {
    setCourseName(event.target.value);
  };

  const handleChooseChange = (event) => {
    setChoose(event.target.checked);
  };

  const handleMarkChange = (event) => {
    setMark(event.target.value);
  };

  const handleUniChange = (event) => {
    event.target.value ? setState(1) : setState(0);
    setSelectUni(event.target.value);
    setSelectFaculty("");
    setSelectMajor("");
    // setSearchParams({ uni: event.target.value }, { fac: "" }, { major: "" });
  };

  const handleFacChange = (event) => {
    event.target.value ? setState(2) : setState(1);
    setSelectFaculty(event.target.value);
    setSelectMajor("");
    // setSearchParams({ fac: event.target.value }, { major: "" });
  };

  const handleMajorChange = (event) => {
    if (event.target.value) {
      setState(3);
    } else {
      setState(2);
      setCourse([]);
    }
    setSelectMajor(event.target.value);
    // setSearchParams({ major: event.target.value });
  };

  useEffect(() => {
    const uniArray = [];
    for (const uni of university) {
      uniArray.push(Object.keys(uni)[0]);
    }
    setUni(uniArray);
  }, []);

  useEffect(() => {
    if (selectUni) {
      const facArray = [];
      for (const fac of university[uni.indexOf(selectUni)][selectUni]) {
        facArray.push(Object.keys(fac)[0]);
      }
      setFaculties(facArray);
      setCourse([]);
    }
  }, [selectUni]);

  useEffect(() => {
    if (selectFaculty) {
      const majorArray = [];
      for (const major of university[uni.indexOf(selectUni)][selectUni][
        faculties.indexOf(selectFaculty)
      ][selectFaculty]) {
        majorArray.push(Object.keys(major)[0]);
      }
      setMajor(majorArray);
      setCourse([]);
    }
  }, [selectFaculty]);

  useEffect(() => {
    if (selectMajor) {
      const majorArray = [];
      for (const major of university[uni.indexOf(selectUni)][selectUni][
        faculties.indexOf(selectFaculty)
      ][selectFaculty]) {
        majorArray.push(major);
      }
      setCourse(majorArray[major.indexOf(selectMajor)][selectMajor]);
    }
  }, [selectMajor]);

  return (
    <>
      <Center m={10}>
        <Heading>
          ติดตามผลรอบ Tcas รอบที่ 1 Portfolio นักเรียนม.6 ปีการศึกษา 2565
        </Heading>
      </Center>
      <Container maxW="container.sm" mb={10}>
        <Grid gridTemplateColumns={"1fr 9fr"} gap={6} mb={10}>
          <GridItem w="100%" h="10">
            <Text fontSize="2xl" align="right">
              ชื่อจริง
            </Text>
          </GridItem>
          <GridItem w="100%" h="10">
            <Input
              placeholder="ชื่อจริง"
              value={name}
              onChange={handleNameChange}
              isRequired
            />
          </GridItem>
          <GridItem w="100%" h="10">
            <Text fontSize="2xl" align="right">
              นามสกุล
            </Text>
          </GridItem>
          <GridItem w="100%" h="10">
            <Input
              placeholder="นามสกุล"
              value={surname}
              onChange={handleSurnameChange}
              isRequired
            />
          </GridItem>
          <GridItem w="100%" h="10">
            <Text fontSize="2xl" align="right">
              ห้อง
            </Text>
          </GridItem>
          <GridItem w="100%" h="10">
            <NumberInput
              defaultValue={1}
              min={1}
              max={18}
              value={room}
              onChange={handleRoomChange}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </GridItem>
          <GridItem w="100%" h="10">
            <Text fontSize="2xl" align="right">
              เลขที่
            </Text>
          </GridItem>
          <GridItem w="100%" h="10">
            <NumberInput
              defaultValue={1}
              min={1}
              max={50}
              value={number}
              onChange={handleNumberChange}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </GridItem>
          <Divider />
          <Divider />
          <GridItem w="100%" h="10">
            <Text fontSize="2xl" align="right">
              มหาวิทยาลัย
            </Text>
          </GridItem>
          <GridItem w="100%" h="10">
            <Select
              placeholder="เลือกมหาวิทยาลัย"
              value={selectUni}
              onChange={handleUniChange}
            >
              {uni.map((u) => (
                <option value={u} key={u}>
                  {u}
                </option>
              ))}
            </Select>
          </GridItem>
          <GridItem w="100%" h="10">
            <Text fontSize="2xl" align="right">
              คณะ
            </Text>
          </GridItem>
          <GridItem w="100%" h="10">
            <Select
              placeholder="เลือกคณะ"
              isDisabled={state < 1}
              value={selectFaculty}
              onChange={handleFacChange}
            >
              {faculties.map((f) => (
                <option value={f} key={f}>
                  {f}
                </option>
              ))}
            </Select>
          </GridItem>
          <GridItem w="100%" h="10">
            <Text fontSize="2xl" align="right">
              สาขา
            </Text>
          </GridItem>
          <GridItem w="100%" h="10">
            <Select
              placeholder="เลือกสาขา"
              isDisabled={state < 2}
              value={selectMajor}
              onChange={handleMajorChange}
            >
              {major.map((m) => (
                <option value={m} key={m}>
                  {m}
                </option>
              ))}
            </Select>
          </GridItem>
        </Grid>
        <Select
          placeholder="Select option"
          overflowX="wrap"
          isDisabled={state < 3}
          value={courseName}
          onChange={handleCourseChange}
          mb={5}
        >
          {course.map((c) => (
            <option key={Object.keys(c)[0]} value={Object.keys(c)[0]}>
              {Object.keys(c)[0]}
            </option>
          ))}
        </Select>
        <Divider />
        <Input
          placeholder="หมายเหตุ"
          value={mark}
          my={5}
          onChange={handleMarkChange}
        />
        <Divider />
        <Stack direction="row" spacing={10} align="center" mt={5}>
          <Checkbox isChecked={choose} onChange={handleChooseChange} size="lg">
            ยืนยันสิทธิ์
          </Checkbox>
          <Button
            colorScheme="green"
            variant="outline"
            isLoading={sending}
            loadingText="กำลังส่ง"
            onClick={handleSending}
          >
            ส่ง
          </Button>
          <Button colorScheme="gray" variant="outline" onClick={handleClear}>
            ลบ
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default App;
