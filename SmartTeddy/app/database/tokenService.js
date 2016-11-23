import Realm from 'realm';
import TokenModel from './tokenModel';

let repository = new Realm({
    schema: [{
        name: 'Token',
        primaryKey: 'name',
        properties: {
            name: 'string',
            token : 'string'
        }
    }]
});
repository.addListener('change', () => {
    // Update UI
    
});
let TokenService = {

    save: function(obj) {

        if (repository.objects('Token').filtered("name = '" + obj.name + "'").length) return;

        repository.write(() => {
            repository.create('Token', obj);
        });
        console.log('save!!!!!!!!!!!!!!!!!!!!!!!')
        console.log(repository.objects('Token'))

    },
    getByName: function(name) {
        let result = repository.objects('Token').filtered('name = "'+name+'"');
        return result[0];
    },
    deleteByName: function(name) {
        console.log('before delete!!!!!!!!!!!!!!!!!!!!!!!')
        console.log(repository.objects('Token'))
        let obj = realm.objects('Token').filtered('name = "'+name+'"');
        realm.delete(obj);
        console.log('after delete!!!!!!!!!!!!!!!!!!!!!!!')
        console.log(repository.objects('Token'))
    },
    deleteAll: function(name) {
        console.log('before delete all!!!!!!!!!!!!!!!!!!!!!!!')
        console.log(repository.objects('Token'))
        let obj = realm.objects('Token');
        realm.delete(obj);
        console.log('after delete!!!!!!!!!!!!!!!!!!!!!!!')
        console.log(repository.objects('Token'))
    }
};

module.exports = TokenService;