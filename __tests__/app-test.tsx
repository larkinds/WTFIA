
/**
 * @jest-environment jsdom
 */

import renderer from 'react-test-renderer';
import "jest-canvas-mock";
import App from "../App"
import { Button } from 'react-native';
import LocationScreen from '../screens/LocationScreen';

global.setImmediate = jest.useRealTimers as unknown as typeof setImmediate;


global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

test('renders correctly', () => {
  const view = renderer.create(<App />).toJSON();
  expect(view).toMatchSnapshot();
});

test('includes our main button', () => {
  const root = renderer.create(<App />).root;
  let button = root.findByType(Button);
  
  expect(button.props.title).toEqual("Where the Fuck Am I?")
});





//to test:
//1. Does button exist?
//2. Does the application navigate upon clicking the button?
//3. Does the application return a location?
//4. Does the application give a nice error if not?
//do we need to change to react-testing-library?