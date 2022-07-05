import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Slider from './components/app/Slider';
import Menu from './components/app/Menu';
import AlertHelp from './components/app/AlertHelp';

export default function App() {
  const [content, setContent] = useState(null);
  const [help, setHelp] = useState(false);

  return (
    <Container>
      <Slider />
      <AlertHelp help={help} setHelp={setHelp} />
      <Menu setContent={setContent} help={help} setHelp={setHelp} />
      {content}
    </Container>
  );
}
