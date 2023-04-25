import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { celoAlfajores } from "wagmi/chains";
import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";

const chains = [celoAlfajores];
const projectId = "6e18bca83b6d8c08562669f22a83ca97";

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains }),
  provider,
  defaultChain: celoAlfajores,
  tokenImages: {
    CELO: "/abi/celogo.png",
  },
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

function ModalWallet() {
  const account = useAccount({
    onConnect({ address, connector, isReconnected, isConnected }) {
      console.log("Connected", {
        address,
        connector,
        isReconnected,
        isConnected,
      });
      redirectToUrl();
    },
  });

  const accountset = useAccount({
    onDisconnect() {
      console.log("Disconnected");
      window.location.href = "/login";
      resetRedirect();
    },
  });

  function redirectToUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const hasRedirected = urlParams.get("userId") !== null;
    if (!hasRedirected) {
      const random = Math.floor(Math.random() * 1000000);
      const userId = random;
      const redirectUrl = `/?userId=${userId}`;
      window.location.href = redirectUrl;
    }
  }

  function resetRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete("userId");
    window.history.replaceState({}, "", `?${urlParams.toString()}`);
  }

  return (
    <WagmiConfig client={wagmiClient}>
      <Web3Modal
        projectId={"6e18bca83b6d8c08562669f22a83ca97"}
        ethereumClient={ethereumClient}
        themeVariables={{
          "--w3m-font-family": "Roboto, sans-serif",
          "--w3m-accent-color": "#808080",
          "--w3m-logo-image-url":
            "https://cryptologos.cc/logos/celo-celo-logo.png",
          "--w3m-background-image-url":
            "https://cdn-images-1.medium.com/max/1200/1*hc-eMjCYyT3EpE7ujfrXBQ.png",
          chainImages: {
            1: "/images/ethereum.webp",
            137: "/images/polygon.webp",
            44787: "/images/celo.webp",
          },
        }}
      />
      <Web3Button />
    </WagmiConfig>
  );
}

export default ModalWallet;
