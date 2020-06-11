import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import PostSignature from '../PostSignature';

test('PostSignature: renders PostSignature without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<PostSignature />, div)
});
