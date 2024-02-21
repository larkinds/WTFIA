import React from 'react';
import renderer from 'react-test-renderer';
import App from "../App"
import LocationScreen from '../screens/LocationScreen';


test('renders correctly', () => {
  const view = renderer.create(<App />).toJSON();
  expect(view).toMatchSnapshot();
});