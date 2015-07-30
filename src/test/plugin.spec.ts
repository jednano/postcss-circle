///<reference path="../../typings/tsd.d.ts" />
import { expect } from 'chai';
import postcss from 'postcss';
import plugin from '../lib/plugin';

// ReSharper disable WrongExpressionStatement
describe('postcss-circle plugin', () => {

	it('throws if no circle-diameter property is supplied', () => {
		[
			`foo {
				circle-color: red;
			}`,
			`foo {
				circle: red;
			}`
		].forEach(scenario => {
			check(scenario, /Missing required property: circle-diameter/);
		});
	});

	it('throws if no circle-color property is supplied', () => {
		[
			`foo {
				circle-diameter: 100px;
			}`,
			`foo {
				circle: 100px;
			}`
		].forEach(scenario => {
			check(scenario, /Missing required property: circle-color/);
		});
	});

	it('throws if a circle-bar property is provided', () => {
		check(
			`foo {
				circle-bar: baz;
			}`,
			/Unsupported property: circle-bar/
		);
	});

	it('transpiles into expected CSS declarations', () => {
		[
			`foo {
				circle-diameter: 100px;
				circle-color: red;
			}`,
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

	it('preserves the order in which properties are provided', () => {
		check(
			`foo {
				bar: BAR;
				circle-color: red;
				baz: BAZ;
				circle-diameter: 100px;
				qux: QUX;
			}`,
			`foo {
				bar: BAR;
				background-color: red;
				baz: BAZ;
				border-radius: 50%;
				width: 100px;
				height: 100px;
				qux: QUX;
			}`
		);
	});

	it('ignores a property named circlefoo', () => {
		check(
			`foo {
				circlefoo: bar;
			}`,
			`foo {
				circlefoo: bar;
			}`
		);
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
