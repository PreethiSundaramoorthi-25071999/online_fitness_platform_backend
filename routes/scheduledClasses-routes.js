const express = require('express');
const { check } = require('express-validator');

const scheduledClassesControllers = require('../controllers/scheduledClasses-controllers');

const router = express.Router();

router.get('/search', (req, res, next) => {
    const { expertise, name } = req.query;

    if (expertise) {
        return scheduledClassesControllers.getScheduledClassByExpertise(req, res, next);
    } else if (name) {
        return scheduledClassesControllers.getScheduledClassByName(req, res, next);
    } else {
        res.status(400).send('Bad Request: Missing required query parameters');
    }
});
router.get('/getAllScheduledClasss', scheduledClassesControllers.getAllScheduledClasss);

router.post(
  '/',
  scheduledClassesControllers.createScheduledClass
);

router.post(
    '/createScheduledClasss',
    scheduledClassesControllers.createScheduledClasss
  );
  
router.patch(
  '/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  scheduledClassesControllers.updateScheduledClass
);

router.delete('/:pid', scheduledClassesControllers.deleteScheduledClass);

module.exports = router;
