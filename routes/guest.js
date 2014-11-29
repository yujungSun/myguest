var Guest = require('../models/guest.js');

module.exports = function(app) {

	findAllGuests = function(req, res) {

		console.log("GET - /api/guest");

		return Guest.find(function(err, guests) {
			if(!err) {
				return res.send(guests);
			} else {
				res.statusCode = 500;
				return res.send({ error: 'Server error' });
			}
		});
	};


	findById = function(req, res) {
		console.log("GET - /api/guest/:id");
		return Guest.findById(req.params.id, function(err, guest) {

			if(!guest) {
				res.statusCode = 404;
				return res.send({ error: 'Not found' });
			}

			if(!err) {
				return res.send({ status: 'OK', guest:guest });
			} else {
				res.statusCode = 500;
				return res.send({ error: 'Server error' });
			}
		});
	};


	addGuest = function(req, res) {

		console.log('POST - /api/guest');
		console.log(req.body);

		var guest = new Guest();
		if (req.body.name != null) guest.name = req.body.name;
		if (req.body.gender != null) guest.gender = req.body.gender;
		if (req.body.age != null) guest.age = req.body.age;
		if (req.body.email != null) guest.email  = req.body.email;

		guest.save(function(err) {

			if(err) {
				console.log('guest 신규생성 도중 에러: ' + err);
				res.send({ error:err });
				return;

			} else {
				console.log("guest 신규생성 완료");
				return res.send({ status: 'OK', guest:guest });
			}
		});

	};



	updateGuest = function(req, res) {

		console.log("PUT - /api/guest/:id");
		return Guest.findById(req.params.id, function(err, guest) {

			if(!guest) {
				res.statusCode = 404;
				return res.send({ error: 'Not found' });
			}

			if (req.body.name != null) guest.name = req.body.name;
			if (req.body.gender != null) guest.gender = req.body.gender;
			if (req.body.age != null) guest.age = req.body.age;
			if (req.body.email != null) guest.email  = req.body.email;

			return guest.save(function(err) {
				if(!err) {
					console.log('guest 갱신 성공!');
					return res.send({ status: 'OK', guest:guest });
				} else {
					res.statusCode = 500;
					res.send({ error: 'Server error' });
				}
				res.send(guest);

			});
		});
	};


	deleteGuest = function(req, res) {

		console.log("DELETE - /api/guest/:id");
		return Guest.findById(req.params.id, function(err, guest) {
			if(!guest) {
				res.statusCode = 404;
				return res.send({ error: 'Not found' });
			}

			return guest.remove(function(err) {
				if(!err) {
					console.log('guest 삭제 성공!');
					return res.send({ status: 'OK' });
				} else {
					res.statusCode = 500;
					return res.send({ error: 'Server error' });
				}
			})
		});
	}

	//Link routes and actions
	app.get('/api/guest', findAllGuests);
	app.get('/api/guest/:id', findById);
	app.post('/api/guest', addGuest);
	app.put('/api/guest/:id', updateGuest);
	app.delete('/api/guest/:id', deleteGuest);

}