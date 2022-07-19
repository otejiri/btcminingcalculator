import React, { Fragment } from "react";
import Body from "../Body/Body";
import Header from "../Header/Header";
import { HomePage } from "./Home.styled";

const Home = () => {
  return (
    <Fragment>
      <HomePage>
        <Header />
        <Body />
      </HomePage>
    </Fragment>
  );
};

export default Home;
