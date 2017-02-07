[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/jziggas/ng-ck/master/LICENSE)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/jziggas/ng-ck.svg?branch=master)](https://travis-ci.org/jziggas/ng-ck)

# ng-ck

ng-ck is an Angular 1 Component wrapper for the WYSIWIG rich text editor CKEditor.

## Requirements

- Angular 1.6+
- CKEditor 4.6+

## Installation

via NPM:

`npm i ng-ck --save`

via Bower:

`bower install --save https://github.com/jziggas/ng-ck#<RELEASE_VERSION>`

## Usage

- Add ng-ck as a dependency to your app module (e.g. `angular.module('myApp', ['ngCk']);`)
- Add the directive to your template: `<ng-ck ng-model="content"></ng-ck>`

## Configuration

- A default set of toolbar options are provided by `ngCkConfigProvider` with editor buttons that are capable of passing through Angular's [$sanitize](https://docs.angularjs.org/api/ngSanitize/service/$sanitize) service.
- You can use `ngCkConfigProvider` to overwrite the default configuration object in an `app.config` block:

  ```
  app.config(['ngCkConfig', function(ngCkConfig) {
    let config = {
      language: 'ru',
      toolbar: ['Cut', 'Copy', 'Paste'],
      removePlugins: 'elementspath'
     }
     
     // Use this to overwrite the default configuration object
     ngCkConfig.set(config)
     
     // Or merge your own configuration object into the default configuration
     ngCkConfig.merge(config)
  }])
  ```

- Or you can pass a configuration object, per instance of the editor, to overwrite the default configuration:

  ```
  <ng-ck ng-model="content" config="myConfig"></ng-ck>
  ```

## Bindings

- `config: '<?'`
  - Configuration object passed to CKEditor. Overwrites the default configuration provided by `ngCkConfigProvider`.
- `maxLength: '<?'`
  - Default `undefined`.
- `minLength: '<?'`
  - Default `undefined`.
- `readOnly: '<?'`
  - Sets the [readOnly](http://docs.ckeditor.com/#!/api/CKEDITOR.editor-property-readOnly) property of the editor. Default `undefined`.
- `required: '<?'`
  - Designates if the editor is a required form input and sets the validity of ngModel. Default `undefined`.
- `onBlur: '&?'`
  - A callback for the [blur](http://docs.ckeditor.com/#!/api/CKEDITOR.editor-event-blur) event
  - `on-focus="contentChanged($event, editor)"`
- `onContentChanged: '&?'`
  - A callback for the [change](http://docs.ckeditor.com/#!/api/CKEDITOR.editor-event-change) event
  - `on-content-changed="contentChanged(editor, html, text)"`
- `onFocus: '&?'`
  - A callback for the [focus](http://docs.ckeditor.com/#!/api/CKEDITOR.editor-event-focus) event
  - `on-focus="contentChanged($event, editor)"`
- `onInstanceReady: '&?`
  - A callback for the [instanceReady](http://docs.ckeditor.com/#!/api/CKEDITOR-event-instanceReady) event
  - `on-instance-ready="instanceReady(editor)"`

## Contribution
- Welcome
