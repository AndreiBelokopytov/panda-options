import { DAppClient } from "@airgap/beacon-sdk";

export const checkActiveAccount = async (dAppClient: DAppClient) => {
  let accountInfo;

  try {
    accountInfo = await dAppClient.getActiveAccount();
  } catch (e) {
    console.error(e);
  }

  return accountInfo;
};
