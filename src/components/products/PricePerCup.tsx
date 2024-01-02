import { component$ } from '@builder.io/qwik';
import type { CurrencyCode } from '~/types';
import { formatPrice } from '~/utils';
import { LuCoffee } from '@qwikest/icons/lucide';

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
					<div class={forcedClass}>
						{formatPrice(lang, (priceWithTax * 4) / 83, currencyCode)}/
						<div class="font-light text-content">
							<LuCoffee />
						</div>
					</div>
				) : 'value' in priceWithTax ? (
					<div class={forcedClass}>
						{formatPrice(lang, (priceWithTax.value * 4) / 83, currencyCode)}/
						<div class="font-light text-content">
							<LuCoffee />
						</div>
					</div>
				) : priceWithTax.min === priceWithTax.max ? (
					<div class={forcedClass}>
						{formatPrice(lang, (priceWithTax.min * 4) / 83, currencyCode)}/
						<div class="font-light text-content">
							<LuCoffee />
						</div>
					</div>
				) : (
					<div class={forcedClass}>
						{formatPrice(lang, (priceWithTax.min * 4) / 83, currencyCode)} -{' '}
						{formatPrice(lang, (priceWithTax.max * 4) / 83, currencyCode)}/
						<div class="font-light text-content">
							<LuCoffee />
						</div>
					</div>
				))}
			{variant === '500 g' &&
				(!currencyCode ? (
					<div></div>
				) : typeof priceWithTax === 'number' ? (
					<div class={forcedClass}>
						{formatPrice(lang, (priceWithTax * 2) / 83, currencyCode)}/
						<div class="font-light text-content">
							<LuCoffee />
						</div>
					</div>
				) : 'value' in priceWithTax ? (
					<div class={forcedClass}>
						{formatPrice(lang, (priceWithTax.value * 2) / 83, currencyCode)}/
						<div class="font-light text-content">
							<LuCoffee />
						</div>
					</div>
				) : priceWithTax.min === priceWithTax.max ? (
					<div class={forcedClass}>
						{formatPrice(lang, (priceWithTax.min * 2) / 83, currencyCode)}/
						<div class="font-light text-content">
							<LuCoffee />
						</div>
					</div>
				) : (
					<div class={forcedClass}>
						{formatPrice(lang, (priceWithTax.min * 2) / 83, currencyCode)} -{' '}
						{formatPrice(lang, (priceWithTax.max * 2) / 83, currencyCode)}/
						<div class="font-light text-content">
							<LuCoffee />
						</div>
					</div>
				))}
		</div>
	);
});
