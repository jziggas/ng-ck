[![npm](https://img.shields.io/npm/v/ng-ck.svg)](https://www.npmjs.com/package/ng-ck)
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

ng-ck has callback bindings available for all of the events that occur on an editor instance.

The callback attributes follow a format of `on-camel-cased-event="myCallback(event, editor)"` and return the event that occured as well as the editor object.

For example, the `'instanceReady'` event would be `on-instance-ready="myCallback(event, editor)"` and `'doubleclick'` would be `on-doubleclick=myCallback(event, editor)`

The list of events can be found at the [CKEDITOR.editor Documentation](http://docs.ckeditor.com/#!/api/CKEDITOR.editor)

The following attributes are also available:

- `checkTextLength: '<?`
  - Validates ngModel against the length of text in the editor.
  - Default `undefined`
- `config: '<?'`
  - Configuration object passed to CKEditor. Overwrites the default configuration provided by `ngCkConfigProvider`.
- `maxLength: '<?'`
  - Checks against the length of html in the editor. Can be configured to check the length of text instead via `checkTextLength`.
  - Updates ngModel validity.
  - Default `undefined`.
- `minLength: '<?'`
  - Checks against the length of html in the editor. Can be configured to check the length of text instead via `checkTextLength`.
  - Updates ngModel validity. Default `undefined`.
- `readOnly: '<?'`
  - Sets the [readOnly](http://docs.ckeditor.com/#!/api/CKEDITOR.editor-property-readOnly) property of the editor. Default `undefined`.
- `required: '<?'`
  - Updates ngModel validity. Default `undefined`.
- `onContentChanged: '&?'`
  - CKEditor's `'change'` event gets triggered on a variety of actions that take place and not just when the content changes. This callback lets you know when a change in content has actually taken place.
  - `on-content-changed="onContentChanged(editor, html, text)"`

## Contribution
- Pull requests welcome.

## Support
[![Beerpay](https://beerpay.io/jziggas/ng-ck/badge.svg?style=flat)](https://beerpay.io/jziggas/ng-ck)
[![Beerpay](https://beerpay.io/jziggas/ng-ck/make-wish.svg?style=flat)](https://beerpay.io/jziggas/ng-ck)
