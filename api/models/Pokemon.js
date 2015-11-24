/**
* Pokemon.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

        nombre: {
            type: 'string',
            required: 'true'
        },
        nick: {
            type: 'string',
            required: 'true'
        },
        tipo: {
            type: 'string',
            enum: ['agua', 'fuego', 'psiquico', 'hierba', 'electrico', 'bicho']
        },
        habilidadEspecial: {
            type: 'string'
        },
        numeroPokemo: {
            type: 'string',
            required: 'true'
        },
        avatarUrl: {
            type: "string",
            unique: true
        },
        avatarFd: {
            type: "string",
            unique: true
        },
        url: {
            type: "string",
            unique: true
        },
        maestro: {
            model: 'Usuarios'
        }

    }
};

