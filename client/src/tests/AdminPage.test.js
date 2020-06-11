import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import AdminPage from '../AdminPage';

test('AdminPage: renders AdminPage without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<AdminPage />, div)
});
