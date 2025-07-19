import React from "react";
import { CssBaseline } from "@mui/material";
import SplashScreen from "./pages/SplashScreen";
import { Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import Logincitizen from './pages/citizen/Logincitizen';
import CrimeMap from "./pages/citizen/CrimeMap";
import 'leaflet/dist/leaflet.css';
import Loginpolice from './pages/police/Loginpolice';
import Signup from "./pages/citizen/signup";

import Citizen from "./pages/citizen/index";
import Police from "./pages/police/index";
import PrivateRouteCitizen from "./pages/PrivateRouteCitizen";
import PrivateRoutePolice from "./pages/PrivateRoutePolice";
import PrivateLayout from "./layout/PrivateLayout";
import Settings from "./pages/citizen/Settings";
import PSettings from "./pages/police/Settings";
import GeoFence from "./pages/citizen/GeoFence";
import ReportCrime from "./pages/citizen/ReportCrime";
import CrimeDetails from "./pages/citizen/CrimeDetails";
import PoliceBroadcastForm from "./pages/police/BroadcastForm";
import CitizenBroadcast from "./pages/citizen/CitizenBroadcast";
import Dashboard from "./pages/police/Dashboard";
import CrimeReports from "./pages/police/CrimeReports";
import CrimeDashboardMap from "./pages/police/CrimeDashboardMap";
import BroadcastMessage from "./pages/police/BroadcastMessage";
import Chat from "./pages/citizen/Chat";

const App = () => {
  return (
    <CssBaseline>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/roleselection" element={<RoleSelection />} />
        <Route path="/citizenlogin" element={<Logincitizen/>} />
        <Route path="/citizensignup" element={<Signup/>} />
        <Route path="/policelogin" element={<Loginpolice/>} />
         {/* Private routes only accessed after successful login */}
         <Route element={<PrivateRouteCitizen allowedRoles={['citizen']}><PrivateLayout /></PrivateRouteCitizen>} >
          {/* <Route path="/crimemap" element={ <Citizen/>} /> */}
          <Route path="/crimemap" element={ <CrimeMap/>} />
          <Route path="/reportcrime" element={ <ReportCrime/>} />
          <Route path="/geofence" element={ <GeoFence/>} />
          <Route path="/settings" element={ <Settings/>} />
          <Route path="/crimedetails" element={ <CrimeDetails/>} />
          <Route path="/citizenbroadcast" element={ <CitizenBroadcast/>} />
          <Route path="/chat" element={ <Chat/>} />


        </Route>
         <Route element={<PrivateRoutePolice allowedRoles={['police']}><PrivateLayout /></PrivateRoutePolice>} >

          <Route path="/policehome" element={<Police/>} />
          <Route path="/policebroadcast" element={<PoliceBroadcastForm/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/crimedashboardmap" element={<CrimeDashboardMap/>} />
          <Route path="/crimereports" element={<CrimeReports/>} />
          {/* <Route path="/broadcast" element={<BroadcastMessage/>} /> */}
          <Route path="/broadcast" element={<PoliceBroadcastForm/>} />
          <Route path="/psettings" element={<PSettings/>} />
        </Route>
      </Routes>
    </CssBaseline>
  );
};

export default App;
