import { Box, Button, Center, HStack, Text, Toast } from 'native-base';
import { useCallback, useEffect, useState } from 'react';

import { BigButton } from '../../components/Button';
import { RecipientAddress } from '../../components/RecipientAddress';
import { ToastRender } from '../../components/ToastRender';
import { WalletAddress } from '../../components/WalletAddress';
import { useAppContext } from '../../hooks/useAppContext';
import {
  MESSAGE_TYPES,
  TRANSACTION_TYPES,
} from '../../scripts/helpers/constants';
import { sendMessage } from '../../scripts/helpers/message';
import { NFTView } from '../Transactions/components/NFTView';

export const TransferDRC20Confirmation = ({
  setFormPage,
  errors,
  setErrors,
  formData,
  walletAddress,
  selectedNFT,
  selectedAddressIndex,
  selectedToken,
}) => {
  const { navigate } = useAppContext();
  const [loading, setLoading] = useState(false);
  const onSubmit = useCallback(() => {
    setLoading(true);

    sendMessage(
      {
        message: MESSAGE_TYPES.SEND_TRANSACTION,
        data: {
          rawTx: formData.rawTx,
          selectedAddressIndex,
          txType: TRANSACTION_TYPES.DRC20_SEND_INSCRIPTION_TX,
          ticker: selectedToken.ticker,
          tokenAmount: selectedNFT.amount,
          location: selectedNFT.location,
        },
      },
      (txId) => {
        if (txId) {
          setLoading(false);
          Toast.show({
            duration: 3000,
            render: () => {
              return (
                <ToastRender description='Transaction Sent' status='success' />
              );
            },
          });

          navigate('/Transactions/?refresh=1');
        } else {
          setLoading(false);
          Toast.show({
            title: 'Error',
            description: 'Transaction Failed',
            duration: 3000,
            render: () => {
              return (
                <ToastRender
                  title='Error'
                  description='Failed to send transaction.'
                  status='error'
                />
              );
            },
          });
        }
      }
    );
  }, [
    formData.rawTx,
    navigate,
    selectedAddressIndex,
    selectedNFT,
    selectedToken.ticker,
  ]);

  useEffect(() => {
    if (walletAddress !== formData.address) {
      setErrors({});
    }
  }, [walletAddress, formData.address, setErrors]);

  return (
    <Center>
      <Text fontSize='2xl' pb='24px' textAlign='center' fontWeight='semibold'>
        Confirm <Text fontWeight='bold'>Transaction</Text>
      </Text>
      <WalletAddress />
      <Text fontSize='lg' pb='4px' textAlign='center' fontWeight='semibold'>
        Transfer
      </Text>
      <Box
        borderRadius='12px'
        overflow='hidden'
        mb='24px'
        mx='20px'
        maxHeight='120px'
        maxWidth='150px'
      >
        <NFTView nft={selectedNFT} />
      </Box>
      <RecipientAddress address={formData.address} />

      <Text fontSize='3xl' fontWeight='semibold' pt='6px'>
        Ð{formData.dogeAmount}
      </Text>
      <Text fontSize='13px' fontWeight='semibold' pt='6px'>
        Network fee Ð{formData.fee}
      </Text>
      <HStack alignItems='center' mt='30px' space='12px'>
        <Button
          variant='unstyled'
          colorScheme='coolGray'
          onPress={() => setFormPage('amountDRC20')}
        >
          Back
        </Button>
        <BigButton
          onPress={onSubmit}
          type='submit'
          role='button'
          px='28px'
          isDisabled={errors.confirmation}
          loading={loading}
        >
          Transfer
        </BigButton>
      </HStack>
      {errors.confirmation ? (
        <Text fontSize='10px' color='red.500' mt='20px'>
          {errors.confirmation}
        </Text>
      ) : null}
    </Center>
  );
};
