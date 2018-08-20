var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var queries = require('../knex/queries');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

let middleware = (req, res, next) => {
	console.log(`date: ${Date.now()}`);
	next();
	//next({code:405});
}

router.use(middleware);

router.get('/about/:version', function (req, res, next) {
	// res.status(500).send('Something broke!')
	res.json({ response: req.params });
});

router.use(urlencodedParser);

const allowedApiKeys = [1234, 4567, 8910];

const validateAuthorizationKey = (req, res, next) => {
	const authorizationKey = req.headers.authorization ? req.headers.authorization : false;
	if(authorizationKey) {
		console.log('authorizationKey', authorizationKey);
		console.log('cheking authorization key');
		console.log('allowedApiKeys.indexOf(authorizationKey)', allowedApiKeys.indexOf(authorizationKey));
		if(allowedApiKeys.indexOf(parseInt(authorizationKey) != -1)){
			req.isAuthorized = true;
			next();
		} else {
			next({code:404})
		}
	} else {
		next();
	}
	
}

//router.use(validateAuthorizationKey);

router.post('/some/service', function (req, res, next) {
	if (!req.body) return res.sendStatus(400);
	res.json(req.body);
});

router.get('/apikey', function (req, res, next) {
	queries.getAllApikey()
		.then(function(shows) {
			res.status(200).json(shows);
		})
		.catch(function(error) {
			next(error);
		});
	// res.json(req.body);
});

const errorHandler = (err, req, res, next) => {
	console.log('err', err);
	if (err) {
		res.status(500).json({ code: err.code });
		next(err);
	}
}

router.use(errorHandler);

module.exports = router;
