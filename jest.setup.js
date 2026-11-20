jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return new Proxy(
    {},
    {
      get: () => {
        return function MockIcon(props) {
          return React.createElement(Text, props, props.name || 'icon');
        };
      },
    }
  );
});
