import React, { useCallback } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useDispatch } from 'react-redux'
import { Text, Button, Flex, InjectedModalProps } from '@blkbirds/uikit'
import { Modal, ModalHeader, ModalBody, ModalContent, ModalCloseButton, ModalOverlay, Box } from '@chakra-ui/react'

import { useTranslation } from 'contexts/Localization'
import { orderBy } from 'lodash'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import { AppDispatch } from 'state'
import { clearAllTransactions } from 'state/transactions/actions'
import { AutoRow } from '../../Layout/Row'
import Transaction from './Transaction'
import ConnectWalletButton from '../../ConnectWalletButton'

function renderTransactions(transactions: TransactionDetails[]) {
  return (
    <Flex flexDirection="column">
      {transactions.map((tx) => {
        return <Transaction key={tx.hash + tx.addedTime} tx={tx} />
      })}
    </Flex>
  )
}

const TransactionsModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const allTransactions = useAllTransactions()

  const { t } = useTranslation()

  const sortedRecentTransactions = orderBy(
    Object.values(allTransactions).filter(isTransactionRecent),
    'addedTime',
    'desc',
  )

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt)
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt)

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }))
  }, [dispatch, chainId])

  // title={t('Recent Transactions')} headerBackground="gradients.cardHeader" onDismiss={onDismiss}
  return (
    <Modal isCentered isOpen onClose={onDismiss}>
      <ModalOverlay />
      <ModalContent variant="base">
        <ModalHeader>{t('Recent Transactions')}</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <Box py={4}>
            {account ? (
              !!pending.length || !!confirmed.length ? (
                <>
                  <AutoRow mb="1rem" style={{ justifyContent: 'space-between' }}>
                    <Text>{t('Recent Transactions')}</Text>
                    <Button variant="tertiary" scale="xs" onClick={clearAllTransactionsCallback}>
                      {t('clear all')}
                    </Button>
                  </AutoRow>
                  {renderTransactions(pending)}
                  {renderTransactions(confirmed)}
                </>
              ) : (
                <Text>{t('No recent transactions')}</Text>
              )
            ) : (
              <ConnectWalletButton />
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default TransactionsModal
