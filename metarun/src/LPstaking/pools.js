const isDevelopment = process.env.REACT_APP_HOST_ENV === 'development'

class StakingPool {
  constructor(durationInMinutes, rewards, availableInProduction, addresses) {
    this.APY = `${parseInt(rewards * 100)}%`
    this.maturity = {
      rewardsPercentage: rewards,
      durationInMilliseconds: durationInMinutes * 60 * 1000,
    }
    this.earlyMaturity = {
      rewardsPercentage: rewards / 2,
      durationInMilliseconds: (durationInMinutes / 2) * 60 * 1000,
    }
    this.address = isDevelopment ? addresses.development : addresses.production
    this.availableInProduction = availableInProduction
  }
}

const DAYS_IN_MINUTES = {
  2: 2880,
  7: 10080,
  30: 43200,
  90: 129600,
  180: 259200,
  360: 518400,
}

const stakingPools = [
  new StakingPool(DAYS_IN_MINUTES[7], 0.05, true, {
    development: '0xD4d1F48c2CF25C0C8b06937EEC75c27EDC050A38',
    production: '0xE826448bf2f5772b8CC327c12dFc9CB1d5B65692',
  }),
]

export default stakingPools
