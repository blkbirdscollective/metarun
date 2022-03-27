import { ethers } from "ethers";
import { useState, useEffect } from "react";
// import { useTokenContractContext } from "../contexts/TokenContractProvider";
import { createTokenContract } from "../utils";

// const contractAddress = "0xCC5a9B82126f8a2570B98973BeE70936214c9928"
export default function useTokenContract(address) {
	// const { contract: tokenContract } = useTokenContractContext();
	
	const [contract, setContract] = useState(null);
	
	useEffect(() => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		if (!provider) return;
		const newContract = createTokenContract(address, provider.getSigner());
		setContract(newContract);
	}, [address]);

	return contract;
}
