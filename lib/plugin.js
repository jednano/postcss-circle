import postcss from 'postcss';
const errorContext = {
    plugin: 'postcss-circle'
};
export default postcss.plugin('postcss-circle', () => {
    const borderRadiusProps = {
        prop: 'border-radius',
        value: '50%'
    };
    return root => {
        root.eachRule(rule => {
            let isCircleRule, diameter, color;
            rule.eachDecl('circle-diameter', decl => {
                isCircleRule = true;
                decl.cloneBefore(borderRadiusProps);
                diameter = decl.value;
                decl.prop = 'width';
                decl.cloneAfter({ prop: 'height' });
            });
            rule.eachDecl('circle-color', decl => {
                isCircleRule = true;
                color = decl.value;
                decl.prop = 'background-color';
            });
            rule.eachDecl('circle', decl => {
                isCircleRule = true;
                [diameter, color] = postcss.list.space(decl.value);
                if (!/^\d/.test(diameter)) {
                    [diameter, color] = [color, diameter];
                }
                decl.cloneBefore(borderRadiusProps);
                decl.cloneAfter({
                    prop: 'background-color',
                    value: color
                });
                decl.prop = 'width';
                decl.value = diameter;
                decl.cloneAfter({ prop: 'height' });
            });
            rule.eachDecl(/^circle-/, decl => {
                throw decl.error(`Unsupported property: ${decl.prop}`, errorContext);
            });
            if (!isCircleRule) {
                return;
            }
            if (typeof diameter === 'undefined') {
                throw rule.error(`Missing required property: circle-diameter`, errorContext);
            }
            if (typeof color === 'undefined') {
                throw rule.error(`Missing required property: circle-color`, errorContext);
            }
        });
    };
});
