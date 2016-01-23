module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        html2js: {
          options: {
            base: '',
            module: 'randomQuoteTemplates',
            singleModule: true,
            useStrict: true,
            htmlmin: {
              collapseBooleanAttributes: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true,
              removeComments: true,
              removeEmptyAttributes: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true
            }
          },
          main: {
            src: ['app/**/*.html', 'templates/*.html'],
            dest: 'app/populate_template_cache.js'
          }
        },
        concat: {
            "css": {
                "src": [
                            "lib/bootstrap/dist/css/bootstrap.min.css",
                            "lib/font-awesome/css/font-awesome.min.css",
                            "css/ie10-viewport-bug-workaround.css",
                            "css/custom.css"
                        ],
                "dest": "css/app.css"
            },
            "vendorjs": {
                "src": [
                            "lib/jquery/dist/jquery.min.js",
                            "lib/angular/angular.min.js",
                            "lib/bootstrap/dist/js/bootstrap.min.js",
                            "js/ie10-viewport-bug-workaround.js",
                        ],
                "dest": "js/vendor.js"
            },
            "appjs": {
                "src": [
                            "app/populate_template_cache.js",
                            "app/app.js",
                            "app/http-response-handlers.js",
                            "app/quotes.service.js",
                            "app/quote.ctrl.js",
                            "app/quotes.directive.js"
                        ],
                "dest": "js/app.js"
            }
        },
        cssmin: {
          target: {
            files: [{
              src: ['css/app.css'],
              dest: 'css/app.css',
            }]
          }
        },
        jshint: {
            beforeconcat: ['app/**/*.js'],
            afterconcat: ['js/app.js']
        }
       
    });

    // Load required modules
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-karma');

    // Task definitions
    grunt.registerTask('default', ['concat', 'cssmin', 'html2js']);
    grunt.registerTask('test', ['jshint:beforeconcat', 'concat', 'jshint:afterconcat']);
};