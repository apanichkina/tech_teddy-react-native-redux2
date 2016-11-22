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

let TokenService = {

    save: function(obj) {

        if (repository.objects('Token').filtered("name = '" + obj.name + "'").length) return;

        repository.write(() => {
            repository.create('Token', obj);
        })
        console.log('save!!!!!!!!!!!!!!!!!!!!!!!')
        console.log(repository.objects('Token'))

    },
    getByName: function(name) {
        let result = repository.objects('Token').filtered('name = "'+name+'"');
        return result[0];
    }
};

module.exports = TokenService;