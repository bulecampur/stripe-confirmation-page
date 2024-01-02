import { $, component$, useComputed$, useContext, useSignal, useTask$ } from '@builder.io/qwik';

import { DocumentHead, routeLoader$, type StaticGenerateHandler } from '@builder.io/qwik-city';
// import { urlForImage } from '~/lib/sanity.image';
import { Image } from 'qwik-image';
import { inlineTranslate, useSpeakContext } from 'qwik-speak';
import { config } from '../../../../speak-config';
import Alert from '~/components/alert/Alert';
import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs';
import CheckIcon from '~/components/icons/CheckIcon';
import Price from '~/components/products/Price';
import StockLevelLabel from '~/components/stock-level-label/StockLevelLabel';
import TopReviews from '~/components/top-reviews/TopReviews';
import { APP_STATE } from '~/constants';
import { Order, OrderLine, Product } from '~/generated/graphql-shop';
import { addItemToOrderMutation } from '~/providers/shop/orders/order';
import { getProductBySlug } from '~/providers/shop/products/products';
import { Variant } from '~/types';
import { cleanUpParams, generateDocumentHead, isEnvVariableEnabled } from '~/utils';
import { Container } from '~/components/ui/container';
import PricePerKilo from '~/components/products/PricePerKilo';
import PricePerCup from '~/components/products/PricePerCup';

export const useProductLoader = routeLoader$(async ({ params }) => {
	const { slug } = cleanUpParams(params);
	const product = await getProductBySlug(slug);
	return product;
});

export default component$(() => {
	const ctx = useSpeakContext();
	const locale = ctx.locale.lang;
	const t = inlineTranslate();
	const appState = useContext(APP_STATE);

	const calculateQuantities = $((product: Product) => {
		const result: Record<string, number> = {};
		(product.variants || []).forEach((variant: Variant) => {
			const orderLine = (appState.activeOrder?.lines || []).find(
				(l: OrderLine) =>
					l.productVariant.id === variant.id && l.productVariant.product.id === product.id
			);
			result[variant.id] = orderLine?.quantity || 0;
		});
		return result;
	});

	const productSignal = useProductLoader();
	const currentImageSig = useSignal(productSignal.value.assets[0]);
	const selectedVariantIdSignal = useSignal(productSignal.value.variants[0].id);
	const selectedVariantSignal = useComputed$(() =>
		productSignal.value.variants.find((v) => v.id === selectedVariantIdSignal.value)
	);
	const addItemToOrderErrorSignal = useSignal('');
	const quantitySignal = useSignal<Record<string, number>>({});

	useTask$(async (tracker) => {
		tracker.track(() => appState.activeOrder);
		quantitySignal.value = await calculateQuantities(productSignal.value);
	});
	return (
		<section>
			{/* <figure>
				<img
					src={urlForImage(coffee.value.cover).width(500).height(300).url()}
					alt={`Cover image for ${coffee.value.coverAlt}`}
					width={500}
					height={300}
					class="rounded"
				/>
			</figure> */}
			<Container>
				<Breadcrumbs
					items={
						productSignal.value.collections[productSignal.value.collections.length - 1]
							?.breadcrumbs ?? []
					}
				></Breadcrumbs>
				<div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-6">
					<div class="block md:hidden w-full max-w-3xl mx-auto sm:block lg:max-w-none">
						{productSignal.value.assets[0] && (
							<div class=" w-screen flex-auto items-center justify-center overflow-hidden">
								<div class="mx-auto my-1 aspect-square rounded-lg px-1">
									<Image
										layout="fixed"
										class="object-center object-cover rounded-lg mx-auto"
										width="400"
										height="400"
										src={productSignal.value.assets[0].preview + '?w=400&h=400&format=webp'}
										alt={productSignal.value.assets[0].name}
									/>
								</div>
							</div>
						)}
					</div>

					<div class="hidden md:block w-full max-w-3xl mx-auto sm:block lg:max-w-none">
						<span class="rounded-md overflow-hidden">
							<div class="h-[600px] w-full md:w-[600px]">
								<Image
									layout="fixed"
									class="object-center object-cover rounded-lg mx-auto"
									width="600"
									height="600"
									src={currentImageSig.value.preview + '?w=600&h=600&format=webp'}
									alt={currentImageSig.value.name}
								/>
							</div>
							{productSignal.value.assets.length > 1 && (
								<div class="w-full md:w-[600px] my-2 flex flex-wrap gap-3 justify-center">
									{productSignal.value.assets.map((asset, key) => (
										<Image
											key={key}
											layout="fixed"
											class={{
												'cursor-pointer object-center object-cover rounded-lg': true,
												'border-b-8 border-primary': currentImageSig.value.id === asset.id,
											}}
											width="80"
											height="80"
											src={asset.preview + '?w=600&h=600&format=webp'}
											alt={asset.name}
											onClick$={() => {
												currentImageSig.value = asset;
											}}
										/>
									))}
								</div>
							)}
						</span>
					</div>
					<div class="mt-0 px-4 sm:px-0 sm:mt-6">
						<div class="">
							<h2 class="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-primary">
								{productSignal.value.name}
							</h2>
						</div>
						<div class="mt-2 flex items-center">
							<StockLevelLabel stockLevel={selectedVariantSignal.value?.stockLevel} />
						</div>
						{!!addItemToOrderErrorSignal.value && (
							<div class="mt-4">
								<Alert message={addItemToOrderErrorSignal.value} />
							</div>
						)}
						<div class="mt-5 flex flex-col sm:items-start justify-between">
							<div class="flex flex-col gap-1">
								<div class="flex flex-row gap-10 w-full justify-between items-baseline">
									<Price
										lang={locale as string}
										priceWithTax={selectedVariantSignal.value?.priceWithTax}
										currencyCode={selectedVariantSignal.value?.currencyCode}
										forcedClass="text-3xl text-content font-semibold font-body mr-4"
									></Price>

									<div class="text-base text-content font-body">
										{t('product.includesReducedVAT')}, {t('product.excludesShipping')}
									</div>
								</div>
								<div class="flex flex-row gap-1 text-sm items-center">
									~
									<PricePerCup
										lang={locale as string}
										variant={selectedVariantSignal.value?.name as string}
										priceWithTax={selectedVariantSignal.value?.priceWithTax}
										currencyCode={selectedVariantSignal.value?.currencyCode}
										forcedClass="rounded-lg flex flex-row flex-nowrap items-center text-content font-base font-body"
									/>
									<div class="font-base text-content font-body">{t('common.or')}</div>
									<PricePerKilo
										lang={locale as string}
										variant={selectedVariantSignal.value?.name as string}
										priceWithTax={selectedVariantSignal.value?.priceWithTax}
										currencyCode={selectedVariantSignal.value?.currencyCode}
										forcedClass="font-base text-content font-body"
									/>
								</div>
							</div>

							{1 < productSignal.value.variants.length && (
								<div class="mt-4 w-full">
									<label class="block text-base font-medium text-content">
										{t('product.variantOptionWeight')}
									</label>
									<div class="variant-buttons mt-1  w-full justify-between md:mt-2 flex flex-row flex-nowrap gap-3">
										{productSignal.value.variants.map((variant) => (
											<button
												key={variant.id}
												class={{
													'variant-button bg-bkg hover:bg-bkg/80 font-semibold shadow-sm hover:shadow-lg ring-2 ring-gray-300 hover:ring-primary/60 transition-colors rounded-lg py-2 px-5 text-content text-lg font-body w-full':
														true,
													'ring-primary bg-primary/10':
														selectedVariantIdSignal.value === variant.id,
												}}
												onClick$={() => (selectedVariantIdSignal.value = variant.id)}
											>
												{variant.name}
											</button>
										))}
									</div>
								</div>
							)}

							<div class="mt-5 w-full align-baseline">
								<button
									class={{
										'flex-1 transition-colors border border-transparent rounded-lg py-3 flex items-center justify-center text-base font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500 w-full':
											true,
										'bg-primary hover:bg-primary/70':
											quantitySignal.value[selectedVariantIdSignal.value] === 0,
										'bg-emerald-600 active:bg-emerald-700 hover:bg-emerald-700':
											quantitySignal.value[selectedVariantIdSignal.value] >= 1 &&
											quantitySignal.value[selectedVariantIdSignal.value] <= 7,
										'bg-gray-600 cursor-not-allowed':
											quantitySignal.value[selectedVariantIdSignal.value] > 7,
									}}
									onClick$={async () => {
										if (quantitySignal.value[selectedVariantIdSignal.value] <= 7) {
											const addItemToOrder = await addItemToOrderMutation(
												selectedVariantIdSignal.value,
												1
											);
											if (addItemToOrder.__typename !== 'Order') {
												addItemToOrderErrorSignal.value = addItemToOrder.errorCode;
											} else {
												appState.activeOrder = addItemToOrder as Order;
											}
										}
									}}
								>
									{quantitySignal.value[selectedVariantIdSignal.value] ? (
										<span class="flex items-center">
											<CheckIcon />
											{quantitySignal.value[selectedVariantIdSignal.value]} in cart
										</span>
									) : (
										`${t('product.addtocart')}`
									)}
								</button>
							</div>
						</div>

						<section class="mt-12 pt-12 border-t text-xs">
							<h3 class="text-gray-600 font-bold mb-2">Shipping & Returns</h3>
							<div class="text-gray-500 space-y-1">
								<p>Standard shipping: 3 - 5 working days. Express shipping: 1 - 3 working days.</p>
								<p>
									Shipping costs depend on delivery address and will be calculated during checkout.
								</p>
								<p>
									Returns are subject to terms. Please see the{' '}
									<span class="underline">returns page</span> for further information.
								</p>
							</div>
						</section>
					</div>
				</div>

				{isEnvVariableEnabled('VITE_SHOW_REVIEWS') && (
					<div class="mt-24">
						<TopReviews />
					</div>
				)}
			</Container>
		</section>
	);
});

export const head: DocumentHead = ({ resolveValue, url }) => {
	const product = resolveValue(useProductLoader);
	return generateDocumentHead(
		url.href,
		product.name,
		product.description,
		product.featuredAsset?.preview
	);
};
export const onStaticGenerate: StaticGenerateHandler = () => {
	return {
		params: config.supportedLocales.map((locale) => {
			return { lang: locale.lang !== config.defaultLocale.lang ? locale.lang : '.' };
		}),
	};
};
