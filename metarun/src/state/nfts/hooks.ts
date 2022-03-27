import { useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { useAppDispatch } from "state"
import { useSelector } from "react-redux"
import { State } from "state/types"
import { fetchNfts } from "./actions"

export const useFetchNfts = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchNfts(account))
  }, [dispatch, account])
}

export const useNfts = () => {
  const nfts = useSelector((state: State) => state.nfts)
  return nfts;
}