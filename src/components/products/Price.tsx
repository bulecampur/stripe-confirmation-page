import { component$ } from '@builder.io/qwik';
import type { CurrencyCode } from '~/types';
import { formatPrice } from '~/utils';

export default component$<{
	lang: string | 'de-DE';
	priceWithTax: number | undefined;
	currencyCode: CurrencyCode | string | undefined;
	forcedClass?: string;
}>(({ lang, priceWithTax, currencyCode, forcedClass }: any) => {
	return (
		<div>
			{!currencyCode ? (
				<div></div>
			) : typeof priceWithTax === 'number' ? (
				<div class={forcedClass}>{formatPrice(lang, priceWithTax, currencyCode)}</div>
			) : 'value' in priceWithTax ? (
				<div class={forcedClass}>{formatPrice(lang, priceWithTax.value, currencyCode)}</div>
			) : priceWithTax.min === priceWithTax.max ? (
				<div class={forcedClass}>{formatPrice(lang, priceWithTax.min, currencyCode)}</div>
			) : (
				<div class={forcedClass}>
					{formatPrice(lang, priceWithTax.min, currencyCode)} -{' '}
					{formatPrice(lang, priceWithTax.max, currencyCode)}
				</div>
			)}
		</div>
	);
});
