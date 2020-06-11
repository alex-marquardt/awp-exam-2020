import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import PostSuggestion from '../PostSuggestion';

test('PostSuggestion: renders PostSuggestion without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<PostSuggestion />, div)
});
