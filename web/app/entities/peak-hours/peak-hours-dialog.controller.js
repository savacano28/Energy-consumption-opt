(function() {
    'use strict';

    angular
        .module('synergreenApp')
        .controller('PeakHoursDialogController', PeakHoursDialogController);

    PeakHoursDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'PeakHours', 'EnergyProvider'];

    function PeakHoursDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, PeakHours, EnergyProvider) {
        var vm = this;

        vm.peakHours = entity;
        vm.clear = clear;
        vm.save = save;
        vm.energyproviders = EnergyProvider.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.peakHours.id !== null) {
                PeakHours.update(vm.peakHours, onSaveSuccess, onSaveError);
            } else {
                PeakHours.save(vm.peakHours, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('synergreenApp:peakHoursUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
