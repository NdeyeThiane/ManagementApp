import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/api/users');
  return response.data;
});

export const sendInvitation = createAsyncThunk('users/sendInvitation', async ({ email, role }) => {
  const response = await axios.post('/api/generate-invitation', { email, role });
  return response.data;
});


export const updateUser = createAsyncThunk('users/updateUser', async ({ userId, ...userData }) => {
  const response = await axios.put(`/api/users/${userId}`, userData);
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null, 
    invitationStatus: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      
      .addCase(sendInvitation.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendInvitation.fulfilled, (state, action) => {
        state.loading = false;
        state.invitationStatus = 'Invitation sent successfully';
      })
      .addCase(sendInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
