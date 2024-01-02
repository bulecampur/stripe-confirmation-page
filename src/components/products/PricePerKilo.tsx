import { component$ } from '@builder.io/qwik';
import type { CurrencyCode } from '~/types';
import { formatPrice } from '~/utils';

export default component$<{
	variant: string | undefined;
	lang: string | 'de-DE';
	priceWithTax: number | undefined;
	currencyCode: CurrencyCode | string | undefined;
	forcedClass?: string;
}>(({ lang, priceWithTax, variant, currencyCode, forcedClass }: any) => {
	return (
		<div>
			{variant === '250 g' &&
				(!currencyCode ? (
					<div></div>
				) : typeof priceWithTax === 'number' ? (
					<div class={forcedClass}>{formatPrice(lang, priceWithTax * 4, currencyCode)}/kg</div>
				) : 'value' in priceWithTax ? (
					<div class={forcedClass}>
						{formatPrice(lang, priceWithTax.value * 4, currencyCode)}/kg
					</div>
				) : priceWithTax.min === priceWithTax.max ? (
					<div class={forcedClass}>{formatPrice(lang, priceWithTax.min * 4, currencyCode)}/kg</div>
				) : (
					<div class={forcedClass}>
						{formatPrice(lang, priceWithTax.min * 4, currencyCode)} -{' '}
						{formatPrice(lang, priceWithTax.max * 4, currencyCode)}/kg
					</div>
				))}
			{variant === '500 g' &&
				(!currencyCode ? (
					<div></div>
				) : typeof priceWithTax === 'number' ? (
					<div class={forcedClass}>{formatPrice(lang, priceWithTax * 2, currencyCode)}/kg</div>
				) : 'value' in priceWithTax ? (
					<div class={forcedClass}>
						{formatPrice(lang, priceWithTax.value * 2, currencyCode)}/kg
					</div>
				) : priceWithTax.min === priceWithTax.max ? (
					<div class={forcedClass}>{formatPrice(lang, priceWithTax.min * 2, currencyCode)}/kg</div>
				) : (
					<div class={forcedClass}>
						{formatPrice(lang, priceWithTax.min * 2, currencyCode)} -{' '}
						{formatPrice(lang, priceWithTax.max * 2, currencyCode)}/kg
					</div>
				))}
		</div>
	);
});
