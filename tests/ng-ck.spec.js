describe('ng-ck', function () {
  var scope
  var createElement

  beforeEach(module('ngCk'))

  beforeEach(function (done) {
    window.CKEDITOR_BASEPATH = '../node_modules/ckeditor/ckeditor.js'
    inject(function ($rootScope, $compile, $document) {
      scope = $rootScope.$new()
      scope.content = '<p>Hello World.</p>'

      createElement = function () {
        var element = angular.element(
          '<ng-ck id="ng-ck" ng-model="content" ' +
          'on-instance-ready="instanceReady(event, editor)"' +
          'on-content-changed="onContentChanged(editor, html, text)"></ng-ck>')
        $compile(element)(scope)
        $document.find('body').append(element)
        scope.$digest()
      }
      done()
    })
  })

  afterEach(function (done) {
    inject(function ($rootScope) {
      scope.$destroy()
      $rootScope.$digest()
      // Give async stuff inside ckeditor a chance to resolve
      setTimeout(function () {
        expect(Object.keys(CKEDITOR.instances).length).toEqual(0)
        $('#ng-ck').remove()
        done()
      }, 20)
    })
  })

  describe('lifecycle', function () {
    it('should destroy instance on scope destroy', function (done) {
      scope.instanceReady = function () {
        done()
      }

      createElement()
    })

    it('should create a new editor', function (done) {
      scope.instanceReady = function () {
        expect(Object.keys(CKEDITOR.instances).length).toEqual(1)
        done()
      }

      createElement()
    })
  })

  describe('model syncing', function () {
    it('should render an editor with the ngModel value', function (done) {
      scope.instanceReady = function (event, editor) {
        expect(CKEDITOR.instances).toBeDefined()
        expect(editor.getData()).toEqual('<p>Hello World.</p>\n')
        done()
      }

      createElement()
    })

    it('should update ngModel to reflect a change in content', function (done) {
      scope.instanceReady = function (event, editor) {
        editor.setData('<p>Hello Change.</p>')
        scope.$digest()
      }
      scope.onContentChanged = function (editor, html) {
        expect(html).toEqual('<p>Hello Change.</p>\n')
        done()
      }
      createElement()
    })

    it('should update the editor to reflect a change in ngModel', function (done) {
      scope.instanceReady = function (event, editor) {
        scope.content = '<p>Hello Change.</p>'
        scope.$digest()

        setTimeout(function () {
          expect(editor.getData()).toEqual('<p>Hello Change.</p>\n')
          done()
        }, 50)
      }

      createElement()
    })
  })
})
