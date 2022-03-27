/* eslint-disable react/jsx-filename-extension */
import React, { useCallback, useState } from 'react'
import {
  Flex,
  Text,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { colors } from 'components/Colors'

import { useTokenContractContext } from '../contexts/TokenContractProvider'

import useTokenBalance from '../hooks/useTokenBalance'
import useCustomToast from '../hooks/useCustomToast'

import { toFixed } from '../utils'
// import { useAuthContext } from '../contexts/AuthProvider'

const convertNumberToWei = (n) => {
  let numberOfTokens = n * 1e18

  if (numberOfTokens.toString().search('e') > 0) {
    numberOfTokens = toFixed(numberOfTokens)
  }

  return numberOfTokens
}

export default function StakingModal({ contract, isTriggerDisabled, isStaking, onRefetch }) {
  const toast = useCustomToast()
  // const { authData } = useAuthContext();
  const { contract: tokenContract, provider } = useTokenContractContext()
  const tokenBalance = useTokenBalance()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { account } = useActiveWeb3React()

  const [amount, setAmount] = useState(0)
  const [invalid, setInvalid] = useState(false)

  // Simulating a state machine to make it more readable.
  // Optimal case would be a proper library like react-robot
  // but not enough time to configure
  const [currentStep, setCurrentStep] = useState('idle')

  const onMaxButtonClick = useCallback(() => {
    setAmount(tokenBalance.tokenAmount)
  }, [tokenBalance])

  const onChangeAmount = useCallback(
    (e) => {
      e.preventDefault()

      if (parseFloat(e.target.value) > tokenBalance.tokenAmount) {
        setInvalid(true)
      } else {
        setInvalid(false)
      }

      setAmount(e.target.value)
    },
    [tokenBalance.tokenAmount],
  )

  const onApprove = useCallback(() => {
    if (!amount) return

    setCurrentStep('waitingForApproval')

    const numberOfTokens = convertNumberToWei(amount)

    // Sorry for the callback hell. Do what you gotta do.
    // I need to add those callbacks to callback queue so
    // the user can browser around on the site doing other things
    // while he/she waits.
    // That's literally the only reason why I'm doing that .
    tokenContract
      .approve(contract.address, numberOfTokens.toString())
      .then((response) => {
        provider.waitForTransaction(response.hash, 1).then(() => {
          tokenContract.allowance(account, contract.address).then(() => {
            setCurrentStep('canStake')
            toast.success('You can now stake', 'Transaction successfully approved')
          })
        })
      }, [])
      .catch(() => {
        setCurrentStep('idle')
        toast.error('Oops..', 'Something went wrong during approval')
      })

    onClose()
  }, [tokenContract, amount, account, provider, contract, toast, onClose])

  const onStake = () => {
    const numberOfTokens = convertNumberToWei(amount)

    setCurrentStep('tryingToStake')

    contract
      .PoolStake(numberOfTokens.toString())
      .then((response) => {
        provider.waitForTransaction(response.hash, 1).then(() => {
          setCurrentStep('hasStaked')
          toast.success('Finally', 'Your tokens are now being staked')
          onRefetch()
        })
      })
      .catch((err) => {
        setCurrentStep('canStake')
        toast.error('Oops..',  err.data.message)
      })
  }

  const onClaim = () => {
    setCurrentStep('claiming')
    contract
      .claimPool()
      .then((response) => {
        provider
          .waitForTransaction(response.hash, 1)
          .then(() => {
            setCurrentStep('idle')
            toast.success('Money', 'Your tokens were returned to your wallet')
            onRefetch()
          })
          .catch(() => {
            setCurrentStep('idle')
            toast.success('Oops..', 'Something went wrong while claiming your tokens')
          })
      })
      .catch((error) => {
        setCurrentStep('idle')
        if (error.data && error.data.message) {
          toast.error('Oops..', error.data.message)
        }
      })
  }

  if (isStaking) {
    const isClaiming = currentStep === 'claiming'
    return (
        <Button onClick={onClaim} isLoading={isClaiming} bgGradient={`linear(to-l, ${colors.default}, ${colors.primary})`}>
        Unstake
      </Button>
    )
  }

  const isIdle = currentStep === 'idle'
  const isTryingToStake = currentStep === 'tryingToStake'
  const isWaitingForApproval = currentStep === 'waitingForApproval'
  const canStake = currentStep === 'canStake'

  return (
    <>
      {(isIdle || isWaitingForApproval) && (
        <Button
          isLoading={isWaitingForApproval}
          isDisabled={isTriggerDisabled}
          loadingText="Waiting for Approval"
          onClick={onOpen}
          bgGradient={`linear(to-l, ${colors.default}, ${colors.primary})`}
        >
          Stake
        </Button>
      )}
      {(canStake || isTryingToStake) && (
        <Button
          isLoading={isTryingToStake}
          isDisabled={isTriggerDisabled}
          loadingText="Waiting for Confirmation"
          onClick={onStake}
          bgGradient={`linear(to-l, ${colors.default}, ${colors.primary})`}
        >
          Confirm
        </Button>
      )}
      <Modal style={{border: '1px solid rgb(41, 44, 114)'}} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bg={colors.legend} color={colors.white}>
          <ModalHeader>Token Amount</ModalHeader>
          <ModalCloseButton />
          <ModalBody bg={colors.legend} color={colors.white}>
            <InputGroup>
              <Input
                value={amount}
                onChange={onChangeAmount}
                // variant="filled"
                focusBorderColor="blue.500"
                isInvalid={invalid}
                placeholder="0"
              />
              <InputRightElement
                minW="60px"
                // eslint-disable-next-line react/no-children-prop
                children={
                  <Button variant="text" onClick={onMaxButtonClick}>
                    MAX
                  </Button>
                }
              />
            </InputGroup>
            <Flex justify="flex-start">
              <Text mt={2} color="white.600">
                Balance: {parseFloat(tokenBalance.tokenAmount).toLocaleString()}
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter bg={colors.legend} color={colors.white}>
            <Stack direction="row">
              <Button onClick={onClose} variant="ghost" colorScheme="red">
                Close
              </Button>
              <Button onClick={onApprove} disabled={invalid} bgGradient={`linear(to-l, ${colors.default}, ${colors.primary})`}>
                Approve
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
