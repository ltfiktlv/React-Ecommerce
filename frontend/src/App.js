import React from "react";
import { Container } from "react-bootstrap"; // after installing "npm i react-bootstrap" on terminal
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
function App() {
  return (
    <>
      <Header />
      <main className="py-4">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
