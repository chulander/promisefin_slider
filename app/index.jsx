import React from 'react';
import ReactDOM from 'react-dom';
//import World from './components/World.jsx';
import Slider from './components/Slider';
import {Container} from 're-bulma';
ReactDOM.render(
  <Container  className="promisefin_slider__container is-fluid">
    <Slider />
  </Container>,
  document.getElementById('app')
);
