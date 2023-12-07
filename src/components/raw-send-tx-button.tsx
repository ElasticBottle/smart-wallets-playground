import { useAddress, useContract, useSigner } from "@thirdweb-dev/react";
import { useState } from "react";
import { CELO_EDITION_DROP_CONTRACT_ADDRESS } from "~/lib/constants";

export const RawSendTxButton = () => {
  const signer = useSigner();
  const address = useAddress();
  const contract = useContract(CELO_EDITION_DROP_CONTRACT_ADDRESS);

  const [hash, setHash] = useState("");
  const [error, setError] = useState("");

  const sendTx = async () => {
    if (!signer || !address) {
      return;
    }
    try {
      const claimInfo =
        await contract.contract?.erc1155.claimConditions.prepareClaim(
          0,
          1,
          false,
        );
      if (!claimInfo) throw new Error("No claim info");
      const claimArgs =
        await contract.contract?.erc1155.claimConditions.getClaimArguments(
          0,
          await signer.getAddress(),
          1,
          claimInfo,
        );
      if (!claimArgs) throw new Error("No claim args");

      console.log("address", address);
      const tx = await signer.sendTransaction({
        from: address,
        to: CELO_EDITION_DROP_CONTRACT_ADDRESS,
        data: contract.contract?.encoder.encode("claim", claimArgs),
        value: 0,
      });
      const receipt = await tx.wait();
      setHash(receipt.transactionHash);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button onClick={sendTx}>Send Transaction</button>
      {hash && <div>Hash: {hash}</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};
