angular.module('ChartsApp', [
    'officeuifabric.core',
    'officeuifabric.components'
])
    .run(function(data) {
        data.fetchJsonData().then(function (response) {
            console.log('data loaded');
        }, console.error);
    });
