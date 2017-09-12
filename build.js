({
    baseUrl: '.',
    out: 'dist/Callback.js',
    optimize: 'none',
    include: ["node_modules/almond/almond", "src/Callback"],
    wrap: {
        start: 
        "(function (root, factory) { \n" +
        " \t if (typeof define === 'function' && define.amd) { \n" +
        "\t \t define([], factory); \n" +
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