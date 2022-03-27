import { createSlice } from "@reduxjs/toolkit"
import { NftsState, NftFetchStatus } from "./types"
import { fetchNfts } from "./actions"

const initialState = {
  nfts: [],
  nftsFetchStatus: NftFetchStatus.NOT_FETCHED
} as NftsState

const nftsSlice = createSlice({
  name: "nfts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNfts.pending, (state) => {
      state.nftsFetchStatus = NftFetchStatus.FETCHING
    })
      .addCase(fetchNfts.fulfilled, (state, action) => {
      state.nftsFetchStatus = NftFetchStatus.FETCHED
      state.nfts = action.payload
    })
      .addCase(fetchNfts.rejected, (state) => {
      state.nftsFetchStatus = NftFetchStatus.ERROR
    })
  }
})

export default nftsSlice.reducer