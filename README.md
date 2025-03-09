### Prerequisites
- Node.js (v16 or higher)
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/travelease.git
cd travelease
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/travelease
JWT_SECRET=your_jwt_secret_key_here
PORT=5001
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

4. Seed the database
```bash
node server/seed/index.js
```

5. Start the development server
```bash
# Start the backend server
npm run server

# In a separate terminal, start the frontend
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000`

### Default Users

After seeding the database, you can use the following credentials to log in:

**Admin User:**
- Email: admin@travelease.com
- Password: admin123

**Regular User:**
- Email: user@travelease.com
- Password: user123

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/me` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Hotels
- `GET /api/hotels` - Get all hotels (with optional filtering)
- `GET /api/hotels/:id` - Get hotel by ID
- `POST /api/hotels` - Create a new hotel (admin only)
- `PUT /api/hotels/:id` - Update hotel (admin only)
- `DELETE /api/hotels/:id` - Delete hotel (admin only)
- `POST /api/hotels/:id/rooms` - Add a room to a hotel (admin only)
- `PUT /api/hotels/:hotelId/rooms/:roomId` - Update a room (admin only)
- `DELETE /api/hotels/:hotelId/rooms/:roomId` - Delete a room (admin only)

### Cabs
- `GET /api/cabs` - Get all cabs (with optional filtering)
- `GET /api/cabs/:id` - Get cab by ID
- `POST /api/cabs` - Create a new cab (admin only)
- `PUT /api/cabs/:id` - Update cab (admin only)
- `DELETE /api/cabs/:id` - Delete cab (admin only)
- `PATCH /api/cabs/:id/availability` - Update cab availability (admin only)

### Guides
- `GET /api/guides` - Get all guides (with optional filtering)
- `GET /api/guides/:id` - Get guide by ID
- `POST /api/guides` - Create a new guide (admin only)
- `PUT /api/guides/:id` - Update guide (admin only)
- `DELETE /api/guides/:id` - Delete guide (admin only)
- `PATCH /api/guides/:id/availability` - Update guide availability (admin only)

### Bookings
- `GET /api/bookings` - Get all bookings for the current user
- `GET /api/bookings/all` - Get all bookings (admin only)
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings/hotel` - Create a new hotel booking
- `POST /api/bookings/cab` - Create a new cab booking
- `POST /api/bookings/guide` - Create a new guide booking
- `PATCH /api/bookings/:id/cancel` - Cancel a booking
- `PATCH /api/bookings/:id/status` - Update booking status (admin only)
- `PATCH /api/bookings/:id/payment` - Update payment status (admin only)

## Project Structure

```
travelease/
├── app/                  # Next.js app directory
│   ├── about/            # About page
│   ├── auth/             # Authentication pages
│   ├── booking-confirmation/ # Booking confirmation page
│   ├── cabs/             # Cabs pages
│   ├── contact/          # Contact page
│   ├── guides/           # Tour guides pages
│   ├── hotels/           # Hotels pages
│   ├── globals.css       # Global CSS
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── featured-destinations.tsx
│   ├── footer.tsx
│   ├── hero-section.tsx
│   ├── navbar.tsx
│   ├── services.tsx
│   ├── testimonials.tsx
│   └── theme-provider.tsx
├── hooks/                # Custom React hooks
│   ├── use-auth.ts       # Authentication hook
│   └── use-toast.ts      # Toast notification hook
├── lib/                  # Utility functions
│   ├── api.ts            # API client
│   └── utils.ts          # Utility functions
├── server/               # Backend server
│   ├── middleware/       # Express middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── seed/             # Database seed scripts
│   └── index.js          # Server entry point
├── .env                  # Environment variables
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## License

This project is licensed under the MIT License.