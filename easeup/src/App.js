import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import React from "react";
import Signup from "./pages/Signup";
import NewChat from "./pages/NewChat";
import RegisterListener from "./pages/RegisterListener";
import ListenerChat from "./pages/ListenerChat";
import ListenerLogin from "./pages/ListenerLogin";
import Landing_page from "./Landing_page/Landing_page";
// import AboutUs from "./AboutUs/About_Us";
import AboutUs from "./pages/AboutUs/About_Us";
import PandC from "./PandC/PandC";
// import Blogs from "./pages/Blogs/Blogs";
// import Blogs from "./Pages/Blogs/Blogs";
import ContactUs from "./pages/ContactUs/ContactUs";
import VideoCall from "./components/VideoCall";
import RegisterUser from "./config/RegisterUser";
import Clientdetails from "./pages/Clientdetails";
import ParticularClient from "./pages/ParticularClient";
import InternDashoard from "./pages/InternDashoard";
import AdminDashboard from "./pages/AdminDashboard";
import { blogList } from "../src/config/data";
import Blogs from "./pages/Blogs/Blogs";
import BlogPage from "./pages/Blogs/Blogpage/BlogPage";
import SOP from "./pages/SOP/SOP";
import LOR from "./pages/LOR/LOR";
import Services from "./pages/Services/Services";
import Assignment from "./pages/Assignments/Assignment";
// import Register from "./config/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/listenerregister" element={<RegisterListener />} />
        <Route path="/ListenerChat" element={<ListenerChat />} />
        <Route path="/listenerlogin" element={<ListenerLogin />} />
        <Route path="/" element={<Landing_page />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/PandC" element={<PandC />} />
        {/* <Route path="/blogs" element={<Blogs />} /> */}

        <Route path="/blog" element={<Blogs blogs={blogList} />} />
        <Route path="/blog/blog/:id" element={<BlogPage />} />

        <Route path="/clientdetails" element={<Clientdetails />} />
        <Route path="/particularClient" element={<ParticularClient />} />
        <Route path="/internDashboard" element={<InternDashoard />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/videocall" element={<VideoCall />} />
        <Route path="/RegisterUser" element={<RegisterUser />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route exact path="/sop" element={<SOP />} />
        <Route exact path="/lor" element={<LOR />} />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/assignment" element={<Assignment />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
