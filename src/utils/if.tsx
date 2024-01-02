import { JSXNode } from '@builder.io/qwik';

export const If = (props: {
	isTrue: boolean | (() => boolean);
	show: JSXNode;
	elseShow?: JSXNode;
}): JSXNode => {
	const isTrue = typeof props.isTrue === 'boolean' ? props.isTrue : props.isTrue();
	return isTrue ? props.show : props.elseShow || <></>;
};
