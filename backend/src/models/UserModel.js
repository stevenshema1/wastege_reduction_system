/**
 * User Data Model
 * Handles persistence and validation for user accounts.
 */
const crypto = require('crypto');

class UserModel {
    constructor() {
        this.users = new Map();
        this.nextId = 1;
    }

    hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    async create(userData) {
        const { username, email, password } = userData;
        
        if (this.findByEmail(email)) {
            throw new Error('User with this email already exists');
        }

        const newUser = {
            id: this.nextId++,
            username,
            email,
            password: this.hashPassword(password),
            createdAt: new Date().toISOString(),
            profile: {
                bio: '',
                avatarUrl: null,
                organizationId: null,
            },
            settings: {
                darkMode: false,
                notifications: true,
            }
        };

        this.users.set(newUser.id, newUser);
        return this.sanitize(newUser);
    }

    findByEmail(email) {
        return Array.from(this.users.values()).find(u => u.email === email);
    }

    findById(id) {
        return this.users.get(parseInt(id));
    }

    sanitize(user) {
        const { password, ...safeUser } = user;
        return safeUser;
    }
}

module.exports = new UserModel();
