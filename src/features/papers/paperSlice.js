import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';

// ------------------- Async Thunks -------------------

// Submit paper
export const submitPaper = createAsyncThunk(
  'papers/submitPaper',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/papers/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Submit failed'
      );
    }
  }
);

// Update paper
export const updatePaper = createAsyncThunk(
  'papers/updatePaper',
  async ({ paperId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/papers/update/${paperId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Update failed'
      );
    }
  }
);

// Delete paper
export const deletePaper = createAsyncThunk(
  'papers/deletePaper',
  async (paperId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/papers/delete/${paperId}`);
      return { paperId, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Delete failed'
      );
    }
  }
);

// Update paper status (admin)
export const updatePaperStatus = createAsyncThunk(
  'papers/updatePaperStatus',
  async ({ paperId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/papers/status/${paperId}`, {
        status,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Status update failed'
      );
    }
  }
);

// Get all papers (admin)
export const getAllPapers = createAsyncThunk(
  'papers/getAllPapers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/papers');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Fetch failed'
      );
    }
  }
);

// Get user papers
export const getUserPapers = createAsyncThunk(
  'papers/getUserPapers',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/papers/user/${email}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Fetch failed'
      );
    }
  }
);

// ------------------- Slice -------------------

const paperSlice = createSlice({
  name: 'papers',
  initialState: {
    papers: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetPapers: (state) => {
      state.papers = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Paper
      .addCase(submitPaper.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitPaper.fulfilled, (state, action) => {
        state.loading = false;
        state.papers.push(action.payload);
      })
      .addCase(submitPaper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Paper
      .addCase(updatePaper.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaper.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.papers.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) state.papers[index] = action.payload;
      })
      .addCase(updatePaper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Paper
      .addCase(deletePaper.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePaper.fulfilled, (state, action) => {
        state.loading = false;
        state.papers = state.papers.filter(
          (p) => p._id !== action.payload.paperId
        );
      })
      .addCase(deletePaper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Paper Status
      .addCase(updatePaperStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaperStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.papers.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) state.papers[index] = action.payload;
      })
      .addCase(updatePaperStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Papers
      .addCase(getAllPapers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPapers.fulfilled, (state, action) => {
        state.loading = false;
        state.papers = action.payload;
      })
      .addCase(getAllPapers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get User Papers
      .addCase(getUserPapers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPapers.fulfilled, (state, action) => {
        state.loading = false;
        state.papers = action.payload;
      })
      .addCase(getUserPapers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPapers } = paperSlice.actions;
export default paperSlice.reducer;
