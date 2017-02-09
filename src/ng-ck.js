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

  let events = [
    'activeEnterModeChange',
    'activeFilterChange',
    'afterCommandExec',
    'afterInsertHtml',
    'afterPaste',
    'afterPasteFromWord',
    'afterSetData',
    'afterUndoImage',
    'ariaEditorHelpLabel',
    'autogrow',
    'beforeCommandExec',
    'beforeDestroy',
    'beforeGetData',
    'beforeModeUnload',
    'beforeSetMode',
    'beforeUndoImage',
    'blur',
    'change',
    'configLoaded',
    'contentDirLoaded',
    'contentDom',
    'contentDomInvalidated',
    'contentDomUnload',
    'customConfigLoaded',
    'dataFiltered',
    'dataReady',
    'destroy',
    'dialogHide',
    'dialogShow',
    'dirChanged',
    'doubleclick',
    'dragend',
    'dragstart',
    'drop',
    'elementsPathUpdate',
    'fileUploadRequest',
    'fileUploadResponse',
    'floatingSpaceLayout',
    'focus',
    'getData',
    'getSnapshot',
    'insertElement',
    'insertHtml',
    'insertText',
    'instanceReady',
    'key',
    'langLoaded',
    'loadSnapshot',
    'loaded',
    'lockSnapshot',
    'maximize',
    'menuShow',
    'mode',
    'notificationHide',
    'notificationShow',
    'notificationUpdate',
    'paste',
    'pasteFromWord',
    'pluginsLoaded',
    'readOnly',
    'removeFormatCleanup',
    'required',
    'resize',
    'save',
    'saveSnapshot',
    'selectionChange',
    'setData',
    'stylesSet',
    'template',
    'toDataFormat',
    'toHtml',
    'unlockSnapshot',
    'updateSnapshot',
    'widgetDefinition'
  ]

  let config = angular.copy(defaultConfiguration)

  this.set = (customConfiguration) => {
    config = customConfiguration
  }

  this.merge = (customConfiguration) => {
    config = angular.merge({}, defaultConfiguration, customConfiguration)
  }

  this.$get = () => ({
    config: config,
    events: events
  })
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
    onActiveEnterModeChange: '&?',
    onActiveFilterChange: '&?',
    onAfterCommandExec: '&?',
    onAfterInsertHtml: '&?',
    onAfterPaste: '&?',
    onAfterPasteFromWord: '&?',
    onAfterSetData: '&?',
    onAfterUndoImage: '&?',
    onAriaEditorHelpLabel: '&?',
    onAutogrow: '&?',
    onBeforeCommandExec: '&?',
    onBeforeDestroy: '&?',
    onBeforeGetData: '&?',
    onBeforeModeUnload: '&?',
    onBeforeSetMode: '&?',
    onBeforeUndoImage: '&?',
    onBlur: '&?',
    onChange: '&?',
    onConfigLoaded: '&?',
    onContentChanged: '&?', // Not CKEditor API
    onContentDirLoaded: '&?',
    onContentDom: '&?',
    onContentDomInvalidated: '&?',
    onContentDomUnload: '&?',
    onCustomConfigLoaded: '&?',
    onDataFiltered: '&?',
    onDataReady: '&?',
    onDestroy: '&?', // Not sure if this works because of the cleanup done in $onDestroy. Needs testing.
    onDialogHide: '&?',
    onDialogShow: '&?',
    onDirChanged: '&?',
    onDoubleclick: '&?',
    onDragend: '&?',
    onDragstart: '&?',
    onDrop: '&?',
    onElementsPathUpdate: '&?',
    onFileUploadRequest: '&?',
    onFileUploadResponse: '&?',
    onFloatingSpaceLayout: '&?',
    onFocus: '&?',
    onGetData: '&?',
    onGetSnapshot: '&?',
    onInsertElement: '&?',
    onInsertHtml: '&?',
    onInsertText: '&?',
    onInstanceReady: '&?',
    onKey: '&?',
    onLangLoaded: '&?',
    onLoadSnapshot: '&?',
    onLoaded: '&?',
    onLockSnapshot: '&?',
    onMaximize: '&?',
    onMenuShow: '&?',
    onMode: '&?',
    onNotificationHide: '&?',
    onNotificationShow: '&?',
    onNotificationUpdate: '&?',
    onPaste: '&?',
    onPasteFromWord: '&?',
    onPluginsLoaded: '&?',
    onReadOnly: '&?',
    onRemoveFormatCleanup: '&?',
    onRequired: '&?',
    onResize: '&?',
    onSave: '&?',
    onSaveSnapshot: '&?',
    onSelectionChange: '&?',
    onSetData: '&?',
    onStylesSet: '&?',
    onTemplate: '&?',
    onToDataFormat: '&?',
    onToHtml: '&?',
    onUnlockSnapshot: '&?',
    onUpdateSnapshot: '&?',
    onWidgetDefinition: '&?',
    placeholder: '<?',
    readOnly: '<?',
    required: '<?'
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

      config = vm.config ? angular.merge({}, vm.config) : ngCkConfig.config
    }

    function postLink () {
      editorElement = $element[0].children[0]
      editor = CKEDITOR.replace(editorElement, config)

      editor.on('instanceReady', onInstanceReady)
      editor.on('pasteState', onEditorChange)
      editor.on('change', onEditorChange)

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

    function onInstanceReady (event) {
      onDebug()

      if (vm.onInstanceReady) {
        vm.onInstanceReady({
          event: event,
          editor: editor
        })
      }

      ngCkConfig
        .events
        .filter(eventName => eventName !== 'instanceReady')
        .forEach((eventName) => {
          let callbackName = 'on' + eventName[0].toUpperCase() + eventName.slice(1)

          if (vm[callbackName]) {
            editor.on(eventName, (event) => {
              vm[callbackName]({
                event: event,
                editor: editor
              })
            })
          }
        })

      vm.ngModelCtrl.$render()
    }

    function onEditorChange () {
      onDebug()

      let html = editor.getData()
      let text = editor.document.getBody().getText()

      if (text === '\n') {
        text = ''
      }

      if (!modelChanged && html !== vm.ngModelCtrl.$viewValue) {
        editorChanged = true
        vm.ngModelCtrl.$setViewValue(html)
        validate(text)
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
