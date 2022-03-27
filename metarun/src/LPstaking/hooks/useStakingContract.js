import { ethers } from "ethers";
import { useState, useEffect } from 'react'
import { createStakingContract } from '../utils'

export default function useStakingContract(address) {
  const [contract, setContract] = useState(null)

	useEffect(() => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		if (!provider) return;
		const newContract = createStakingContract(address, provider.getSigner());
		setContract(newContract);
	}, [address]);

  return contract
}
