import Landing from '.'
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {fireEvent, screen, render, cleanup, waitFor } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

describe("Landing Page", () => {
    it("displays the button", () => {
        render(<Landing/>)
        const button = screen.getByText("Get started")
        expect(button).toBeInTheDocument();
    })
})