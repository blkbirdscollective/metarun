import { useState, useEffect, useCallback } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getTokenBalance } from '../utils'

export default function useTokenBalance(tokenContract) {
  const { account } = useActiveWeb3React()

  const [tokenAmount, setTokenAmount] = useState(0)

  const fetchBalance = useCallback(async () => {
    const amount = await getTokenBalance(tokenContract, account)
    setTokenAmount(parseFloat(amount).toString().match(/^-?\d+(?:\.\d{0,3})?/)[0].toLocaleString());
  }, [account, tokenContract])

  useEffect(fetchBalance, [fetchBalance])

  return { tokenAmount }
}
