module.exports = (config) => {
  config.set({

    basePath: '',

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/ckeditor/ckeditor.js',
      'node_modules/ckeditor/lang/en.js',
      'node_modules/ckeditor/styles.js',
      'node_modules/ckeditor/config.js',
      'dist/ng-ck.min.js',
      'tests/ng-ck.spec.js',
      'node_modules/ckeditor/contents.css',
      'node_modules/ckeditor/skins/moono-lisa/editor.css',
      'node_modules/ckeditor/plugins/scayt/skins/moono-lisa/scayt.css',
      'node_modules/ckeditor/plugins/wsc/skins/moono-lisa/wsc.css'
    ],

    preprocessors: { './src/ng-quill.js': 'coverage' },

    autoWatch: true,

    frameworks: ['jasmine'],

    reporters: ['mocha', 'coverage'],

    browsers: ['PhantomJS'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-jasmine',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher'
    ],
    singleRun: true,
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        {type: 'html', subdir: 'html'},
        {type: 'text'}
      ]
    }
  })
}
