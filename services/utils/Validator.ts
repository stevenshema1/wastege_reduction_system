/**
 * Robust Data Validator Utility
 * Provides a schema-based validation mechanism for application data.
 */

type ValidationRule = (value: any) => string | null;

export const Rules = {
    required: (msg = 'Field is required'): ValidationRule => (val) => 
        (val === undefined || val === null || val === '') ? msg : null,
    
    email: (msg = 'Invalid email format'): ValidationRule => (val) => 
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? null : msg,
    
    minLength: (min: number, msg?: string): ValidationRule => (val) => 
        (val && val.length >= min) ? null : (msg || `Minimum length is ${min}`),
    
    numeric: (msg = 'Must be a number'): ValidationRule => (val) => 
        isNaN(Number(val)) ? msg : null,
};

export class Validator {
    static validate(data: Record<string, any>, schema: Record<string, ValidationRule[]>) {
        const errors: Record<string, string> = {};

        Object.keys(schema).forEach(field => {
            const rules = schema[field];
            const value = data[field];

            for (const rule of rules) {
                const error = rule(value);
                if (error) {
                    errors[field] = error;
                    break;
                }
            }
        });

        return {
            isValid: Object.keys(errors).length === 0,
            errors,
        };
    }
}
