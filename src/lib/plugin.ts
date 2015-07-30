///<reference path="../../typings/postcss/.d.ts" />
import postcss from 'postcss';

const errorContext = {
	plugin: 'postcss-circle'
};

// ReSharper disable once UnusedLocals
export default postcss.plugin('postcss-circle', () => {
	return root => {
		root.eachRule(rule => {
			let diameter, color;
			rule.eachDecl('circle', decl => {
				[diameter, color] = postcss.list.space(decl.value);
				if (!/^\d/.test(diameter)) {
					[diameter, color] = [color, diameter];
				}
				if (!diameter) {
					throw decl.error('Missing diameter', errorContext);
				}
				decl.cloneBefore({
					prop: 'border-radius',
					value: '50%'
				});
				if (color) {
					decl.cloneAfter({
						prop: 'background-color',
						value: color
					});
				}
				decl.prop = 'width';
				decl.value = diameter;
				decl.cloneAfter({ prop: 'height' });
			});
		});
	};
});
