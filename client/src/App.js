import dashbord from "./components/Dashbord/dashbord";
import EditEmployee from "./components/Employee/editemployee";
import emplist from "./components/Employee/emplist";
import employee from "./components/Employee/employee";
import login from "./components/pages/login";
import RegisterPage from "./components/pages/register";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={RegisterPage} />
          <Route path="/login" Component={login} />
          <Route path="/dashbord/:id" Component={dashbord} />
          <Route path="/employee" Component={employee} />
          <Route path="/emplist" Component={emplist} />
          <Route path="/employees/edit/:id" element={<EditEmployee />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
