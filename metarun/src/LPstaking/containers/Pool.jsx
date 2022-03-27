/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useCallback } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { format } from 'date-fns'

import Pool from '../components/Pool'

// import { useAuthContext } from "../contexts/AuthProvider";
import useStakingContract from '../hooks/useStakingContract'
import { getReadableBigNumber, toFixed } from '../utils'

const convertNumberToWei = (n) => {
  let numberOfTokens = n * 1e18

  if (numberOfTokens.toString().search('e') > 0) {
    numberOfTokens = toFixed(numberOfTokens)
  }

  return numberOfTokens
}

// So far this component is a bit messy, but it encapsulates all the
// functionality staking should have i.e. approving, staking and claiming besides
// all information about the pool in particular.
// onUpdateTotalStaked is the function used to inject the total amount in the application header
// (or anywhere else)

export default function PoolContainer({ pool, address, onUpdateTotalStaked }) {
  // const { authData } = useAuthContext();
  const { account } = useActiveWeb3React()

  // const { tokenToUSD } = useConversionContext();

  // I'm using context for the Token Contract because it's
  // going to be reused throughout the entire app. As opposed to
  // staking contracts, where each pool is going to have
  // it's own contract.
  const poolContract = useStakingContract(address)

  const [loading, setLoading] = useState(true)

  const [state, setState] = useState({
    rewardEarned: 0,
    poolBal: 0,
    poolDepositTime: 0,
    totalDeposits: 0,
    poolPayouts: 0,
    rewardEarnedUser: 0,
    maxPayout: 0,
  })

  const { rewardEarned, poolBal, poolDepositTime, totalDeposits, poolPayouts, rewardEarnedUser, maxPayout } = state

  const userInfo = useCallback(async () => {
    if (!poolContract || !account) return

    setLoading(true)

    try {
      const result = await poolContract.userInfo(pool.poolNumber.toNumber(), account)

      setState((prev) => ({
        ...prev,
        poolBal: getReadableBigNumber(result.poolBal),
        poolDepositTime: result.pool_deposit_time * 1000,
        rewardEarnedUser: getReadableBigNumber(result.rewardEarned),
        poolPayouts: getReadableBigNumber(result.pool_payouts),
        totalDeposits: getReadableBigNumber(result.total_deposits),
      }))
    } catch (error) {
      console.log({ error })
    } finally {
      setLoading(false)
    }
  }, [poolContract, pool, account])

  const calculateReward = useCallback(async () => {
    if (!poolContract || !account) return

    setLoading(true)

    try {
      const result = await poolContract.rewardsCalculate(pool.poolNumber.toNumber(), account)
      setState((prev) => ({
        ...prev,
        rewardEarned: result / 1e18,
      }))
    } catch (error) {
      console.log({ error })
    } finally {
      setLoading(false)
    }
  }, [poolContract, pool.poolNumber, account])

  const maxPayoutOf = useCallback(async () => {
    if (!poolContract || !account) return

    const amount = convertNumberToWei(poolBal)
    setLoading(true)

    try {
      const result = await poolContract.maxPayoutOf(pool.poolNumber.toNumber(), amount.toString())

      setState((prev) => ({
        ...prev,
        maxPayout: getReadableBigNumber(result),
      }))
    } catch (error) {
      console.log({ error })
    } finally {
      setLoading(false)
    }
  }, [poolContract, pool, poolBal, account])

  useEffect(() => {
    userInfo()
  }, [userInfo])

  useEffect(() => {
    calculateReward()
  }, [calculateReward])

  useEffect(() => {
    maxPayoutOf()
  }, [maxPayoutOf])

  const isLoggedIn = Boolean(account)
  const isUnavailable = !isLoggedIn
  const isStaking = poolBal > 0
  const maturityTime = pool.fullMaturityTime
  const durationInMinutes = maturityTime * 60 * 1000

  const depositPoolTime = poolDepositTime ? format(poolDepositTime, 'dd/MM/yyyy, HH:mm:ss') : '--'
  const fmt = poolDepositTime ? format(durationInMinutes + poolDepositTime, 'dd/MM/yyyy, HH:mm:ss') : '--'

  // const poolBalanceInUSD = useMemo(
  // 	() => currencify(tokenToUSD(poolBalance)),
  // 	[tokenToUSD, poolBalance]
  // );

  useEffect(() => {
    onUpdateTotalStaked(totalDeposits.toFixed(2), rewardEarnedUser.toFixed(2), pool.lpToken, poolPayouts.toFixed(2))
  }, [totalDeposits, rewardEarnedUser, poolPayouts, isUnavailable, pool.lpToken, onUpdateTotalStaked])

  useEffect(() => {
    if (isUnavailable) {
      onUpdateTotalStaked(0, 0)
    }
    if (!isStaking) {
      setState((prev) => ({
        ...prev,
        rewardEarned: 0,
      }))
    }
  }, [onUpdateTotalStaked, isUnavailable, totalDeposits, isStaking])

  return (
    // <Pool
    //   poolNumber={pool.poolNumber.toNumber()}
    //   poolRewardPercent={pool.poolRewardPercent.toNumber()}
    //   poolDays={pool.poolDays.toNumber()}
    //   poolReward={rewardEarned.toLocaleString()}
    //   fullMaturityTime={fmt}
    //   poolLimit={getReadableBigNumber(pool.poolLimit)}
    //   poolStaked={getReadableBigNumber(pool.poolStaked)}
    //   poolBal={poolBal}
    //   poolDepositTime={depositPoolTime}
    //   totalDeposits={totalDeposits}
    //   poolPayouts={poolPayouts}
    //   maxPayout={maxPayout}
    //   contract={poolContract}
    //   isLoading={loading}
    //   isStaking={isStaking}
    //   onRefetch={userInfo}
    //   isUnavailable={isUnavailable}
    //   token={pool.lpToken}
    // />
	<>
	<Pool
      poolNumber={pool.poolNumber.toNumber()}
      poolRewardPercent={3000}
      poolDays={pool.poolDays.toNumber()}
      poolReward={rewardEarned.toLocaleString()}
      fullMaturityTime={fmt}
      poolLimit={getReadableBigNumber(pool.poolLimit)}
      poolStaked={getReadableBigNumber(pool.poolStaked)}
      poolBal={poolBal}
      poolDepositTime={depositPoolTime}
      totalDeposits={totalDeposits}
      poolPayouts={poolPayouts}
      maxPayout={maxPayout}
      contract={poolContract}
      isLoading={loading}
      isStaking={isStaking}
      onRefetch={userInfo}
      isUnavailable={isUnavailable}
      token={pool.lpToken}
    /> 
	<Pool
      poolNumber={pool.poolNumber.toNumber()}
      poolRewardPercent={4000}
      poolDays={pool.poolDays.toNumber()}
      poolReward={rewardEarned.toLocaleString()}
      fullMaturityTime={fmt}
      poolLimit={getReadableBigNumber(pool.poolLimit)}
      poolStaked={getReadableBigNumber(pool.poolStaked)}
      poolBal={poolBal}
      poolDepositTime={depositPoolTime}
      totalDeposits={totalDeposits}
      poolPayouts={poolPayouts}
      maxPayout={maxPayout}
      contract={poolContract}
      isLoading={loading}
      isStaking={isStaking}
      onRefetch={userInfo}
      isUnavailable={isUnavailable}
      token={pool.lpToken}
    /> 
	</>
  )
}
