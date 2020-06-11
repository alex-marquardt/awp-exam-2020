import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react'
import App from '../App';

test('App: text "Suggetions Exam App" is in the component', () => {
    const { getByText } = render(<App />)
    expect(getByText(/Suggetions Exam App/i)).toBeInTheDocument();
});


test('App: Fake test', () => {
    expect(true).toBeTruthy();
})

