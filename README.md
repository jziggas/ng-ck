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
  app.config(['ngCkConfigProvider', function(ngCkConfigProvider) {
    let config = {
      language: 'ru',
      toolbar: ['Cut', 'Copy', 'Paste'],
      removePlugins: 'elementspath'
     }
     
     // Use this to overwrite the default configuration object
     ngCkConfigProvider.set(config)
     
     // Or merge your own configuration object into the default configuration
     ngCkConfigProvider.merge(config)
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
  - Callback for the [blur](http://docs.ckeditor.com/#!/api/CKEDITOR.editor-event-blur) event
  - `on-blur="onBlur($event, editor)"`
- `onContentChanged: '&?'`
  - Callback for the [change](http://docs.ckeditor.com/#!/api/CKEDITOR.editor-event-change) event
  - `on-content-changed="onContentChanged(editor, html, text)"`
- `onFocus: '&?'`
  - Callback for the [focus](http://docs.ckeditor.com/#!/api/CKEDITOR.editor-event-focus) event
  - `on-focus="onFocus($event, editor)"`
- `onInstanceReady: '&?`
  - Callback for the [instanceReady](http://docs.ckeditor.com/#!/api/CKEDITOR-event-instanceReady) event
  - `on-instance-ready="onInstanceReady(editor)"`
- `onKey: '&?`
  - Callback for the [key](http://docs.ckeditor.com/#!/api/CKEDITOR-event-key) event
  - `on-key="onKey($event, editor)"`
- `onPaste: '&?`
  - Callback for the [paste](http://docs.ckeditor.com/#!/api/CKEDITOR-event-paste) event
  - `on-paste="onPaste($event, editor)"`
- `onSave: '&?`
  - Callback for the [save](http://docs.ckeditor.com/#!/api/CKEDITOR-event-save) event
  - `on-save="onSave($event, editor)"`

## Contribution
- Pull requests welcome.
