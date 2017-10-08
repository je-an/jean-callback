({
    baseUrl: '.',
    out: 'dist/jean-callback.js',
    optimize: 'uglify2',
    name: "node_modules/jean-amd/dist/jean-amd",
    include: ["src/Callback"],
    wrap: {
        start:
        "(function (root, factory) { \n" +
        " \t if (typeof define === 'function' && define.amd) { \n" +
        "\t \t define([], factory); \n" +
        "\t} else if(typeof module === 'object' && module.exports) { \n" +
        "\t\t module.exports = factory(); \n " +
        "\t} else { \n" +
        "\t \troot.Callback = root.Callback || {}; \n" +
        "\t \troot.Callback = factory();\n" +
        "\t}\n" +
        "}(this, function() {",
        end:
        "\n \t return require('src/Callback'); \n" +
        "}));"
    },
    paths: {
        TypeCheck: "node_modules/jean-type-check/src/TypeCheck"
    }
})