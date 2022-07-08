import React from 'react';
import { Stack, Carousel } from 'react-bootstrap';
import Slide1 from '../imgs/slide_1.png';
import Slide2 from '../imgs/slide_2.png';
import Slide3 from '../imgs/slide_3.png';
import Slide4 from '../imgs/slide_4.png';

export default function Slider() {
  return (
    <Stack className="mx-auto my-2">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide3}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide4}
            alt="Fourth slide"
          />
        </Carousel.Item>
      </Carousel>
    </Stack>
  );
}
