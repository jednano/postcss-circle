import { expect } from 'chai';
import postcss from 'postcss';
import plugin from '../lib/plugin';
// ReSharper disable WrongExpressionStatement
describe('@circle at-rule', () => {
    it('throws if parameters are supplied in the prelude', () => {
        check(`foo {
				@circle bar;
			}`, /Parameters are not supported: bar/);
    });
    it('throws if no diameter property is supplied', () => {
        check(`foo {
				@circle {
					color: red;
				}
			}`, /Missing required property: diameter/);
    });
    it('throws if no color property is supplied', () => {
        check(`foo {
				@circle {
					diameter: 100px;
				}
			}`, /Missing required property: color/);
    });
    it('throws if an unknown property, bar, is provided', () => {
        check(`foo {
				@circle {
					diameter: 100px;
					color: red;
					bar: baz;
				}
			}`, /Unsupported property: bar/);
    });
    it('replaces itself with correct circle declarations', () => {
        check(`foo {
				@circle {
					diameter: 100px;
					color: red;
				}
			}`, `foo {
				border-radius: 50%;
				width: 100px;
				height: 100px;
				background-color: red
			}`);
    });
    function check(actual, expected) {
        const processor = postcss().use(plugin);
        if (expected instanceof RegExp) {
            expect(() => {
                return processor.process(stripTabs(actual)).css;
            }).to.throw(expected);
            return;
        }
        expect(processor.process(stripTabs(actual)).css).to.equal(stripTabs(expected));
    }
    function stripTabs(input) {
        return input.replace(/\t/g, '');
    }
});
