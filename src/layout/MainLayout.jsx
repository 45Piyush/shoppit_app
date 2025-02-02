// import React from "react";
import NavBar from "../components/ui/NavBar";
import Footer from "../components/ui/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from "./MainLayout.module.css"


const MainLayout = ({numCartItems}) => {
  return (
    <div className={styles.layout}>
      <NavBar numCartItems = {numCartItems} />
      <ToastContainer/>
      <main className={styles.mainContent} >
        <Outlet />
      </main>
      {/* <Outlet /> */}
      <Footer />
    </div>
  );
};

export default MainLayout;
