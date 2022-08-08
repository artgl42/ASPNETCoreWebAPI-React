import React, { useState } from "react";
// @ts-ignore
import { Container } from "react-bootstrap";
import Slider from "./components/UI/Slider";
import Menu from "./components/UI/Menu";

export default function App() {
  const [view, setView] = useState(null);

  return (
    <Container>
      <Slider />
      <Menu setView={setView} />
      {view}
    </Container>
  );
}
