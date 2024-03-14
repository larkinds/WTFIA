
/**
 * @jest-environment jsdom
 */

import renderer from 'react-test-renderer';
import "jest-canvas-mock";
import App from "../App"
import LocationScreen from '../screens/LocationScreen';


global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

test('renders correctly', () => {
  const view = renderer.create(<App />).toJSON();
  expect(view).toMatchSnapshot();
});