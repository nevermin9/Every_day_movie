const Router = require('router');
const userControllers = require('../controllers/userControllers');
const cors = require('cors');
const bodyParser = require('body-parser');
// const jwtHandlers = require('../helpers/jwtHandlers');

const router = Router();

//middleware
router.use(cors());
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))
// router.use(jwtHandlers.verifyToken);

//routes
router.post('/api/v1/auth/signup', userControllers.createUser);
router.post('/api/v1/auth/signin', userControllers.signInUser);

module.exports = router;
