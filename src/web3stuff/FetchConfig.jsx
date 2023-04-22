import { w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { celoAlfajores, sepolia } from "wagmi/chains";
import FetchData from "./FetchData";

const chains = [sepolia];
const projectId = "6e18bca83b6d8c08562669f22a83ca97";

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains }),
  provider,
});

function FetchConfig() {
  return (
    <WagmiConfig client={wagmiClient}>
      <FetchData></FetchData>
    </WagmiConfig>
  );
}

export default FetchConfig;
