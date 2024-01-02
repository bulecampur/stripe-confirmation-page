import { component$ } from '@builder.io/qwik';
import type { Order } from '~/generated/graphql-shop';
import type { OrderPriceFields } from '~/types';
import { formatPrice } from '~/utils';

type Props = {
	lang: string;
	field: OrderPriceFields;
	forcedClass?: string;
	order?: Order;
};

export default component$<Props>(({ lang, field, forcedClass, order }) => {
	const currencyCode = order?.currencyCode || 'EUR';
	const priceWithTax = order?.[field] || 0;
	return <div class={forcedClass}>{formatPrice(lang, priceWithTax, currencyCode)}</div>;
});
