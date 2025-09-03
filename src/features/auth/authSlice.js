import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance.js';

// Register
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/register', formData);
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Registration failed';
      return rejectWithValue(message);
    }
  }
);

// ------------------ Verify OTP ------------------
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, otp, role }, { rejectWithValue }) => {
    try {
      console.log('Sending OTP payload:', { email, otp, role });
      const response = await axiosInstance.post('/users/verify-otp', {
        email,
        otp,
        role,
      });
      console.log('Verify OTP response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Verify OTP error:', error.response?.data || error);
      const message =
        error.response?.data?.message ||
        error.message ||
        'OTP verification failed';
      return rejectWithValue(message);
    }
  }
);

// ------------------ Resend OTP ------------------
export const resendOtp = createAsyncThunk(
  'auth/resendOtp',
  async ({ email, role }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/resend-otp', {
        email,
        role,
      });
      return response.data.message;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Resend OTP failed';
      return rejectWithValue(message);
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/login', credentials);
      return response.data.data;
    } catch (error) {
      // Get backend message if exists
      const message =
        error.response?.data?.message || error.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;

    try {
      const response = await axiosInstance.post(
        '/users/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.message;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Logout failed';
      return rejectWithValue(message);
    }
  }
);

// Refresh token API
export const refreshTokens = createAsyncThunk(
  'auth/refreshTokens',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axiosInstance.post('/users/refresh-token', {
        refreshToken: auth.refreshToken,
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Token refresh failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    role: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
    otpMessage: null,
  },
  reducers: {
    updateToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.role = action.payload.user?.role;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.role = action.payload.user?.role;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- Verify OTP ----------------
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- Resend OTP ----------------
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpMessage = null;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpMessage = action.payload;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.otpMessage = null;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })

      .addCase(refreshTokens.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      });
  },
});

export const { updateToken, logout } = authSlice.actions;
export default authSlice.reducer;
