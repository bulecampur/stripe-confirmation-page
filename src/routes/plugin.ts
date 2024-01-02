import type { RequestHandler } from '@builder.io/qwik-city';
import { config } from '../speak-config';
import { validateLocale } from 'qwik-speak';

export const onRequest: RequestHandler = ({ params, locale, error }) => {
  let lang: string | undefined = undefined;

  if (params.lang && validateLocale(params.lang)) {
    // Check supported locales
    lang = config.supportedLocales.find(value => value.lang === params.lang)?.lang;
    // 404 error page
    if (!lang) throw error(404, 'Page not found');
  } else {
    lang = config.defaultLocale.lang;
  }

  // Set Qwik locale
  locale(lang);
};