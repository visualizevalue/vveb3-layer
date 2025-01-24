import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: process.env.NUXT_SSR !== 'false',

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
  ],

  i18n: {
    vueI18n: join(currentDir, './i18n.config.ts'),
  },

  runtimeConfig: {
    public: {
      title: 'VVEB3 STARTER',
      blockExplorer: 'https://etherscan.io',
      chainId: 1,
      rpc1: 'https://eth.llamarpc.com',
      rpc2: 'https://ethereum-rpc.publicnode.com',
      rpc3: 'https://eth.drpc.org',
      walletConnectProjectId: '',
    }
  },

  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      htmlAttrs: { lang: 'en' },
      title: process.env.NUXT_PUBLIC_TITLE,
      link: [
        { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
      ]
    },
  },

  css: [
    join(currentDir, './assets/styles/index.css'),
  ],

  postcss: {
    plugins: {
      '@csstools/postcss-global-data': {
        files: [
          join(currentDir, './assets/styles/custom-selectors.css'),
          join(currentDir, './assets/styles/custom-media.css'),
        ]
      },
      'postcss-mixins': {
        mixinsDir: join(currentDir, './assets/styles/mixins'),
      },
      'postcss-nested': {},
      'postcss-custom-selectors': {},
      'postcss-custom-media': {},
      'postcss-preset-env': {
        stage: 3,
        features: {},
      },
      'autoprefixer': {},
    },
  },

  hooks: {
    'vite:extendConfig': (config) => {
      config.optimizeDeps ??= {}
      config.optimizeDeps.include = config.optimizeDeps.include || []
      config.optimizeDeps.include.push('@visualizevalue/vveb3-layer > eventemitter3')
      config.optimizeDeps.include.push('@visualizevalue/vveb3-layer > buffer/')
      config.optimizeDeps.include.push('@visualizevalue/vveb3-layer > @wagmi/connectors')
    }
  },

  nitro: {
    preset: 'node-cluster',
    esbuild: {
      options: {
        target: 'esnext'
      }
    },
  },

  imports: {
    presets: [
      {
        from: 'luxon',
        imports: [
          'DateTime',
        ]
      },
      {
        from: '@wagmi/core',
        imports: [
          'readContract',
          'waitForTransactionReceipt',
          'writeContract',
        ]
      },
      {
        from: 'viem',
        imports: [
          'decodeEventLog',
          'isAddress',
          'getAddress',
          'toBytes',
          'toHex',
          'getContract',
          'encodeAbiParameters',
          'parseAbiParameters',
          'parseAbiParameter',
        ]
      }
    ]
  },

  piniaPersistedstate: {
    storage: 'localStorage'
  },

  compatibilityDate: '2024-08-14',
})
