[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/jziggas/ng-ck/master/LICENSE)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)](https://github.com/jziggas/ng-ck)

# ng-ck

ng-ck is an Angular 1 Component wrapper for the WYSIWIG rich text editor CKEditor.

## Requirements

- Angular 1.6+
- CKEditor 4.6+

## Installation

`npm i ng-ck --save`

## Usage

- Add ng-ck as a dependency to your app module (e.g. `angular.module('myApp', ['ngCk']);`)
- use ngCkConfigProvider to overwrite the default configuration object in an `app.config` block, or pass a configuration object in per instance.
- Add the directive to your template: `<ng-ck ng-model="content"></ng-ck>`