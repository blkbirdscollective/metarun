const isDevelopment = process.env.HOST_ENV === 'development'

class StakingPool {
  constructor(durationInMinutes, rewards, availableInProduction, addresses, stakeMinimal) {
    this.APY = `${parseInt(rewards * 100)}%`
    this.EMAPY = `${parseInt(rewards * 100 / 2)}%`
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
    this.stakeMinimal = stakeMinimal
  }
}

const DAYS_IN_MINUTES = {
  2: 2880,
  7: 10080,
  60: 86400,
  90: 129600,
  180: 259200,
  360: 518400,
}

const stakingPools = [
  new StakingPool(DAYS_IN_MINUTES[60], 0.2, true, {
    development: '0xD4d1F48c2CF25C0C8b06937EEC75c27EDC050A38',
    production: '0x7d192A0F0Ba6Ab9595cA499d578dfda421611dcD',
  }, 0),
  new StakingPool(DAYS_IN_MINUTES[60], 0.35, true, {
    development: '0xD4d1F48c2CF25C0C8b06937EEC75c27EDC050A38',
    production: '0x268910D540a56785891EfC673ee42e2D594720Bb',
  }, 100000),
  new StakingPool(DAYS_IN_MINUTES[60], 0.5, true, {
    development: '0xF3f896901cfd1358dAF12975Dd750517bc607Af7',
    production: '0x392f03744A586eb7F58C0cD749a61E78D076d991',
  }, 250000),
  // new StakingPool(DAYS_IN_MINUTES[180], 0.65, true, {
  //   development: '0x1317F6a807B05D4262206cc8350493B6D9Ad3D61',
  //   production: '0x619f07316E352378b48Ca8934224e536ae752297',
  // }),
  // new StakingPool(DAYS_IN_MINUTES[360], 0.85, true, {
  //   development: '0xA6527d3984BAE125b3b969E96aB1955C74907cC9',
  //   production: '0x72678CDbECf223140C8141A1A9519379f57cb699',
  // }),
]

export default stakingPools
