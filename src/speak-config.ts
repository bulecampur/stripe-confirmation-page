import type { SpeakConfig } from 'qwik-speak';

export const config: SpeakConfig = {
  defaultLocale: { lang: 'de', currency: 'EUR', timeZone: 'Europe/Berlin' },
  supportedLocales: [
    { lang: 'de', currency: 'EUR', timeZone: 'Europe/Berlin' },
    { lang: 'en', currency: 'EUR', timeZone: 'Europe/Berlin' }
  ],
  // Translations available in the whole app
  assets: [
    'app'
  ],
  // Translations with dynamic keys available in the whole app
  runtimeAssets: [
    'runtime'
  ]
};