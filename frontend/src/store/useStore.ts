import { useState, useEffect } from 'react';

/**
 * A simple custom store for global state management.
 */
interface GlobalState {
    user: any | null;
    theme: 'light' | 'dark';
    notifications: any[];
}

let listeners: Array<(state: GlobalState) => void> = [];
let state: GlobalState = {
    user: null,
    theme: 'light',
    notifications: [],
};

const setState = (newState: Partial<GlobalState>) => {
    state = { ...state, ...newState };
    listeners.forEach((listener) => listener(state));
};

export const useStore = () => {
    const [localState, setLocalState] = useState(state);

    useEffect(() => {
        listeners.push(setLocalState);
        return () => {
            listeners = listeners.filter((l) => l !== setLocalState);
        };
    }, []);

    return {
        state: localState,
        setUser: (user: any) => setState({ user }),
        setTheme: (theme: 'light' | 'dark') => setState({ theme }),
        addNotification: (note: any) => setState({ notifications: [note, ...state.notifications] }),
    };
};
