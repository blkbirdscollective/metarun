/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-properties */
/* eslint-disable @typescript-eslint/no-shadow */ 
import { ethers } from 'ethers'
import { addMilliseconds, formatDistanceToNow } from 'date-fns'
import stakingAbi from './abis/staking'
import tokenAbi from './abis/token'

const isDevelopment = process.env.REACT_APP_HOST_ENV === 'development'

export const createStakingContract = (address, signer) => {
  if (!signer) return null
  const contractAddress = isDevelopment
  ? '0xCC5a9B82126f8a2570B98973BeE70936214c9928'
  : '0xdc1399d420358ae5f1bc6fe52906fff3ca3a84e7' // 0x99f2342d37AfB7ed9DEf711407C6214E360e919C METARUN LP FARM ADDRESS

  return new ethers.Contract(contractAddress, stakingAbi, signer)
}

export const createMetamaskProvider = () => {
  return new ethers.providers.Web3Provider(window.ethereum)
}

export const createTokenContract = (address, signer) => {
	return new ethers.Contract(address, tokenAbi, signer);
};

export const getReadableBigNumber = (bn) => {
  const number = ethers.BigNumber.from(bn)
  return parseFloat(ethers.utils.formatUnits(number, 18))
}

export const addMillisecondsAndFormat = (durationInMs, startDate = new Date()) => {
  const finalDate = addMilliseconds(startDate, durationInMs)
  return formatDistanceToNow(finalDate)
}

export const getTokenBalance = async (contract, address) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
  if(!provider) return null;
	const newContract = createTokenContract(contract, provider.getSigner());
	

	if (!newContract || !address) return 0;
	const decimals = await newContract.decimals();
	const divDigit = 10 ** decimals;
	const balanceOf = await newContract.balanceOf(address);
	return (balanceOf.toString() / divDigit).toString();
};

export function copyToClipboard(text) {
  function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea')
    textArea.value = text

    // Avoid scrolling to bottom
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      const successful = document.execCommand('copy')
      const msg = successful ? 'successful' : 'unsuccessful'
      // eslint-disable-next-line no-console
      console.log(`Fallback: Copying text command was ${msg}`)
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err)
    }

    document.body.removeChild(textArea)
  }

  if (!navigator.clipboard) {
    fallbackCopyToClipboard(text)
    return
  }
  navigator.clipboard.writeText(text)
}

export const currencify = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

export const toFixed = (x) => {
  if (Math.abs(x) < 1.0) {
    // eslint-disable-next-line prefer-const
    let e = parseInt(x.toString().split('e-')[1])
    if (e) {
      x *= Math.pow(10, e - 1)
      x = `0.${new Array(e).join('0')}${x.toString().substring(2)}`
    }
  } else {
    let e = parseInt(x.toString().split('+')[1])
    if (e > 20) {
      e -= 20
      x /= Math.pow(10, e)
      x += new Array(e + 1).join('0')
    }
  }
  return x
}

export const getROI = (APY, amount) => {
  return APY * amount  
}
