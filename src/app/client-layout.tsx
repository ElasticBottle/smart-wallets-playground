"use client";

import { Celo } from "@thirdweb-dev/chains";
import {
  ThirdwebProvider,
  embeddedWallet,
  smartWallet,
} from "@thirdweb-dev/react";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { env } from "~/env";

const smartWalletConfig = {
  factoryAddress: "0xe8c4a21a4a6b016439df26eaf354202c3662b8a1",
  gasless: true,
};

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(new QueryClient());

  return (
    <ThirdwebProvider
      activeChain={Celo}
      clientId={env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      supportedWallets={[smartWallet(embeddedWallet(), smartWalletConfig)]}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThirdwebProvider>
  );
};
