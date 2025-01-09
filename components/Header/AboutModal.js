import { Link, Modal, Text, VStack } from 'native-base';

import { useLinks } from '../../hooks/useLinks';

export const AboutModal = ({ showModal, onClose }) => {
  const { onLinkClick } = useLinks();

  return (
    <Modal isOpen={showModal} onClose={onClose} size='xl'>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>About</Modal.Header>
        <Modal.Body pt='20px' pb='36px'>
          <VStack>
            <Text fontWeight='bold' fontSize='md'>
              MyPepe Version
            </Text>
            <Text color='gray.500'>
              {chrome?.runtime?.getManifest().version}
            </Text>
          </VStack>
          <VStack space='6px' mt='20px'>
            <Link
              _text={{
                fontSize: 'md',
                color: 'blue.500',
                fontWeight: 'semibold',
              }}
              href='https://www.mypepe.com/terms'
              onPress={() => onLinkClick('https://www.mypepe.com/terms')}
            >
              Terms of Use
            </Link>
            <Link
              fontSize='md'
              href='https://www.mypepe.com/privacy'
              _text={{
                fontSize: 'md',
                color: 'blue.500',
                fontWeight: 'semibold',
              }}
              onPress={() => onLinkClick('https://www.mypepe.com/privacy')}
            >
              Privacy Policy
            </Link>
            <Link
              fontSize='md'
              href='https://mypepe.com'
              _text={{
                fontSize: 'md',
                color: 'blue.500',
                fontWeight: 'semibold',
              }}
              onPress={() => onLinkClick('https://mypepe.com')}
            >
              Visit our website
            </Link>
            <Link
              fontSize='md'
              href='mailto:support@mypepe.com'
              _text={{
                fontSize: 'md',
                color: 'blue.500',
                fontWeight: 'semibold',
              }}
              onPress={() => onLinkClick('mailto:support@mypepe.com')}
            >
              Contact us
            </Link>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
