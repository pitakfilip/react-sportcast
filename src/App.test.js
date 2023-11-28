import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { useAuth0 } from './react-auth0-spa';
jest.mock('./react-auth0-spa');

describe('app', () => {
  beforeEach(() => {
    // Mock the Auth0 hook and make it return a logged in state
    useAuth0.mockReturnValue({
      loading: true,
    });
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
