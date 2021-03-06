const stakingAbi = [
	{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
	{
	  anonymous: false,
	  inputs: [
		{ indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
		{ indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
	  ],
	  name: 'OwnershipTransferred',
	  type: 'event',
	},
	{
	  anonymous: false,
	  inputs: [
		{ indexed: false, internalType: 'address', name: 'beneficiary', type: 'address' },
		{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
	  ],
	  name: 'PoolTransfer',
	  type: 'event',
	},
	{
	  anonymous: false,
	  inputs: [
		{ indexed: false, internalType: 'address', name: 'beneficiary', type: 'address' },
		{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
	  ],
	  name: 'RewardClaimed',
	  type: 'event',
	},
	{
	  anonymous: false,
	  inputs: [
		{ indexed: false, internalType: 'address', name: 'beneficiary', type: 'address' },
		{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
	  ],
	  name: 'TokenTransfer',
	  type: 'event',
	},
	{
	  inputs: [
		{ internalType: 'contract IERC20', name: '_lpToken', type: 'address' },
		{ internalType: 'contract IERC20', name: '_rewardToken', type: 'address' },
		{ internalType: 'uint256', name: '_poolRewardPercent', type: 'uint256' },
		{ internalType: 'uint256', name: '_poolDays', type: 'uint256' },
		{ internalType: 'uint256', name: '_fullMaturityTime', type: 'uint256' },
		{ internalType: 'uint256', name: '_poolLimit', type: 'uint256' },
	  ],
	  name: 'add',
	  outputs: [],
	  stateMutability: 'nonpayable',
	  type: 'function',
	},
	{
	  inputs: [{ internalType: 'address', name: '', type: 'address' }],
	  name: 'balances',
	  outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  inputs: [],
	  name: 'bnbBalance',
	  outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  inputs: [{ internalType: 'uint256', name: '_poolId', type: 'uint256' }],
	  name: 'claimPool',
	  outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
	  stateMutability: 'nonpayable',
	  type: 'function',
	},
	{
	  inputs: [],
	  name: 'divisorDays',
	  outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  inputs: [
		{ internalType: 'uint256', name: '_poolId', type: 'uint256' },
		{ internalType: 'address', name: 'userAdd', type: 'address' },
	  ],
	  name: 'maturityDate',
	  outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  inputs: [
		{ internalType: 'uint256', name: '_poolId', type: 'uint256' },
		{ internalType: 'uint256', name: '_amount', type: 'uint256' },
	  ],
	  name: 'maxPayoutOf',
	  outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  inputs: [],
	  name: 'owner',
	  outputs: [{ internalType: 'address', name: '', type: 'address' }],
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  inputs: [
		{ internalType: 'uint256', name: '_poolId', type: 'uint256' },
		{ internalType: 'bool', name: 'status', type: 'bool' },
	  ],
	  name: 'poolActivation',
	  outputs: [],
	  stateMutability: 'nonpayable',
	  type: 'function',
	},
	{
	  inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
	  name: 'poolInfo',
	  outputs: [
		{ internalType: 'contract IERC20', name: 'lpToken', type: 'address' },
		{ internalType: 'contract IERC20', name: 'rewardToken', type: 'address' },
		{ internalType: 'uint256', name: 'poolNumber', type: 'uint256' },
		{ internalType: 'uint256', name: 'poolRewardPercent', type: 'uint256' },
		{ internalType: 'uint256', name: 'poolDays', type: 'uint256' },
		{ internalType: 'uint256', name: 'fullMaturityTime', type: 'uint256' },
		{ internalType: 'uint256', name: 'poolLimit', type: 'uint256' },
		{ internalType: 'uint256', name: 'poolStaked', type: 'uint256' },
		{ internalType: 'bool', name: 'active', type: 'bool' },
	  ],
	  stateMutability: 'view',
	  type: 'function',
	},
	{ inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{
	  inputs: [
		{ internalType: 'address', name: '_tokenAddr', type: 'address' },
		{ internalType: 'uint256', name: 'amount', type: 'uint256' },
		{ internalType: 'address', name: 'toWallet', type: 'address' },
	  ],
	  name: 'retrieveBEP20TokenStuck',
	  outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
	  stateMutability: 'nonpayable',
	  type: 'function',
	},
	{
	  inputs: [{ internalType: 'address payable', name: 'wallet', type: 'address' }],
	  name: 'retrieveBnbStuck',
	  outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
	  stateMutability: 'nonpayable',
	  type: 'function',
	},
	{
	  inputs: [
		{ internalType: 'uint256', name: '_poolId', type: 'uint256' },
		{ internalType: 'address', name: 'userAddress', type: 'address' },
	  ],
	  name: 'rewardsCalculate',
	  outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  inputs: [
		{ internalType: 'uint256', name: '_poolId', type: 'uint256' },
		{ internalType: 'uint256', name: '_amount', type: 'uint256' },
	  ],
	  name: 'stakePool',
	  outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
	  stateMutability: 'nonpayable',
	  type: 'function',
	},
	{
	  inputs: [{ internalType: 'address', name: 'tokenAddr', type: 'address' }],
	  name: 'tokenBalance',
	  outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  inputs: [],
	  name: 'tokenDecimal',
	  outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  inputs: [],
	  name: 'totalPools',
	  outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  inputs: [],
	  name: 'totalStaked',
	  outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
	  stateMutability: 'view',
	  type: 'function',
	},
	{
	  inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
	  name: 'transferOwnership',
	  outputs: [],
	  stateMutability: 'nonpayable',
	  type: 'function',
	},
	{
	  inputs: [
		{ internalType: 'uint256', name: '', type: 'uint256' },
		{ internalType: 'address', name: '', type: 'address' },
	  ],
	  name: 'userInfo',
	  outputs: [
		{ internalType: 'uint256', name: 'poolBal', type: 'uint256' },
		{ internalType: 'uint40', name: 'pool_deposit_time', type: 'uint40' },
		{ internalType: 'uint256', name: 'total_deposits', type: 'uint256' },
		{ internalType: 'uint256', name: 'pool_payouts', type: 'uint256' },
		{ internalType: 'uint256', name: 'rewardEarned', type: 'uint256' },
	  ],
	  stateMutability: 'view',
	  type: 'function',
	},
	{ stateMutability: 'payable', type: 'receive' },
  ]
  
  export default stakingAbi
  