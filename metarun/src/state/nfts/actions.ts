import { createAsyncThunk } from "@reduxjs/toolkit";
import { getNftsIds, getNftsImages, getNftsAmount } from "./helpers";
import { Nft } from "./types"

export const fetchNfts = createAsyncThunk<Nft[], string>("nfts/fetchNfts", async (address: string) => {
  const ids = await getNftsIds(address)
  const images = getNftsImages(ids)
  const amounts = await getNftsAmount(address, ids)

  const nfts = [];
  
  for (let i = 0; i < ids.length; i++) {
    nfts.push({ 
      id: ids[i].toNumber(), 
      src: images[i],
      amount: amounts[i].toNumber()
    })
  }

  return nfts;
})