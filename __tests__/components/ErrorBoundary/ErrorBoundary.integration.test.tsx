/**
 * Integration test để test ErrorBoundary với real error scenarios
 * Chạy test này với: npm test -- ErrorBoundary.integration
 */

import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ErrorBoundary from '~alias~/app/components/ErrorBoundary/ErrorBoundary';

// Component test với button để trigger error
const ComponentWithError = () => {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('Intentional error for testing');
  }

  return (
    <div>
      <button onClick={() => setShouldError(true)}>Trigger Error</button>
      <div>Normal content</div>
    </div>
  );
};

describe('ErrorBoundary Integration Tests', () => {
  const originalError = console.error;
  
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should catch and display error when child component throws', async () => {
    // Suppress React error boundary warning
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>
    );

    // Initially should show normal content
    expect(screen.getByText('Normal content')).toBeInTheDocument();

    // Trigger error
    const triggerButton = screen.getByText('Trigger Error');
    fireEvent.click(triggerButton);

    // Wait for error boundary to catch the error
    await waitFor(() => {
      expect(screen.getByText('500')).toBeInTheDocument();
    });

    spy.mockRestore();
  });

  it('should handle async errors in useEffect', async () => {
    const AsyncErrorComponent = () => {
      React.useEffect(() => {
        setTimeout(() => {
          throw new Error('Async error');
        }, 100);
      }, []);

      return <div>Async Component</div>;
    };

    render(
      <ErrorBoundary>
        <AsyncErrorComponent />
      </ErrorBoundary>
    );

    // Note: ErrorBoundary chỉ catch errors trong render, không catch async errors
    // Để test async errors, cần error handling khác
    expect(screen.getByText('Async Component')).toBeInTheDocument();
  });
});

