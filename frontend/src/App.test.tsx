import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
    it('renders without crashing', () => {
        // let's just check to see if something is rendered.
        render(<App />);
        expect(document.body).toBeDefined();
    });
});
