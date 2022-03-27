import { ethers } from "ethers"
import { getNftCreationContract } from "utils/contractHelpers"

const nftCreationContract = getNftCreationContract()
const blacklist = Array.from({ length: 15 });

export const getNftsIds = async (address: string): Promise<ethers.BigNumber[]> => {
  const ids = await nftCreationContract.getAllTokenIds(address)
  return ids.filter((id: ethers.BigNumber) => blacklist.indexOf(id.toNumber()) === -1)
}

export const getNftsImages = (ids: ethers.BigNumber[]): string[] => {
  // const hashes = await nftCreationContract.getHashBatch(ids)
  // const srcs = hashes.map((hash: string) => `https://cloudflare-ipfs.com/ipfs/${hash}`)
  // Instead of loading from IPFS, load from local files
  const srcs = ids.map(id => `/images/cards/${id.toNumber()}.png`)
  return srcs
}

export const getNftsAmount = async (address: string, ids: ethers.BigNumber[]): Promise<ethers.BigNumber[]> => {
  const amounts = []
  ids.forEach(id => amounts.push(nftCreationContract.balanceOf(address, id.toNumber())))
  return Promise.all(amounts)
}