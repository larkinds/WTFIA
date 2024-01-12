import { expect, test } from 'vitest'
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();

})