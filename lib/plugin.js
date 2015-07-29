import postcss from 'postcss';
const errorContext = {
    plugin: 'postcss-circle'
};
export default postcss.plugin('postcss-circle', () => {
    return root => {
        root.eachAtRule('circle', atRule => {
            if (atRule.params.length) {
                throw atRule.error(`Parameters are not supported: ${atRule.params}`, errorContext);
            }
            postcss.decl({
                prop: 'border-radius',
                value: '50%'
            }).moveBefore(atRule);
            let isDiameterProvided = false;
            atRule.eachDecl('diameter', decl => {
                isDiameterProvided = true;
                decl.prop = 'width';
                decl.moveBefore(atRule);
                decl.cloneAfter({ prop: 'height' });
            });
            if (!isDiameterProvided) {
                throw atRule.error(`Missing required property: diameter`, errorContext);
            }
            let isColorProvided = false;
            atRule.eachDecl('color', decl => {
                isColorProvided = true;
                decl.prop = 'background-color';
                decl.moveBefore(atRule);
            });
            if (!isColorProvided) {
                throw atRule.error(`Missing required property: color`, errorContext);
            }
            atRule.eachDecl(decl => {
                throw decl.error(`Unsupported property: ${decl.prop}`, errorContext);
            });
            atRule.removeSelf();
        });
    };
});
