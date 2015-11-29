/**
 * PokemonsController
 *
 * @description :: Server-side logic for managing Pokemons
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    registrarPokemon: function (req, res) {
        //        var nuevoPokemon = {
        //            nombre: req.param('nombre'),
        //            nick: req.param('nick'),
        //            numeroPokemo: req.param('numeroPokemo'),
        //            tipo: req.param('tipo'),
        //            habilidadEspecial: req.param('habilidadEspecial'),
        //            maestro: req.session.user.id
        //        }
        //        console.log(req.session.user);
        //
        //        Pokemons.create(nuevoPokemon, function (err, usr) {
        //            if (err)
        //                return res.redirect('/pokemonF');
        //
        //            console.log(nuevoPokemon);
        //            return res.redirect('/pokemon')
        //        })

        var deleteFd = 'C:\\Users\\MadaiCarlos\\Documents\\GitHub\\pokemon-sails\\assets\\images';
        var id;
		console.log(req.param());
        Pokemon.find()
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
            console.log(uploadedFiles[0]);
            var urlImagen = uploadedFiles[0].fd.replace(deleteFd, "");
            // Generate a unique URL where the avatar can be downloaded.

            var nuevoPokemon = {
                nombre: req.param('nombre'),
                tipo: req.param('tipo'),
                tipo2: req.param('tipo2'),
				debilidad: req.param('debilidad'),
				debilidad2: req.param('debilidad2'),
				debilidad3: req.param('debilidad3'),
				debilidad4: req.param('debilidad4'),
                habilidadEspecial: req.param('habilidadEspecial'),
                maestro: req.session.user.id,
                avatarUrl: require('util').format('%s/pokemon/avatar/%s', sails.getBaseUrl(), id),
                avatarFd: uploadedFiles[0].fd,
                url: urlImagen
            }
            Pokemon.create(nuevoPokemon, function (err, usr) {
                if (err)
                    return res.redirect('/formularioPokemon');

                console.log(nuevoPokemon);
                return res.redirect('/pokemon')
            })
        });

    },

    devolverPokemon: function (req, res) {
        console.log(req.session.user.id);
        var pokemon = [];
        var j = 0;
        var i;
        Pokemon.find()
            .exec(function (err, results) {
                if (err) return res.negotiate();
                for (i = 0; i < results.length; i++) {
                    if (results[i].maestro == req.session.user.id) {
                        pokemon[j] = results[i];
                        j++;
                    }
                }
                console.log(pokemon);
                return res.view('pokemon', {
                    pokemon: pokemon
                });
            });
    }

};