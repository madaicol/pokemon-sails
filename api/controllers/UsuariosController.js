/**
 * UsuariosController
 *
 * @description :: Server-side logic for managing Usuarios
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	subirFoto: function (req, res) {

		var params = req.allParams();
		var deleteFd = 'F:\\Documents\\JavaScript\\Repositorios\\TecWebJav\\ArchivosSesionEPN\\assets\\images';
		console.log(req);
		sails.log.info('Perfil: ', params.perfil);

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
			// Save the "fd" and the url where the avatar for a user can be accessed

			Usuarios.update(req.session.me, {

					// Generate a unique URL where the avatar can be downloaded.
					avatarUrl: require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.session.me),

					// Grab the first file and use it's `fd` (file descriptor)
					avatarFd: uploadedFiles[0].fd,
					url: urlImagen
				})
				.exec(function (err) {
					if (err) return res.negotiate(err);
					req.session.user.url = urlImagen;
					return res.redirect('http://localhost:1337/usuario');
				});
		});

	},


	/**
	 * Download avatar of the user with the specified id
	 *
	 * (GET /user/avatar/:id)
	 */
	descargarFoto: function (req, res) {

		req.validate({
			id: 'string'
		});

		Usuarios.findOne(req.param('id')).exec(function (err, user) {
			if (err) return res.negotiate(err);
			if (!user) return res.notFound();

			// User has no avatar image uploaded.
			// (should have never have hit this endpoint and used the default image)
			if (!user.avatarFd) {
				return res.notFound();
			}

			var SkipperDisk = require('skipper-disk');
			var fileAdapter = SkipperDisk( /* optional opts */ );

			// Stream the file down
			fileAdapter.read(user.avatarFd)
				.on('error', function (err) {
					return res.serverError(err);
				})
				.pipe(res);
		});
	},
	home: function (req, res) {
		var user;
		Usuarios.find()
			.exec(function (err, results) {
				if (err) return res.negotiate();
				user = results;
				console.log(user);
				return res.view('homepage', {
					usuarios: user,
				});
			});

	},
	registrarUsuario: function (req, res) {
		var nuevoUsuario = {
			nombre: req.param('nombre'),
			usuario: req.param('usuario'),
			password: req.param('password')
		}

		Usuarios.create(nuevoUsuario, function (err, usr) {
			if (err)
				return res.redirect('/formulario');

			console.log(nuevoUsuario);
			return res.redirect('/login')
		})

	}

};