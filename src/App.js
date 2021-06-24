import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Header/>
      <Main/>
      <Footer/>
    </RecoilRoot>
  );
}

export default App;
