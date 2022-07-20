import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateAndEditUser from "./component/CreateUser";
import UserTable from "./component/UserTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserTable />} />
        <Route path="/create-edit" element={<CreateAndEditUser />} />
        <Route path="/create-edit/:id" element={<CreateAndEditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
