import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API_URL } from "./constants";

// Thunks
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch users");
  return await response.json();
});

export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Failed to add user");
  return await response.json();
});

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, user }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error("Failed to edit user");
    return await response.json();
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete user");
  return id;
});

// Slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add User
      .addCase(addUser.fulfilled, (state, action) => {
        const user = action.payload;
        console.log("User added:", user);  // Log user data after it's added to the state
        state.users.push(user);
        toast.success(`${user.name} has been added`);
      })
      
      // Edit User
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
          toast.success(`${action.payload.name}'s details updated`);
        }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Delete User
      
      .addCase(deleteUser.fulfilled, (state, action) => {
        // Ensure we are deleting only the user that was clicked
        state.users = state.users.filter((user) => user.id !== action.payload);
        toast.success(`User has been removed`);
      })
      
  },
});

export default usersSlice.reducer;
