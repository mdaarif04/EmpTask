import "./dashbord.css"; 
import Header from "../pages/Header/Header";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header />
      <h3 className="ds">Dashboard</h3>
      <h3 className="h3">Welcome to Admin Panel</h3>
    </div>
  );
};

export default Dashboard;
