const express = require('express');
const cors = require('cors');
const { connection } = require('./config/db');
const userRouter = require('./router/user.router');
const postRouter = require('./router/post.router');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to ProCircle Clone API');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`✅ Server is running on port ${PORT}`);
        console.log(`🌐 Live link: http://localhost:${PORT}`);
    } catch (error) {
        console.log('❌ Error connecting to database:', error);
    }
});
