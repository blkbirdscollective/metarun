/* eslint-disable react/jsx-filename-extension */
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { createContext, useContext,
  //  useCallback,
    useEffect, useState } from 'react'
import { createMetamaskProvider, createTokenContract } from '../utils'

// import { useAuthContext } from "./AuthProvider";

const TokenContractContext = createContext({})

export default function TokenContractProvider({ address, children }) {
  // const { authData } = useAuthContext();
  const { account } = useActiveWeb3React()

  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)

  // Create the provider once the app first loads
  useEffect(() => {
    const isLoggedIn = Boolean(account)

    if (isLoggedIn) {
      const newProvider = createMetamaskProvider()
      setProvider(newProvider)
    }
  }, [account])

  // When provider is created, create the contract
	useEffect(() => {
		async function callContract() {
			if (provider) {
				const signer = provider.getSigner();
				const newContract = await createTokenContract(address, signer);
				setContract(newContract);
			}
		}
		callContract();
	}, [address, provider]);

  // const contractSymbol = useCallback(async () => {
	// 	if (!contract || !account) return;
		

	// 	try {
	// 		const result = await contract.symbol();
	// 		console.log(result)

	// 	} catch (error) {
	// 		console.log({ error });
	// 	} finally {
	// 		console.log('error')
	// 	}
	// }, [contract, account]);


	// useEffect(() => {
	// 	contractSymbol();
	// }, [contractSymbol]);

  const value = { contract, provider }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <TokenContractContext.Provider value={value}>{children}</TokenContractContext.Provider>
  )
}

export function useTokenContractContext() {
  const context = useContext(TokenContractContext)

  if (context === undefined) {
    throw new Error('useTokenContractContext should be used inside an TokenContractProvider')
  }

  return context
}
