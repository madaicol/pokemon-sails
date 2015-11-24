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
		tipo: {
			type: 'string',
			enum: ['Acero', 'Agua', 'Bicho', 'Dragón', 'Eléctrico', 'Fantasma', 'Fuego', 'Hada', 'Hielo', 'Lucha', 'Normal', 'Planta', 'Psiquico', 'Roca', 'Siniestro', 'Tierra', 'Veneno', 'Volador', 'Oscuro', '???'],
			required: 'true'
		},
		tipo2: {
			type: 'string',
			enum: ['Acero', 'Agua', 'Bicho', 'Dragón', 'Eléctrico', 'Fantasma', 'Fuego', 'Hada', 'Hielo', 'Lucha', 'Normal', 'Planta', 'Psiquico', 'Roca', 'Siniestro', 'Tierra', 'Veneno', 'Volador', 'Oscuro', '???']
		},
		debilidad: {
			type: 'string',
			enum: ['Acero', 'Agua', 'Bicho', 'Dragón', 'Eléctrico', 'Fantasma', 'Fuego', 'Hada', 'Hielo', 'Lucha', 'Normal', 'Planta', 'Psiquico', 'Roca', 'Siniestro', 'Tierra', 'Veneno', 'Volador', 'Oscuro', '???'],
			required: 'true'
		},
		debilidad2: {
			type: 'string',
			enum: ['Acero', 'Agua', 'Bicho', 'Dragón', 'Eléctrico', 'Fantasma', 'Fuego', 'Hada', 'Hielo', 'Lucha', 'Normal', 'Planta', 'Psiquico', 'Roca', 'Siniestro', 'Tierra', 'Veneno', 'Volador', 'Oscuro', '???'],
		},
		debilidad3: {
			type: 'string',
			enum: ['Acero', 'Agua', 'Bicho', 'Dragón', 'Eléctrico', 'Fantasma', 'Fuego', 'Hada', 'Hielo', 'Lucha', 'Normal', 'Planta', 'Psiquico', 'Roca', 'Siniestro', 'Tierra', 'Veneno', 'Volador', 'Oscuro', '???'],
		},
		debilidad4: {
			type: 'string',
			enum: ['Acero', 'Agua', 'Bicho', 'Dragón', 'Eléctrico', 'Fantasma', 'Fuego', 'Hada', 'Hielo', 'Lucha', 'Normal', 'Planta', 'Psiquico', 'Roca', 'Siniestro', 'Tierra', 'Veneno', 'Volador', 'Oscuro', '???'],
		},
		habilidadEspecial: {
			type: 'string'
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
		entrenador: {
			model: 'Usuarios'
		}
	}
};