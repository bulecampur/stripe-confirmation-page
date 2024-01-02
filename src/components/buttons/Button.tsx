import type { PropFunction } from '@builder.io/qwik';
import { $, component$, Slot } from '@builder.io/qwik';

type Props = {
	extraClass?: string;
	onClick$?: PropFunction<() => void>;
};

export const Button = component$<Props>(({ extraClass = '', onClick$ }) => {
	return (
		<button
			type="button"
			class={`flex items-center justify-around bg-primary border rounded-lg py-2 px-4 text-base font-medium text-bkg hover:bg-primary/70 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-gray-800 ${extraClass}`}
			onClick$={$(async () => {
				if (onClick$) {
					onClick$();
				}
			})}
		>
			<Slot />
		</button>
	);
});
