import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import CreateUser from '../CreateUser';

test('CreateUser: renders CreateUser without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<CreateUser />, div)
});
