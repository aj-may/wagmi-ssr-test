import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Either of these flipped to false will cause a hydration error when using SSR
const RECONNECT_AFTER_MOUNT = true;
const DISABLE_PERSISTER = true;

import {
  WagmiConfig,
  createClient,
  configureChains,
  chain,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { useEffect } from 'react'

const { provider } = configureChains(
  [chain.mainnet],
  [publicProvider()],
)

const client = createClient({
  autoConnect: RECONNECT_AFTER_MOUNT ? false : true, // Opposite being reconnect before mount
  provider,
  persister: DISABLE_PERSISTER ? null : undefined,
})

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (RECONNECT_AFTER_MOUNT) {
      client.autoConnect();
    }
  }, []);

  return <WagmiConfig client={client}>
    <Component {...pageProps} />
  </WagmiConfig>;
}

export default MyApp
