/**
 * Application Configuration & Theme Constants
 */

export const APP_CONFIG = {
    NAME: 'Wastage Reduction System',
    VERSION: '1.2.0',
    API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    DEFAULT_LANGUAGE: 'en',
    SUPPORTED_LANGUAGES: ['en', 'sw'],
    MAX_UPLOAD_SIZE: 5 * 1024 * 1024, // 5MB
};

export const THEME_CONSTANTS = {
    COLORS: {
        PRIMARY: '#10B981', // Emerald 500
        SECONDARY: '#3B82F6', // Blue 500
        DANGER: '#EF4444', // Red 500
        WARNING: '#F59E0B', // Amber 500
        SUCCESS: '#10B981',
    },
    BREAKPOINTS: {
        SM: '640px',
        MD: '768px',
        LG: '1024px',
        XL: '1280px',
    },
    ANIMATIONS: {
        FADE_IN: 'animate-fade-in',
        SLIDE_UP: 'animate-slide-up',
    }
};
