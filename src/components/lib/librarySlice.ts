import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchedPokemon } from 'src/hooks/usePokemon';
import { fetchPokemonCatalog } from './libraryThunk';

interface LibraryState {
  catalog: FetchedPokemon[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LibraryState = {
  catalog: [],
  status: 'idle',
  error: null,
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    setPokemonCatalog(state, action: PayloadAction<FetchedPokemon[]>) {
      state.catalog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonCatalog.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPokemonCatalog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.catalog = action.payload;
      })
      .addCase(fetchPokemonCatalog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch catalog';
      });
  },
});

export const { setPokemonCatalog } = librarySlice.actions;
export default librarySlice.reducer;
