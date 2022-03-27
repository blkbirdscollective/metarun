export enum NftFetchStatus {
  ERROR = 'error',
  NOT_FETCHED = 'not-fetched',
  FETCHING = 'fetching',
  FETCHED = 'fetched',
}

export interface Nft {
  id: number
  src: string
  amount: number
}

export interface NftsState {
  nfts: Nft[];
  nftsFetchStatus: NftFetchStatus
}
