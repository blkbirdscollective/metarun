import React, { useState } from 'react'
import { Button, Text, Flex, Message, InjectedModalProps } from '@blkbirds/uikit'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Checkbox } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useExpertModeManager } from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'

interface ExpertModalProps extends InjectedModalProps {
  setShowConfirmExpertModal: (boolean) => void
  setShowExpertModeAcknowledgement: (boolean) => void
}

const ExpertModal: React.FC<ExpertModalProps> = ({ setShowConfirmExpertModal, setShowExpertModeAcknowledgement }) => {
  const [, toggleExpertMode] = useExpertModeManager()
  const [isRememberChecked, setIsRememberChecked] = useState(false)

  const { t } = useTranslation()

  const unconfirmExpertModal = () => setShowConfirmExpertModal(false)
  const onDismissModal = () => setShowConfirmExpertModal(false)
  const updateShouldShowThisAgain = () => setIsRememberChecked(!isRememberChecked)

  return (
    <Modal isOpen onClose={onDismissModal}>
      <ModalOverlay />
      <ModalContent bg="#3D9BE9">
        <ModalHeader color="white">
          <ArrowBackIcon onClick={unconfirmExpertModal} mr={2} cursor="pointer" />
          {t('Expert Mode')}
        </ModalHeader>
        <ModalCloseButton onClick={unconfirmExpertModal} color="white" />
        <ModalBody>
          <Message variant="warning" mb="24px">
            <Text>
              {t(
                "Expert mode turns off the 'Confirm' transaction prompt, and allows high slippage trades that often result in bad rates and lost funds.",
              )}
            </Text>
          </Message>
          <Text mb="24px">{t("Only use this mode if you know what you're doing.")}</Text>
          <Flex alignItems="center" mb="24px">
            <Checkbox
              size="md"
              color="white"
              colorScheme="yellow"
              isChecked={isRememberChecked}
              onChange={updateShouldShowThisAgain}
            >
              {t('Don’t show this again')}
            </Checkbox>
          </Flex>
          <Button
            mb="8px"
            mr="8px"
            id="confirm-expert-mode"
            onClick={() => {
              // eslint-disable-next-line no-alert
              if (window.prompt(`Please type the word "confirm" to enable expert mode.`) === 'confirm') {
                toggleExpertMode()
                setShowConfirmExpertModal(false)
                if (isRememberChecked) {
                  setShowExpertModeAcknowledgement(false)
                }
              }
            }}
          >
            {t('Turn On Expert Mode')}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShowConfirmExpertModal(false)
            }}
          >
            {t('Cancel')}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ExpertModal
