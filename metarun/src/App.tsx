import React, { lazy } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
// import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { AnimatePresence } from 'framer-motion'
import useEagerConnect from 'hooks/useEagerConnect'
import useUserAgent from 'hooks/useUserAgent'
import useScrollOnRouteChange from 'hooks/useScrollOnRouteChange'
import { usePollBlockNumber } from 'state/block/hooks'
import { usePollCoreFarmData } from 'state/farms/hooks'
import { useFetchProfile } from 'state/profile/hooks'
// import { nftsBaseUrl } from 'views/Nft/market/constants'
// import MyNfts from 'views/MyNfts'
// import NftMetaverse from 'views/NftMetaverse'
import GlobalStyle from './style/Global'
import PageLayout from './components/PageLayout'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import PageLoader from './components/Loader/PageLoader'
import GlobalCheckClaimStatus from './components/GlobalCheckClaimStatus'
import history from './routerHistory'
// import Swap from './views/Swap'
import { useInactiveListener } from './hooks/useInactiveListener'
// import LPFarm from './views/LPstake'
// import { RedirectPathToSwapOnly, RedirectToSwap } from './views/Swap/redirects'
// import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure } from './views/AddLiquidity/redirects'
// import RedirectOldRemoveLiquidityPathStructure from './views/RemoveLiquidity/redirects'

const NotFound = lazy(() => import('./views/NotFound'))
const Stake = lazy(() => import('./views/Stake'))
// const AddLiquidity = lazy(() => import('./views/AddLiquidity'))
// const Liquidity = lazy(() => import('./views/Pool'))
// const RemoveLiquidity = lazy(() => import('./views/RemoveLiquidity'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  // const { account } = useWeb3React()

  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()
  useScrollOnRouteChange()
  useUserAgent()
  useInactiveListener()

  return (
    <Router history={history}>
      <GlobalStyle />
      <GlobalCheckClaimStatus excludeLocations={[]} />
      <PageLayout>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Route
            render={({ location }) => (
              <AnimatePresence initial={false} exitBeforeEnter>
                <Switch location={location} key={location.pathname}>
                  <Route path="/" exact>
                    <Redirect to="/stake" />
                  </Route>
                  {/* <Route path="/nft-farm">
                    <NftFarm />
                  </Route> */}
                  {/* <Route path="/pools">
                    <Pools />
                  </Route> */}
                  {/* <Route path="/my-nfts">
                    <MyNfts />
                  </Route>
                  <Route path="/nft-metaverse">
                    <NftMetaverse />
                  </Route> */}
                  {/* Using this format because these components use routes injected props. We need to rework them with hooks */}
                  {/* <Route exact strict path="/swap" component={Swap} />
                  <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                  <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
                  <Route exact strict path="/liquidity" component={Liquidity} /> */}
                  <Route exact strict path="/stake" component={Stake} />
                  {/* <Route exact strict path="/lp-farm" component={LPFarm} /> 
                  <Route exact path="/add" component={AddLiquidity} />
                  <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                  <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                  <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                  <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                  <Route path="/pool">
                    <Redirect to="/liquidity" />
                  </Route> */}
                  {/* <Route path="/staking">
                    <Redirect to="/pools" />
                  </Route>
                  <Route path="/profile">
                    <Redirect to={`${nftsBaseUrl}/profile/${account?.toLowerCase() || ''}`} />
                  </Route> */}

                  <Route component={NotFound} />
                </Switch>
              </AnimatePresence>
            )}
          />
        </SuspenseWithChunkError>
      </PageLayout>
    </Router>
  )
}

export default React.memo(App)
