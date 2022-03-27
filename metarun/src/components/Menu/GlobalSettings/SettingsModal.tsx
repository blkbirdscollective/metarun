import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Text,
  // PancakeToggle,
  Flex,
  InjectedModalProps,
  // ThemeSwitcher
} from '@blkbirds/uikit'
import {
  Box,
  Switch,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
} from '@chakra-ui/react'
import {
  // useAudioModeManager,
  useExpertModeManager,
  useUserExpertModeAcknowledgementShow,
  useUserSingleHopOnly,
} from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import { useSwapActionHandlers } from 'state/swap/hooks'
import useTheme from 'hooks/useTheme'
import QuestionHelper from '../../QuestionHelper'
import TransactionSettings from './TransactionSettings'
import ExpertModal from './ExpertModal'
import GasSettings from './GasSettings'

const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  max-height: 400px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
`

const SettingsModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [showExpertModeAcknowledgement, setShowExpertModeAcknowledgement] = useUserExpertModeAcknowledgementShow()
  const [expertMode, toggleExpertMode] = useExpertModeManager()
  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()
  const { onChangeRecipient } = useSwapActionHandlers()

  const { t } = useTranslation()
  const { theme } = useTheme()

  if (showConfirmExpertModal) {
    return (
      <ExpertModal
        setShowConfirmExpertModal={setShowConfirmExpertModal}
        onDismiss={onDismiss}
        setShowExpertModeAcknowledgement={setShowExpertModeAcknowledgement}
      />
    )
  }

  const handleExpertModeToggle = () => {
    if (expertMode) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else if (!showExpertModeAcknowledgement) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else {
      setShowConfirmExpertModal(true)
    }
  }

  return (
    <Modal isCentered isOpen onClose={onDismiss}>
      <ModalOverlay />
      <ModalContent bg="#3D9BE9">
        <ModalHeader color="white" py={4}>
          {t('Settings')}
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <Box py={4}>
            <ScrollableContainer>
              <Flex pb="24px" flexDirection="column">
                <Text bold textTransform="uppercase" fontSize="12px" color="secondary" mb="24px">
                  {t('Global')}
                </Text>
                {/* <Flex justifyContent="space-between">
            <Text mb="24px">{t('Dark mode')}</Text>
            <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
          </Flex> */}
                <GasSettings />
              </Flex>
              <Flex pt="24px" flexDirection="column" borderTop={`1px ${theme.colors.cardBorder} solid`}>
                <Text bold textTransform="uppercase" fontSize="12px" color="secondary" mb="24px">
                  {t('Swaps & Liquidity')}
                </Text>
                <TransactionSettings />
              </Flex>
              <Flex justifyContent="space-between" alignItems="center" mb="24px">
                <Flex alignItems="center">
                  <Text>{t('Expert Mode')}</Text>
                  <QuestionHelper
                    text={t('Bypasses confirmation modals and allows high slippage trades. Use at your own risk.')}
                    placement="top-start"
                    ml="4px"
                  />
                </Flex>
                <Switch
                  id="toggle-expert-mode-button"
                  colorScheme="yellow"
                  size="lg"
                  isChecked={expertMode}
                  onChange={handleExpertModeToggle}
                />
              </Flex>
              <Flex justifyContent="space-between" alignItems="center" mb="24px">
                <Flex alignItems="center">
                  <Text>{t('Disable Multihops')}</Text>
                  <QuestionHelper text={t('Restricts swaps to direct pairs only.')} placement="top-start" ml="4px" />
                </Flex>
                <Switch
                  id="toggle-disable-multihop-button"
                  colorScheme="yellow"
                  size="lg"
                  isChecked={singleHopOnly}
                  onChange={() => {
                    setSingleHopOnly(!singleHopOnly)
                  }}
                />
              </Flex>
            </ScrollableContainer>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SettingsModal
