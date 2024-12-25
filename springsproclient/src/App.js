import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Tags from "./components/Tag";
import BillService from "./components/BillService";
import Internet from "./components/Internet/index.jsx";
import Network from "./components/Network";
import Cellular from "./components/Cellular Service";
import FeedBack from "./components/FeedBack";
import Cyber from "./components/CyberSecurity/index.jsx";
import Iot from "./components/FirstNetIOT/index.jsx";
import Story from "./components/Story";
import Guide from "./components/Guide";
import Cloud from "./components/Cloud/index.jsx";
import Deploys from "./components/Deploys";
import Products from "./components/Products";
import ScrollTop from "./components/ScrollTop.jsx";
import BillsAndServices from "./components/BillandServices/index.jsx";
import Technology from "./components/Technology";
import Mobility from "./components/FirstNetMobility/index.jsx";
import Business from "./components/Partner/index.jsx";
import Footer from "./components/Footer";
import Fibre from "./components/Fibre";
import Login from "./components/Login/index.tsx";
import Signup from "./components/Signup/index.tsx";
import Form from "./components/Form/index.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllUsers from "./components/Admin-Dashboard/AllUsers.jsx";
import AllOrders from "./components/Admin-Dashboard/AllOrders.jsx";
import Orders from "./components/Orders/Orders.jsx";

function App() {
  return (
    <Router>
      {/* Manually adding Header and Footer only for specific routes */}
      
      {/* Routes that require Header and Footer */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <div className="overflow-x-hidden ">
                <Hero />
                <Tags />
                <Network />
                <BillService />
                <FeedBack />
                <Story />
                <Guide />
                <Deploys />
                <Products />
                <Technology />
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/your-orders"
          element={
            <>
              <Header />
              <div className="overflow-x-hidden ">
                <Orders />
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/cellular-service"
          element={
            <>
              <Header />
              <div className="overflow-x-hidden ">
                <Cellular />
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/fibre-internet"
          element={
            <>
              <Header />
              <div className="overflow-x-hidden ">
                <Fibre />
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/order-form"
          element={
            <>
              <Header />
              <div className="overflow-x-hidden ">
                <Form />
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/cloud-solution"
          element={
            <>
              <Header />
              <div className="overflow-x-hidden ">
                <Cloud />
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/cyber-security"
          element={
            <>
              <Header />
              <div className="overflow-x-hidden ">
                <Cyber />
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/internet-wan"
          element={
            <>
              <Header />
              <div className="overflow-x-hidden ">
                <Internet />
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/business-voice"
          element={
            <>
              <Header />
              <div className="overflow-x-hidden ">
                <Business />
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/first-net-iot"
          element={
            <>
              <Header />
              <div className="overflow-x-hidden ">
                <Iot />
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/first-net-mobility"
          element={
            <>
              <Header />
              <div className="overflow-x-hidden ">
                <Mobility />
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path="/bills-and-services"
          element={
            <>
              <Header />
              <div className="overflow-x-hidden ">
                <BillsAndServices />
              </div>
              <Footer />
            </>
          }
        />

        {/* Routes that should NOT show Header and Footer */}
        <Route
          path="/login"
          element={
            <div className="overflow-x-hidden ">
              <Login />
            </div>
          }
        />

        <Route
          path="/signup"
          element={
            <div className="overflow-x-hidden ">
              <Signup />
            </div>
          }
        />

        <Route
          path="/admin-all-users"
          element={
            <div className="overflow-x-hidden ">
              <AllUsers />
            </div>
          }
        />

        <Route
          path="/admin-all-orders"
          element={
            <div className="overflow-x-hidden ">
              <AllOrders />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
