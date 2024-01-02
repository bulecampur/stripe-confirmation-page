import { server$ } from '@builder.io/qwik-city';
import type { LoadTranslationFn, Translation, TranslationFn } from 'qwik-speak';
import { isDev } from '@builder.io/qwik/build';
/**
 * Translation files are lazy-loaded via dynamic import and will be split into separate chunks during build.
 * Assets names and keys must be valid variable names
 */
const translationData = import.meta.glob<Translation>('/i18n/**/*.json');

/**
 * Using server$, translation data is always accessed on the server
 */
const loadTranslation$: LoadTranslationFn = server$((lang: string, asset: string) => {
    const langAsset = `/i18n/${lang}/${asset}.json`;
    if (langAsset in translationData) {
      return translationData[langAsset]();
    }
    if (isDev) {
      console.warn(`loadTranslation$: ${langAsset} not found`);
    }
    return null;
  });

export const translationFn: TranslationFn = {
  loadTranslation$: loadTranslation$
};