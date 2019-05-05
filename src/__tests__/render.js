import React from 'react';
import { View } from 'react-native';
import { render } from '../';

test('renders View', () => {
  const { container } = render(<View />);
  expect(container).not.toBeNull();
});

test('returns container', () => {
  const { container } = render(<View />);
  expect(container).toBeTruthy();
});

test('renders options.wrapper around node', () => {
  const WrapperComponent = ({ children }) => <View testID="wrapper">{children}</View>;

  const { testRenderer, getByTestId } = render(<View testID="inner" />, {
    wrapper: WrapperComponent,
  });

  expect(getByTestId('wrapper')).toBeTruthy();
  expect(testRenderer.toJSON()).toMatchInlineSnapshot(`
<View
  testID="wrapper"
>
  <View
    testID="inner"
  />
</View>
`);
});

test('returns the queries passed as options bound to the container', () => {
  const _getQueryPassedAsOption = { bind: jest.fn(() => _getQueryPassedAsOption) };
  const queries = { getQueryPassedAsOption: _getQueryPassedAsOption };

  const { container, getQueryPassedAsOption } = render(<View />, { queries });

  expect(queries.getQueryPassedAsOption.bind).toHaveBeenCalledWith(null, container);
  expect(getQueryPassedAsOption).toEqual(_getQueryPassedAsOption);
});
