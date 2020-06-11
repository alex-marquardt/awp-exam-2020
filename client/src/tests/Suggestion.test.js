import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Suggestion from '../Suggestion';

// test data
const mockSuggestion = {
    _id: 1,
    title: "Test title",
    description: "Test description",
    hide: false,
    date: new Date().toLocaleString(),
    signatures: [
        { _id: 1, name: "Mark", username: "mk", date: new Date().toLocaleString() },
        { _id: 2, name: "Dan", username: "nad", date: new Date().toLocaleString() },
        { _id: 3, name: "Lars", username: "la", date: new Date().toLocaleString() },
    ]
}

test('Suggestion: renders "Suggestion" without crashing', () => {

    const getSuggestion = jest.fn(() => mockSuggestion);

    const div = document.createElement("div");
    ReactDOM.render(<Suggestion getSuggestion={getSuggestion} />, div)
});

test('Suggestion: renders the actual suggestion in the component', () => {

    const comp = <Suggestion getSuggestion={suggestion => mockSuggestion} />
    const { getByText } = render(comp);
    expect(getByText(mockSuggestion.title)).toBeInTheDocument();
});

test('Suggestion: renders all signatures for a suggestion', () => {
    const comp = <Suggestion getSuggestion={suggestion => mockSuggestion} />
    const { getByText, } = render(comp);
    expect(getByText(mockSuggestion.signatures[0].name)).toBeInTheDocument();
    expect(getByText(mockSuggestion.signatures[1].name)).toBeInTheDocument();
    expect(getByText(mockSuggestion.signatures[2].name)).toBeInTheDocument();
});