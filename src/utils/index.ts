import { Near, WalletConnection } from 'near-api-js';

export const signIn = (wallet: WalletConnection) => {
  wallet.requestSignIn(
    'example-contract.testnet' // contract requesting access
  );
};
export const signOut = (wallet: WalletConnection) => {
  wallet.signOut();
  window.location.replace(window.location.origin + window.location.pathname);
};

export const getFinalBlock = async (near: Near) => {
  return await near.connection.provider.block({
    finality: 'final',
  });
};
