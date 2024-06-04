/**
 * Authentication & Authorization Middleware
 */
const UserModel = require('../models/UserModel');

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];
    
    // In a real app, you'd verify a JWT here. 
    // For this mock, we'll use the user ID as a simple token.
    const user = UserModel.findById(token);

    if (!user) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = user;
    next();
};

exports.authorize = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }

        next();
    };
};
