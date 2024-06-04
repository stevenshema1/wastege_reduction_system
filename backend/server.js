// A simple Node.js + Express backend for the Wastage Reduction System
// To run: `npm install` then `npm start` in your terminal.
// This will start a server on http://localhost:3001

const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = 3001;

// --- Middleware ---
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '5mb' })); // Increase limit for base64 images

// --- Enums ---
const WasteStatus = {
  Recycled: 'recycled',
  Disposed: 'disposed',
  Reused: 'reused',
};

const LogActionType = {
    WASTE_ADDED: 'WASTE_ADDED',
    WASTE_UPDATED: 'WASTE_UPDATED',
    WASTE_DELETED: 'WASTE_DELETED',
    USER_LOGIN: 'USER_LOGIN',
};

// --- Hashing Helper ---
const hashPassword = (password) => {
    // In a real app, use a library like bcrypt with per-user salts.
    // For this demo, a simple SHA256 hash is sufficient.
    return crypto.createHash('sha256').update(password).digest('hex');
};

// --- In-Memory Database ---
let users = [
    { id: 1, username: 'Admin User', email: 'admin@example.com', password: hashPassword('password123'), monthly_target: 50, profile_picture_url: null },
];

let wastes = [
    {
        id: 1,
        type: 'Plastic Bottles',
        quantity: 5.2,
        unit: 'kg',
        category: 'Plastics',
        status: WasteStatus.Recycled,
        location: 'Kitchen',
        notes: 'Mainly water bottles',
        created_at: new Date('2023-10-01T10:00:00Z').toISOString(),
        user_id: 1,
    },
    {
        id: 2,
        type: 'Food Scraps',
        quantity: 10,
        unit: 'kg',
        category: 'Organic Waste',
        status: WasteStatus.Disposed,
        location: 'Kitchen',
        notes: 'Vegetable peels and leftovers',
        created_at: new Date('2023-10-02T11:30:00Z').toISOString(),
        user_id: 1,
    },
];

let logs = [];
let passwordResetTokens = new Map(); // Using a Map is better for token management

let nextUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
let nextWasteId = wastes.length > 0 ? Math.max(...wastes.map(w => w.id)) + 1 : 1;
let nextLogId = logs.length > 0 ? Math.max(...logs.map(l => l.id)) + 1 : 1;


// --- Internal Helper Functions ---
const addLog = (logData) => {
    const newLog = {
        ...logData,
        id: nextLogId++,
        created_at: new Date().toISOString(),
    };
    logs.push(newLog);
};

// --- API Routes ---
app.get('/', (req, res) => {
    res.send('<h1>Wastage Reduction System API</h1><p>Server is running correctly. The frontend application will connect to this backend. All API endpoints are available under the /api path.</p>');
});

app.get('/api', (req, res) => {
    res.send('Wastage Reduction System API is running!');
});

// --- User Routes ---
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = hashPassword(password);
    const user = users.find(u => u.email === email && u.password === hashedPassword);
    if (user) {
        addLog({ user_id: user.id, action: LogActionType.USER_LOGIN, description: 'User successfully logged in.' });
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.post('/api/register', (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        if (users.some(u => u.email === email)) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        
        const newUser = {
            id: nextUserId++,
            username,
            email,
            password: hashPassword(password),
            monthly_target: 0,
            profile_picture_url: null,
        };
        
        users.push(newUser);
        
        const { password: _, ...userWithoutPassword } = newUser;
        
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error('Error in /api/register:', error);
        res.status(500).json({ message: 'An internal server error occurred during registration.' });
    }
});

app.post('/api/forgot-password', (req, res) => {
    const { email } = req.body;
    const user = users.find(u => u.email === email);

    if (user) {
        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 3600000); // 1 hour expiry

        passwordResetTokens.set(token, { email, expires });

        console.log(`Password reset link for ${email}: http://localhost:5173/#/reset-password?token=${token}`);
    } else {
        console.log(`Password reset attempted for non-existent email: ${email}`);
    }
    
    res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
});

app.post('/api/reset-password', (req, res) => {
    const { token, password } = req.body;

    const tokenData = passwordResetTokens.get(token);

    if (!tokenData || tokenData.expires < new Date()) {
        return res.status(400).json({ message: 'Token is invalid or has expired.' });
    }

    const { email } = tokenData;
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex !== -1) {
        users[userIndex].password = hashPassword(password);
        passwordResetTokens.delete(token); // Invalidate the token after use
        res.json({ message: 'Password has been reset successfully.' });
    } else {
        res.status(404).json({ message: 'User not found.' });
    }
});


app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
         const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.put('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex !== -1) {
        // Explicitly update only allowed fields to prevent security issues
        const { monthly_target, profile_picture_url } = req.body;
        if(monthly_target !== undefined) {
            users[userIndex].monthly_target = monthly_target;
        }
        if(profile_picture_url !== undefined) {
             users[userIndex].profile_picture_url = profile_picture_url;
        }

        const { password, ...userWithoutPassword } = users[userIndex];
        res.json(userWithoutPassword);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// --- Waste Routes ---
app.get('/api/wastes/user/:userId', (req, res) => {
    const userWastes = wastes.filter(w => w.user_id === parseInt(req.params.userId));
    res.json(userWastes);
});

app.post('/api/wastes', (req, res) => {
    const newWaste = {
        ...req.body,
        id: nextWasteId++,
        created_at: new Date().toISOString(),
    };
    wastes.push(newWaste);
    addLog({
        user_id: newWaste.user_id,
        action: LogActionType.WASTE_ADDED,
        description: `Added ${newWaste.quantity} ${newWaste.unit} of ${newWaste.type}.`
    });
    res.status(201).json(newWaste);
});

app.put('/api/wastes/:id', (req, res) => {
    const wasteIndex = wastes.findIndex(w => w.id === parseInt(req.params.id));
    if (wasteIndex !== -1) {
        const originalWaste = {...wastes[wasteIndex]};
        wastes[wasteIndex] = { ...wastes[wasteIndex], ...req.body };
        const updatedWaste = wastes[wasteIndex];
         addLog({
            user_id: updatedWaste.user_id,
            action: LogActionType.WASTE_UPDATED,
            description: `Updated waste record for ${originalWaste.type}.`
        });
        res.json(updatedWaste);
    } else {
        res.status(404).json({ message: 'Waste record not found' });
    }
});

app.delete('/api/wastes/:id', (req, res) => {
    const wasteIndex = wastes.findIndex(w => w.id === parseInt(req.params.id));
    if (wasteIndex !== -1) {
        const [deletedWaste] = wastes.splice(wasteIndex, 1);
        addLog({
            user_id: deletedWaste.user_id,
            action: LogActionType.WASTE_DELETED,
            description: `Deleted ${deletedWaste.quantity} ${deletedWaste.unit} of ${deletedWaste.type}.`
        });
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Waste record not found' });
    }
});

// --- Log Routes ---
app.get('/api/logs/user/:userId', (req, res) => {
    const userLogs = logs
        .filter(l => l.user_id === parseInt(req.params.userId))
        .sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    res.json(userLogs);
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('---');
    console.log('Mock user for login:');
    console.log('Email: admin@example.com');
    console.log('Password: password123');
    console.log('---');
});