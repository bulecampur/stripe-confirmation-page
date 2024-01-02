import { component$, type QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/utils/cn';

const containerVariants = cva(['mx-auto', 'mb-1', 'px-3'], {
	variants: {
		position: {
			top: ['pt-1', 'sm:pt-3'],
			middle: ['pt-0'],
			bottom: ['pb-3'],
			header: ['py-1'],
		},
		width: {
			md: 'max-w-screen-md',
			lg: 'max-w-screen-lg',
			xl: ['max-w-screen-xl', '2xl:max-w-[80%]', '2xl:px-48'],
			full: ['w-screen'],
		},
		visibility: {
			visible: '',
			mobile: 'block md:hidden',
			desktop: 'hidden md:block',
		},
	},
});

type ContainerProps = QwikIntrinsicElements['div'] & VariantProps<typeof containerVariants>;

const Container = component$<ContainerProps>(
	({ position = 'middle', width = 'xl', visibility = 'visible', ...props }) => {
		return (
			<div {...props} class={cn(containerVariants({ position, width, visibility }), props.class)}>
				<Slot />
			</div>
		);
	}
);

export { Container, containerVariants };
