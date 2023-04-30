import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  post: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create new post
export const createPost = createAsyncThunk(
  "post/create",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.createPost(postData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Get Posts
export const getPosts = createAsyncThunk("post/getAll", async (_, thunkAPI) => {
  try {
    return await postService.getPosts();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Post
export const getPost = createAsyncThunk(
  "post/get",
  async (postId, thunkAPI) => {
    try {
      return await postService.getPost(postId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Update user post
export const updatePost = createAsyncThunk(
  "post/update",
  async ({ postId, postData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.updatePost(postId, postData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user post
export const deletePost = createAsyncThunk(
  "post/delete",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.deletePost(postId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;

export default postSlice.reducer;
