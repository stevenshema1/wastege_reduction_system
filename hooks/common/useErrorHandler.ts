import { useState, useCallback } from 'react';

interface ErrorState {
    hasError: boolean;
    message: string | null;
    code: string | number | null;
}

/**
 * Custom hook for centralized error handling across components.
 */
export const useErrorHandler = () => {
    const [error, setError] = useState<ErrorState>({
        hasError: false,
        message: null,
        code: null,
    });

    const handleError = useCallback((err: any) => {
        console.error('Application Error:', err);
        
        const message = err.response?.data?.message || err.message || 'An unexpected error occurred';
        const code = err.response?.status || err.code || 'UNKNOWN';

        setError({
            hasError: true,
            message,
            code,
        });
    }, []);

    const clearError = useCallback(() => {
        setError({
            hasError: false,
            message: null,
            code: null,
        });
    }, []);

    return {
        error,
        handleError,
        clearError,
    };
};
