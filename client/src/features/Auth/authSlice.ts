import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/models";
import { FieldValues } from "react-hook-form";
import agent from "../../api/agent";
import { toast } from "react-toastify";
interface accountState {
  user: User | null;
}
const initialState: accountState = {
  user: null,
};
export const loginIn = createAsyncThunk<User, FieldValues>(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const user = await agent.Auth.login(data);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const currentUser = createAsyncThunk<User>(
  "auth/currentUser",
  async (data, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const user = await agent.Auth.currentUser();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      const claims = JSON.parse(atob(action.payload.token.split(".")[1]));
      let roles =
        claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      state.user = {
        ...action.payload,
        roles: typeof roles === "string" ? [roles] : roles,
      };
    },
    deleteUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setMessages: (state, action) => {
      if (state.user) {
        state.user.messages = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginIn.fulfilled, (state, action) => {
      state.user = action.payload;
      const claims = JSON.parse(atob(action.payload.token.split(".")[1]));
      let roles =
        claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      state.user = {
        ...action.payload,
        roles: typeof roles === "string" ? [roles] : roles,
      };
      toast.success("Successfully logged in");
    });
    builder.addCase(loginIn.rejected, (state, action) => {
      state.user = null;
      toast.error("Wrong username or password");
    });
    builder.addCase(currentUser.rejected, (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    });
    builder.addCase(currentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      const claims = JSON.parse(atob(action.payload.token.split(".")[1]));
      let roles =
        claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      state.user = {
        ...action.payload,
        roles: typeof roles === "string" ? [roles] : roles,
      };
    });
  },
});

export const { setUser, deleteUser, setMessages } = authSlice.actions;
export default authSlice.reducer;
