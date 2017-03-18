import test, { ContextualTestContext } from 'ava';
import * as postcss from 'postcss';

import * as plugin from './plugin';

test(
	'throws if no diameter is supplied',
	macro,
	`foo {
		circle: red;
	}`,
	/Missing diameter/
);

test(
	'transpiles diameter into expected declarations',
	macro,
	`foo {
		circle: 100px;
	}`,
	`foo {
		border-radius: 50%;
		width: 100px;
		height: 100px;
	}`
);

[
	`foo {
		circle: 100px red;
	}`,
	`foo {
		circle: red 100px;
	}`
].forEach(input => {
	test(
		'transpiles diameter and color into expected declarations',
		macro,
		input,
		`foo {
			border-radius: 50%;
			width: 100px;
			height: 100px;
			background-color: red;
		}`
	);
});

function macro(
	t: ContextualTestContext,
	input: string,
	expected?: string | RegExp
) {
	const processor = postcss([ plugin() ]);
	if (expected instanceof RegExp) {
		t.throws(() => {
			return processor.process(stripTabs(input)).css;
		}, expected);
		return;
	}
	t.is(
		processor.process(stripTabs(input)).css,
		stripTabs(<string>expected)
	);
}

function stripTabs(input: string) {
	return input.replace(/\t/g, '');
}
