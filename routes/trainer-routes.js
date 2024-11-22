const express = require('express');
// const { check } = require('express-validator');

const  {
  createTrainers, 
  getTrainerByExpertise,
  getTrainerByName,
  getAllTrainers,
  getPlacesByUserId,
  createTrainer,
  updateTrainerDetails,
  deleteTrainer,
  updateTrainerRatings
} = require('../controllers/trainers-controllers');

const router = express.Router();

router.get('/search', (req, res, next) => {
    const { expertise, name } = req.query;

    if (expertise) {
        return getTrainerByExpertise(req, res, next);
    } else if (name) {
        return getTrainerByName(req, res, next);
    } else {
        res.status(400).send('Bad Request: Missing required query parameters');
    }
});
// router.get('/getAllTrainers', getAllTrainers);
//
router.get('/getAllTrainers', (req, res) => {
  res.send('Response for /getAllTrainers');
});
//
router.post(
  '/',
 createTrainer
);

router.post(
    '/createTrainers',
    createTrainers
  );
  
router.patch(
  '/updateDetails',
  // [
  //   check('qualifications')
  //     .not()
  //     .isEmpty(),
  //   check('expertise').isLength({ min: 5 })
  // ],
  updateTrainerDetails
);

router.patch(
  '/updateRating',
  // [
  //   check('qualifications')
  //     .not()
  //     .isEmpty(),
  //   check('expertise').isLength({ min: 5 })
  // ],
  updateTrainerRatings
);
router.delete('/:pid', deleteTrainer);

module.exports = router;
