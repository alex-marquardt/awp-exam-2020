import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Suggestions from '../Suggestions';

// test data
const mockSuggestions = [
    {
        _id: 1, title: "Just a title", description: "Another description", hide: false, date: new Date().toLocaleString(),
        signatures: [
            { _id: 1, name: "Ulla", username: "funman", date: new Date().toLocaleString() },
            { _id: 2, name: "Elias", username: "lolman", date: new Date().toLocaleString() },
            { _id: 3, name: "Jon", username: "chilman", date: new Date().toLocaleString() },
        ]
    },
    {
        _id: 2, title: "Video games is fun", description: "Action games is the best", hide: false, date: new Date().toLocaleString(),
        signatures: [
            { _id: 1, name: "Alex", username: "lex", date: new Date().toLocaleString() },
            { _id: 2, name: "Thomas", username: "mas", date: new Date().toLocaleString() },
            { _id: 3, name: "Simon", username: "smn", date: new Date().toLocaleString() },
        ]
    },
    {
        _id: 3, title: "Cake is good", description: "Love all cakes", hide: false, date: new Date().toLocaleString(),
        signatures: [
            { _id: 1, name: "Lisa", username: "Test username", date: new Date().toLocaleString() },
            { _id: 2, name: "Mette", username: "Testman", date: new Date().toLocaleString() },
            { _id: 3, name: "Frederik", username: "modnar", date: new Date().toLocaleString() },
        ]
    }
];

test('Suggestions: renders suggestions with all titles', () => {
    const comp = <Suggestions suggestions={mockSuggestions} />;
    const { getByText } = render(comp);

    expect(getByText(mockSuggestions[0].title)).toBeInTheDocument();
    expect(getByText(mockSuggestions[1].title)).toBeInTheDocument();
    expect(getByText(mockSuggestions[2].title)).toBeInTheDocument();
});

test('Suggestions: does not render signatures answers', () => {
    const comp = <Suggestions suggestions={mockSuggestions} />;
    const { queryByText } = render(comp);

    expect(queryByText(mockSuggestions[0].signatures[0].name)).toBeNull();
    expect(queryByText(mockSuggestions[0].signatures[1].name)).toBeNull();
    expect(queryByText(mockSuggestions[0].signatures[2].name)).toBeNull();
});