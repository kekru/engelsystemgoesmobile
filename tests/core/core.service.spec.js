describe('core.service tests', function () {
  var LoginService, $q, $ionicModal, $rootScope;


  beforeEach(module('ionic'));
  beforeEach(module('core.service'));

  beforeEach(inject(function (_LoginService_, _$q_, _$ionicModal_, _$rootScope_) {
    LoginService = _LoginService_;
    $q = _$q_;
    $ionicModal = _$ionicModal_;
    $rootScope = _$rootScope_;
  }));

  describe('LoginService', function () {

    it('should have defined methods', function () {
      expect(LoginService.isAuthenticated).toBeDefined();
      expect(LoginService.showDialog).toBeDefined();
      expect(LoginService.authenticate).toBeDefined();
      expect(LoginService.getApiKey).toBeDefined();
    });

    describe('isAuthenticated tests', function () {

      it('should return false, if no auth key is availabie', function () {
        expect(LoginService.isAuthenticated()).toBeFalsy();
      });

      it('should return true, if auth key is in localStorage', function () {
        spyOn(localStorage, 'getItem').and.returnValue('key');

        expect(LoginService.isAuthenticated()).toBeTruthy();
      });

    });

    describe('showDialog tests', function () {

      var modalWrapper = {
        show: function() {},
        hide: function() {}
      };
      beforeEach(function () {
        spyOn(modalWrapper, 'show');
        spyOn(modalWrapper, 'hide');
      });

      it('should show a login dialog', function () {

        spyOn($ionicModal, 'fromTemplateUrl').and.returnValue($q.when(modalWrapper));

        LoginService.showDialog();
        $rootScope.$digest();

        expect($ionicModal.fromTemplateUrl).toHaveBeenCalledWith('templates/login.html', jasmine.any(Object));
        expect(modalWrapper.show).toHaveBeenCalled();
        expect($rootScope.$$childHead.modal).toEqual(modalWrapper);
      });

      it('should submit form, if form is valid', function () {
        spyOn($ionicModal, 'fromTemplateUrl').and.returnValue($q.when(modalWrapper));
        spyOn(LoginService, 'authenticate').and.returnValue($q.when());

        LoginService.showDialog();
        $rootScope.$digest();

        $rootScope.$$childHead.user.nick = 'asd';
        $rootScope.$$childHead.user.password = 'qwe';

        $rootScope.$$childHead.submit_form({$valid: true});
        expect(LoginService.authenticate).toHaveBeenCalledWith('asd', 'qwe');
      });

    });

    describe('authenticate tests', function () {

    });

  });
});
