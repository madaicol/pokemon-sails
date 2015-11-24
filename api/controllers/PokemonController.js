/**
 * PokemonController
 *
 * @description :: Server-side logic for managing Pokemons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	registrarPokemon: function (req, res) {
		/*Mirar abajo */
		var deleteFd = 'C:\\Users\\MadaiCarlos\\Documents\\GitHub\pokemon-sails\\assets\\images';
		var id;	
		console.log("POKEMONS o POKEMON");		
		//console.log(Pokemons.find());
		//console.log(Pokemons.find());
		//console.log(Pokemon.find());		
		
		Pokemons.find()
			.exec(function (err, results) {
				if (err) return res.negotiate();
				id = results.length;
			});
		req.file('perfil').upload({
			dirname: '../../assets/images',
			maxBytes: 10000000
		}, function whenDone(err, uploadedFiles) {
			if (err) {
				return res.negotiate(err);
			}

			// If no files were uploaded, respond with an error.
			if (uploadedFiles.length === 0) {
				return res.badRequest('No file was uploaded');
			}
			//console.log(uploadedFiles[0]);
			var urlImagen = uploadedFiles[0].fd.replace(deleteFd, "");
			// Generate a unique URL where the avatar can be downloaded.

			var nuevoPokemon = {
				nombre: req.param('nombre'),
				nick: req.param('nick'),
				numeroPokemo: req.param('numeroPokemo'),
				tipo: req.param('tipo'),
				habilidadEspecial: req.param('habilidadEspecial'),
				maestro: req.session.user.id,
				avatarUrl: require('util').format('%s/pokemon/avatar/%s', sails.getBaseUrl(), id),
				avatarFd: uploadedFiles[0].fd,
				url: urlImagen
			}
			Pokemons.create(nuevoPokemon, function (err, usr) {
				if (err)
					return res.redirect('/pokemonF');

				//console.log(nuevoPokemon);
				return res.redirect('/pokemon')
			})
		});

	},

	devolverPokemons: function (req, res) {
		//console.log(req.session.user.id);
		var pokemon = [];
		var j = 0;
		var i;
		Pokemons.find()
			.exec(function (err, results) {
				if (err) return res.negotiate();
				for (i = 0; i < results.length; i++) {
					if (results[i].maestro == req.session.user.id) {
						pokemon[j] = results[i];
						j++;
					}
				}
				//console.log(pokemon);
				return res.view('pokemon', {
					pokemons: pokemon
				});
			});
	}

};
/*
             var nuevoPokemon = {
                    nombre: req.param('nombre'),
                    nick: req.param('nick'),
                    numeroPokemo: req.param('numeroPokemo'),
                    tipo: req.param('tipo'),
                    habilidadEspecial: req.param('habilidadEspecial'),
                    maestro: req.session.user.id
                }
                console.log(req.session.user);
        
                Pokemons.create(nuevoPokemon, function (err, usr) {                    if (err)
                        return res.redirect('/pokemonF');
        
                    console.log(nuevoPokemon);
                    return res.redirect('/pokemon')
                })
*/