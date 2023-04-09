import "./App.css";
import { Hello } from "./Hello.js";
import { Title } from "./Title.js";
import Button from "./components/Button/index.js";
import Table from "./components/Table/index.js";

function App() {
  // const Hello = () => "Hellow React";

  const users = [
    {
      _id: 1,
      name: "Nanda",
      age: 23,
      status: true,
    },
    {
      _id: 2,
      name: "Paul",
      age: 24,
      status: true,
    },
    {
      _id: 3,
      name: "Arkhan",
      age: 7,
      status: false,
    },
  ];

  const isLogin = true;

  return (
    <>
      <h1>Welcome to react</h1>
      <ul>
        <li>Home</li>
        <li>Users</li>
        <li>{isLogin ? "sudah login" : "login"}</li>
      </ul>
      <h1>
        <Hello />
      </h1>

      <Title name="Nanda" />
      <br />
      <Title />
      <Button onClick={() => alert("click save")}>Save</Button>

      <Table users={users}></Table>
    </>
  );
}

export default App;
