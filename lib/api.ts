import axiosInstance from './axios';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Hotel {
  _id: string;
  name: string;
  location: string;
  description: string;
  images: string[];
  price: number;
  rating: number;
  reviews: number;
  amenities: string[];
  rooms: Room[];
}

export interface Room {
  _id: string;
  name: string;
  price: number;
  capacity: number;
  description: string;
  amenities: string[];
}

export interface Cab {
  _id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  capacity: number;
  features: string[];
}

export interface Guide {
  _id: string;
  name: string;
  location: string;
  image: string;
  languages: string[];
  experience: number;
  rating: number;
  reviews: number;
  price: number;
  specialties: string[];
}

export interface Booking {
  _id: string;
  bookingId: string;
  bookingType: 'hotel' | 'cab' | 'guide';
  item: Hotel | Cab | Guide;
  checkIn?: Date;
  checkOut?: Date;
  date?: Date;
  time?: string;
  guests?: number;
  rooms?: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}

// Auth API
export const authAPI = {
  signup: async (name: string, email: string, password: string) => {
    const response = await axiosInstance.post('/auth/signup', {
      name,
      email,
      password,
    });
    return response.data;
  },

  signin: async (email: string, password: string) => {
    const response = await axiosInstance.post('/auth/signin', {
      email,
      password,
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },

  updateProfile: async (data: { name?: string; email?: string }) => {
    const response = await axiosInstance.put('/auth/me', data);
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await axiosInstance.put('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};

// Hotels API
export const hotelsAPI = {
  getAll: async (params?: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    amenities?: string[];
    search?: string;
  }) => {
    const response = await axiosInstance.get('/hotels', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/hotels/${id}`);
    return response.data;
  },
};

// Cabs API
export const cabsAPI = {
  getAll: async (params?: {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    capacity?: number;
  }) => {
    const response = await axiosInstance.get('/cabs', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/cabs/${id}`);
    return response.data;
  },
};

// Guides API
export const guidesAPI = {
  getAll: async (params?: {
    location?: string;
    language?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }) => {
    const response = await axiosInstance.get('/guides', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/guides/${id}`);
    return response.data;
  },
};

// Bookings API
export const bookingsAPI = {
  getAll: async () => {
    const response = await axiosInstance.get('/bookings');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/bookings/${id}`);
    return response.data;
  },

  bookHotel: async (data: {
    hotelId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms: number;
    totalAmount: number;
    paymentMethod: string;
  }) => {
    const response = await axiosInstance.post('/bookings/hotel', data);
    return response.data;
  },

  bookCab: async (data: {
    cabId: string;
    date: string;
    time: string;
    totalAmount: number;
    paymentMethod: string;
  }) => {
    const response = await axiosInstance.post('/bookings/cab', data);
    return response.data;
  },

  bookGuide: async (data: {
    guideId: string;
    date: string;
    totalAmount: number;
    paymentMethod: string;
  }) => {
    const response = await axiosInstance.post('/bookings/guide', data);
    return response.data;
  },

  cancelBooking: async (id: string) => {
    const response = await axiosInstance.patch(`/bookings/${id}/cancel`);
    return response.data;
  },
};