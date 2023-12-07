"use client";

import { ConnectWallet, Web3Button } from "@thirdweb-dev/react";
import { RawSendTxButton } from "~/components/raw-send-tx-button";
import { CELO_EDITION_DROP_CONTRACT_ADDRESS } from "~/lib/constants";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex w-full justify-end px-3 py-2">
        <ConnectWallet />
      </div>
      <div className="flex flex-col space-y-2">
        <Web3Button
          contractAddress={CELO_EDITION_DROP_CONTRACT_ADDRESS}
          action={async (contract) => {
            const result = await contract.erc1155.claim(0, 1);
            console.log("result", result);
          }}
        >
          Mint a demo NFT
        </Web3Button>
        <RawSendTxButton />
      </div>
    </main>
  );
}
