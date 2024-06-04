import type { User, Waste, SystemLog } from '../types';

const API_URL = 'http://localhost:3001/api';

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(error.message || 'An API error occurred');
    }
    // For 204 No Content, there's no body to parse
    if (response.status === 204) {
        return null;
    }
    return response.json();
}

// --- User API ---
export const login = async (email: string, password_sent: string): Promise<User | null> => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: password_sent }),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Login failed:", error);
        return null;
    }
};

export const register = async (username: string, email: string, password_sent: string): Promise<User | null> => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password: password_sent }),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Registration failed:", error);
        return null;
    }
};

export const requestPasswordReset = async (email: string): Promise<{message: string} | null> => {
    try {
        const response = await fetch(`${API_URL}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        return await handleResponse(response);
    } catch(error) {
        console.error("Password reset request failed:", error);
        // We still resolve to give generic feedback to the user
        return { message: "If an account with that email exists, a password reset link has been sent." };
    }
}

export const resetPassword = async (token: string, password: string): Promise<{message: string} | null> => {
    const response = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
    });
    return handleResponse(response);
}

export const getUserById = async (id: number): Promise<User | null> => {
    try {
        const response = await fetch(`${API_URL}/users/${id}`);
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to get user:", error);
        return null;
    }
};

export const updateUser = async (id: number, userData: Partial<Omit<User, 'id' | 'password'>>): Promise<User | null> => {
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to update user:", error);
        return null;
    }
};

// --- Waste API ---
export const getWastes = async (userId: number): Promise<Waste[]> => {
    try {
        const response = await fetch(`${API_URL}/wastes/user/${userId}`);
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to get wastes:", error);
        return [];
    }
};

export const addWaste = async (wasteData: Omit<Waste, 'id' | 'created_at'>): Promise<Waste> => {
    const response = await fetch(`${API_URL}/wastes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wasteData),
    });
    return handleResponse(response);
};

export const updateWaste = async (id: number, wasteData: Partial<Omit<Waste, 'id' | 'created_at' | 'user_id'>>): Promise<Waste | null> => {
    try {
        const response = await fetch(`${API_URL}/wastes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(wasteData),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to update waste:", error);
        return null;
    }
};

export const deleteWaste = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/wastes/${id}`, {
            method: 'DELETE',
        });
        await handleResponse(response);
        return true;
    } catch (error) {
        console.error("Failed to delete waste:", error);
        return false;
    }
};

// --- Log API ---
export const getLogs = async (userId: number): Promise<SystemLog[]> => {
    try {
        const response = await fetch(`${API_URL}/logs/user/${userId}`);
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to get logs:", error);
        return [];
    }
};