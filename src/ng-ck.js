'use strict'
var app = angular.module('ngCk', [])
app.provider('ngCkConfig', function ngCkConfigProvider () {
  // Default plugins that have successfully passed through Angular's $sanitize service
  let defaultConfiguration = {
    toolbar: [[
      'PasteText',
      'Undo',
      'Redo',
      'Bold',
      'Italic',
      'Underline',
      'Strike',
      'Subscript',
      'Superscript',
      'RemoveFormat',
      'NumberedList',
      'BulletedList',
      'Blockquote',
      'Link',
      'Unlink',
      'Image',
      'Find',
      'ReplaceAll',
      'SelectAll']],
    language: 'en'
  }

  let config = angular.copy(defaultConfiguration)

  this.set = (customConfiguration) => {
    config = customConfiguration
  }

  this.merge = (customConfiguration) => {
    config = angular.merge({}, defaultConfiguration, customConfiguration)
  }

  this.$get = () => config
})

app.component('ngCk', {
  controllerAs: 'vm',
  require: {
    ngModelCtrl: 'ngModel'
  },
  bindings: {
    config: '<?',
    debug: '<?',
    maxLength: '<?',
    minLength: '<?',
    placeholder: '<?',
    readOnly: '<?',
    required: '<?',
    onBlur: '&?',
    onContentChanged: '&?',
    onFocus: '&?',
    onInstanceReady: '&?',
    onKey: '&?',
    onPaste: '&?',
    onResize: '&?',
    onSave: '&?'
  },
  template: '<textarea ng-attr-placeholder="{{vm.placeholder}}"></textarea>',
  controller: ['$element', 'ngCkConfig', function NgCk ($element, ngCkConfig) {
    let vm = this
    let config
    let content
    let editor
    let editorElement
    let editorChanged = false
    let modelChanged = false
    vm.$onInit = onInit
    vm.$postLink = postLink
    vm.$onChanges = onChanges
    vm.$onDestroy = onDestroy

    function onInit () {
      vm.ngModelCtrl.$render = () => {
        if (editor) {
          editor.setData(vm.ngModelCtrl.$viewValue, {
            noSnapshot: true,
            callback: () => {
              editor.fire('updateSnapshot')
            }
          })
        }
      }

      config = vm.config ? angular.merge({}, vm.config) : ngCkConfig
    }

    function postLink () {
      editorElement = $element[0].children[0]
      editor = CKEDITOR.replace(editorElement, config)

      editor.on('instanceReady', onInstanceReady)
      editor.on('pasteState', onEditorChange)
      editor.on('change', onEditorChange)
      editor.on('focus', onFocus)
      editor.on('blur', onBlur)

      if (content) {
        modelChanged = true
        editor.setData(content, {
          noSnapshot: true,
          callback: () => {
            editor.fire('updateSnapshot')
          }
        })
      }
    }

    function onInstanceReady () {
      onDebug()
      if (vm.onInstanceReady) {
        vm.onInstanceReady({editor: editor})
      }
      if (vm.onKey) {
        editor.on('key', function onEditorKey (event) {
          vm.onKey({$event: event, editor: editor})
        })
      }
      if (vm.onResize) {
        editor.on('resize', function onEditorResize (event) {
          vm.onResize({$event: event, editor: editor})
        })
      }
      if (vm.onPaste) {
        editor.on('paste', function onEditorPaste (event) {
          vm.onPaste({$event: event, editor: editor})
        })
      }
      if (vm.onSave) {
        editor.on('save', function onEditorSave (event) {
          vm.onSave({$event: event, editor: editor})
        })
      }
      vm.ngModelCtrl.$render()
    }

    function onEditorChange () {
      onDebug()

      let html = editor.getData()
      let text = editor.document.getBody().getText()

      if (text === '\n') {
        text = ''
      }

      validate(text)

      if (!modelChanged && html !== vm.ngModelCtrl.$viewValue) {
        editorChanged = true
        vm.ngModelCtrl.$setViewValue(html)
        if (vm.onContentChanged) {
          vm.onContentChanged({
            editor: editor,
            html: html,
            text: text
          })
        }
      }
      modelChanged = false
    }

    function onFocus (e) {
      if (vm.onFocus) {
        vm.onFocus({
          $event: e,
          editor: editor
        })
      }
    }

    function onBlur (e) {
      if (vm.onBlur) {
        vm.onBlur({
          $event: e,
          editor: editor
        })
      }
    }

    function onChanges (changes) {
      if (
          changes.ngModel &&
          changes.ngModel.currentValue !== changes.ngModel.previousValue
      ) {
        content = changes.ngModel.currentValue
        if (editor && !editorChanged) {
          if (content) {
            editor.setData(content, {
              noSnapshot: true,
              callback: () => {
                editor.fire('updateSnapshot')
              }
            })
            modelChanged = true
          }
        }
        editorChanged = false
      }
      if (editor && changes.readOnly) {
        editor.setReadOnly(changes.readOnly.currentValue)
      }
    }

    // http://stackoverflow.com/a/25455671/2469215
    // http://stackoverflow.com/a/21422371/2469215
    function onDestroy () {
      editor.document.clearCustomData()
      editor.window.getFrame().clearCustomData()
      editor.removeAllListeners()
      editor.destroy()
    }

    function validate (text) {
      if (vm.maxLength) {
        vm.ngModelCtrl.$setValidity('maxlength', text.length > vm.maxLength + 1)
      }
      if (vm.minLength) {
        vm.ngModelCtrl.$setValidity('minlength', text.length <= vm.minLength)
      }
      if (vm.required) {
        vm.ngModelCtrl.$setValidity('required', text.length > 0)
      }
    }

    function onDebug () {
      if (vm.debug) {
        console.log('Editor: ', editor)
        console.log('ngModelCtrl: ', vm.ngModelCtrl)
        console.log('controller: ', vm)
      }
    }
  }]
})
