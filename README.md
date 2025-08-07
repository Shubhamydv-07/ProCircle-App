# ProCircle-App
A modern, full-stack social networking platform built with React, Node.js, Express, and MongoDB.

## Features

### ✅ User Authentication
- User registration with email and password
- User login with JWT authentication
- Secure password hashing with bcrypt
- Protected routes and middleware

### ✅ Public Post Feed
- Create, read, and display text-only posts
- Home feed with author's name and timestamp
- Like/unlike posts functionality
- Real-time post updates

### ✅ Profile Management
- User profiles with name, email, bio, and profile picture
- Edit profile information
- View user's posts on their profile
- Public profile pages for other users

### ✅ Social Features
- Like and unlike posts
- Comment system (backend ready)
- Post creation and deletion
- User post history

## Tech Stack

### Frontend
- **React** - UI library
- **Material-UI** - Component library for modern design
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Task-1
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (optional - uses default values)
echo "JWT_SECRET=your-secret-key" > .env

# Start the server
npm run dev
```

The backend will run on `http://localhost:8080`

### 3. Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will run on `http://localhost:3000`

### 4. Database Setup

Make sure MongoDB is running on your system:

```bash
# Start MongoDB (Windows)
mongod

# Start MongoDB (macOS/Linux)
sudo systemctl start mongod
```

The application will automatically connect to `mongodb://localhost:27017/linkedin-clone`

## Project Structure

```
Task-1/
├── server/                 # Backend
│   ├── config/            # Database configuration
│   ├── controller/        # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── model/            # Mongoose models
│   ├── router/           # Express routes
│   ├── package.json
│   └── server.js         # Main server file
├── client/               # Frontend
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── context/      # React context
│   │   ├── pages/        # Page components
│   │   ├── App.js        # Main app component
│   │   └── index.js      # Entry point
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile/me` - Get current user profile
- `PUT /api/users/profile/update` - Update user profile
- `GET /api/users/:id` - Get user by ID

### Posts
- `GET /api/posts` - Get all posts (home feed)
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get single post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comment` - Add comment to post
- `GET /api/posts/user/:userId` - Get posts by user

## Usage

### 1. Register/Login
- Navigate to the application
- Click "Join" to register or "Sign In" to login
- Fill in your details and create an account

### 2. Create Posts
- After logging in, you'll see a "What do you want to talk about?" text area
- Type your post content and click "Post"

### 3. Interact with Posts
- Like/unlike posts by clicking the thumbs up icon
- View post details and comments
- Delete your own posts using the delete button

### 4. Manage Profile
- Click on your profile picture in the navbar
- Select "My Profile" to view and edit your profile
- Update your name, bio, and profile picture

### 5. View Other Users
- Click on any user's name in posts to view their profile
- Browse their posts and information

## Features in Detail

### Authentication System
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected routes and middleware
- Automatic token refresh

### Post System
- Real-time post creation and updates
- Like/unlike functionality
- Comment system (backend ready)
- Post deletion for own posts
- Pagination support

### User Profiles
- Editable profile information
- Profile picture support
- User post history
- Public profile pages

### Modern UI/UX
- Material-UI design system
- Responsive design
- Mobile-friendly interface
- Professional LinkedIn-like styling

## Development

### Running in Development Mode

```bash
# Backend (from server directory)
npm run dev

# Frontend (from client directory)
npm start
```

### Building for Production

```bash
# Frontend build
cd client
npm run build

# Backend production
cd server
npm start
```

## Environment Variables

Create a `.env` file in the server directory:

```env
JWT_SECRET=your-secret-key-here
MONGO_URI=mongodb://localhost:27017/linkedin-clone
PORT=8080
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions:

1. Check the console for error messages
2. Ensure MongoDB is running
3. Verify all dependencies are installed
4. Check that ports 3000 and 8080 are available

## Future Enhancements

- [ ] Real-time notifications
- [ ] Image upload for posts
- [ ] Advanced search functionality
- [ ] User connections/following
- [ ] Direct messaging
- [ ] Post sharing
- [ ] Advanced analytics
- [ ] Mobile app 