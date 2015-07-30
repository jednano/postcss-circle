///<reference path="../../typings/tsd.d.ts" />
import { expect } from 'chai';
import postcss from 'postcss';
import plugin from '../lib/plugin';

// ReSharper disable WrongExpressionStatement
describe('postcss-circle plugin', () => {

	it('throws if no diameter is supplied', () => {
		check(
			`foo {
				circle: red;
			}`,
			/Missing diameter/
		);
	});

	it('transpiles diameter into expected declarations', () => {
		check(
			`foo {
				circle: 100px;
			}`,
			`foo {
				border-radius: 50%;
				width: 100px;
				height: 100px;
			}`
		);
	});

	it('transpiles diameter and color into expected declarations', () => {
		[
			`foo {
				circle: 100px red;
			}`,
			`foo {
				circle: red 100px;
			}`
		].forEach(scenario => {
			check(
				scenario,
				`foo {
					border-radius: 50%;
					width: 100px;
					height: 100px;
					background-color: red;
				}`
			);
		});
	});

	function check(actual: string, expected?: string|RegExp) {
		const processor = postcss().use(plugin);
		if (expected instanceof RegExp) {
			expect(() => {
				return processor.process(stripTabs(actual)).css;
			}).to.throw(expected);
			return;
		}
		expect(
			processor.process(stripTabs(actual)).css
		).to.equal(
			stripTabs(<string>expected)
		);
	}

	function stripTabs(input: string) {
		return input.replace(/\t/g, '');
	}
});
