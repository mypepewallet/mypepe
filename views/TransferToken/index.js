import { Box } from 'native-base';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Layout } from '../../components/Layout';
import { useAppContext } from '../../hooks/useAppContext';
import { TransferPRC20Amount } from './TransferPRC20Amount';
import { TransferPRC20Confirmation } from './TransferPRC20Confirmation';
import { TransferDunesAmount } from './TransferDunesAmount';
import { TransferDunesConfirmation } from './TransferDunesConfirmation';
import { TransferTokenAddress } from './TransferTokenAddress';

export function TransferToken() {
  const { wallet, selectedAddressIndex } = useAppContext();
  const walletAddress = wallet.addresses[selectedAddressIndex];

  const [formPage, setFormPage] = useState('address');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedNFT, setSelectedNFT] = useState(null);

  const RenderScreen =
    {
      address: TransferTokenAddress,
      amountPRC20: TransferPRC20Amount,
      amountDunes: TransferDunesAmount,
      confirmationPRC20: TransferPRC20Confirmation,
      confirmationDunes: TransferDunesConfirmation,
    }[formPage] ?? null;

  const [searchParams] = useSearchParams();

  let selectedToken = searchParams.get('selectedToken');

  if (selectedToken) {
    selectedToken = JSON.parse(selectedToken);
  }

  return (
    <Layout
      withHeader
      p={0}
      withCancelButton
      cancelRoute='/Transactions/tokens'
      addressColor='black'
    >
      <Box pt='72px' px='12px'>
        <RenderScreen
          walletAddress={walletAddress}
          selectedToken={selectedToken}
          setFormPage={setFormPage}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          selectedAddressIndex={selectedAddressIndex}
          selectedNFT={selectedNFT}
          setSelectedNFT={setSelectedNFT}
        />
      </Box>
    </Layout>
  );
}
