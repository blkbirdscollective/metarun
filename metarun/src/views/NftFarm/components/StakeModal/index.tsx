import React from 'react'
import {
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react'

const StakeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button colorScheme="whiteAlpha" variant="solid" size="lg" mt={6} onClick={onOpen}>
        Stake
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="md">Stake your tokens here</Heading>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>asddas</ModalBody>
        </ModalContent>
        <ModalFooter>sadasd</ModalFooter>
      </Modal>
    </>
  )
}

export default StakeModal
