import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginApi,
  registerApi,
  verifyOtpApi,
  fetchMeApi,
  logoutApi,
} from "../api/auth.api";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      await loginApi(data);
      const res = await fetchMeApi();
      return res.data.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      await registerApi(data);
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data, { rejectWithValue }) => {
    try {
      const res = await verifyOtpApi(data);
      return res.data.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchMeApi();
      return res.data.data.user;
    } catch {
      return rejectWithValue(null);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutApi();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
    otpRequired: false,
    initialized: false,
  },
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchMe.pending, (s) => {
        s.status = "loading";
      })
      .addCase(fetchMe.fulfilled, (s, a) => {
        console.log("ME slice: ", a.payload);
        s.user = a.payload;
        s.status = "authenticated";
        s.initialized = true;
      })
      .addCase(fetchMe.rejected, (s) => {
        s.user = null;
        s.status = "unauthenticated";
        s.initialized = true;
      })

      .addCase(login.rejected, (s, a) => {
        s.error = a.payload;
      })

      .addCase(login.fulfilled, (s, a) => {
        console.log("Login slice: ", a.payload);
        s.user = a.payload;
        s.status = "authenticated";
        s.initialized = true;
      })

      .addCase(signup.fulfilled, (s) => {
        s.otpRequired = true;
      })
      .addCase(signup.rejected, (s, a) => {
        s.error = a.payload;
      })

      .addCase(verifyOtp.fulfilled, (s, a) => {
        s.otpRequired = false;
        s.user = a.payload;
        s.status = "authenticated";
        s.initialized = true;
      })
      .addCase(verifyOtp.rejected, (s, a) => {
        s.error = a.payload;
      })

      .addCase(logout.fulfilled, (s) => {
        s.user = null;
        s.status = "unauthenticated";
        s.initialized = true;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
