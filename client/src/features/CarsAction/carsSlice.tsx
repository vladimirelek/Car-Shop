import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Car, Filters } from "../../models/models";
import agent from "../../api/agent";
import { RootState } from "../../redux/store";
import { MetaData } from "../../models/pagination";

function convertFiltersToParams(productParams: Filters) {
  const params = new URLSearchParams();

  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  if (productParams.orderBy) {
    params.append("orderBy", productParams.orderBy);
  }

  if (productParams.searchTerm) {
    params.append("searchTerm", productParams.searchTerm);
  }

  if (productParams.fuel) {
    params.append("fuel", productParams.fuel);
  }
  if (productParams.proizvodjac) {
    params.append("proizvodjac", productParams.proizvodjac);
  }
  if (productParams.proizvodnjaOd) {
    params.append("proizvodnjaOd", productParams.proizvodnjaOd.toString());
  }
  if (productParams.proizvodnjaDo) {
    params.append("proizvodnjaDo", productParams.proizvodnjaDo.toString());
  }

  return params;
}

interface carState {
  cars: Car[];
  filters: Filters;
  featuredCars: Car[];
  metaData: MetaData | null;
  status: boolean;
  featuredCarsStatus: boolean;
}

function initParams(): Filters {
  return {
    pageNumber: 1,
    pageSize: 9,
    orderBy: "cijena",
    fuel: "",
    proizvodjac: "",
    proizvodnjaDo: 0,
    proizvodnjaOd: 0,
  };
}
const initialState: carState = {
  cars: [],
  filters: initParams(),
  featuredCars: [],
  metaData: null,
  status: false,
  featuredCarsStatus: false,
};
export const fetchCars = createAsyncThunk<Car[], void, { state: RootState }>(
  "cars/fetchCars",
  async (_, thunkAPI) => {
    try {
      const params = convertFiltersToParams(thunkAPI.getState().cars.filters);
      const response = await agent.Cars.getAllCars(params);
      console.log(response);
      thunkAPI.dispatch(setMetaData(response.metaData));
      return response.items;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
export const fetchFeaturedCars = createAsyncThunk<Car[]>(
  "cars/fetchFeaturedCars",
  async () => {
    const response = await agent.Cars.getFeaturedCars();
    return response;
  }
);
const carsSlice = createSlice({
  name: "cars",
  initialState,

  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    setFeaturedCars: (state, action) => {
      state.filters = action.payload;
    },
    setPageNumber: (state, action) => {
      state.status = false;
      state.filters = { ...state.filters, ...action.payload };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    setFilters: (state, action) => {
      state.status = false;
      state.filters = { ...state.filters, ...action.payload, pageNumber: 1 };
    },
    resetFilters: (state, action) => {
      state.status = false;
      state.filters = initParams();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.status = true;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.cars = [];
        state.status = false;
      })
      .addCase(fetchCars.pending, (state, action) => {
        state.status = false;
      })
      .addCase(fetchFeaturedCars.fulfilled, (state, action) => {
        state.featuredCars = action.payload;
        state.featuredCarsStatus = true;
      })
      .addCase(fetchFeaturedCars.pending, (state, action) => {
        state.featuredCarsStatus = false;
      });
  },
});

export default carsSlice.reducer;
export const {
  setFilters,
  setCars,
  setMetaData,
  setPageNumber,
  setFeaturedCars,
} = carsSlice.actions;
