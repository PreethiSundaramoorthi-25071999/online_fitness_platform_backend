const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error'); 
const Trainer = require('../models/trainer');
const User = require('../models/user');

const getAllTrainers = async (req, res, next) => {
 

 let trainer
  try {
    trainer = await Trainer.find();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place.',
      500
    );
    return next(error);
  }

  if (!trainer) {
    const error = new HttpError(
      'Could not find a trainer for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ trainer: trainer });
};
const getTrainerByName = async (req, res, next) => {
   const name= req.params.pid;
    console.log(name)
    let trainer
     try {
       trainer = await Trainer.find({ name: { $regex: name, $options: 'i' } });
     } catch (err) {
       const error = new HttpError(
         'Something went wrong, could not find a place.',
         500
       );
       return next(error);
     }
   
     if (!trainer) {
       const error = new HttpError(
         'Could not find a trainer for the provided id.',
         404
       );
       return next(error);
     }
   
     res.json({ trainer: trainer });
   };
   
   const getTrainerByExpertise = async (req, res, next) => {
    const expertise= req.query.expertise;
    console.log(expertise)
     let trainer
      try {
        trainer = await Trainer.find({ expertise:{ $regex: expertise, $options: 'i' }});
      } catch (err) {
        const error = new HttpError(
          'Something went wrong, could not find a place.',
          500
        );
        return next(error);
      }
    
      if (!trainer) {
        const error = new HttpError(
          'Could not find a trainer for the provided id.',
          404
        );
        return next(error);
      }
    
      res.json({ trainer: trainer });
    };
    
 
const createTrainer = async (req, res, next) => {
  const { name, qualifications, expertise, rating,reviews,profilePic } = req.body;

  const createdTrainer = new Trainer({
    name, 
    qualifications,
     expertise,
      rating,
      reviews,
      profilePic 
  });
try {
  await createdTrainer.save();
} catch (err) {
  const error = new HttpError(
    'Signing up failed, please try again.',
    500
  );
  return next(error);
}
res.status(201).json({ trainer: createdTrainer.toObject({getters:true})});
 
};
const createTrainers = async (req, res, next) => {
    const trainers = req.body;
    let    createdTrainers
    try {
     createdTrainers = await Trainer.insertMany(trainers);
 
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again.',
      500
    );
    return next(error);
  }
  res.status(201).json({ trainer: createdTrainers});
   
  };
const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;
  
    // let places;
    let userWithPlaces;
    try {
      userWithPlaces = await User.findById(userId).populate('places');
    } catch (err) {
      const error = new HttpError(
        'Fetching places failed, please try again later',
        500
      );
      return next(error);
    }
  
    // if (!places || places.length === 0) {
    if (!userWithPlaces || userWithPlaces.places.length === 0) {
      return next(
        new HttpError('Could not find places for the provided user id.', 404)
      );
    }
  
    res.json({
      places: userWithPlaces.places.map(place =>
        place.toObject({ getters: true })
      )
    });
  };
const updateTrainerDetails = async (req, res, next) => {
  const errors = validationResult(req);
  const {trainerId} = req.query;
  if (!errors.isEmpty()|| !trainerId) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { qualifications, expertise } = req.body;

    console.log(trainerId,qualifications,expertise)
  let trainer;
  try {
    trainer = await Trainer.findById(trainerId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  trainer.qualifications = qualifications;
  trainer.expertise = expertise;

  try {
    await trainer.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  res.status(200).json({ trainer: trainer.toObject({ getters: true }) });
};

const updateTrainerReviews = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    const {review } = req.body;
    const trainerId = req.params.trainerId;
  
    let trainer;
    try {
      trainer = await Trainer.findById(trainerId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update place.',
        500
      );
      return next(error);
    }
  
    trainer.reviews.push(review);
    
    try {
      await trainer.save();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update place.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ trainer: trainer.toObject({ getters: true }) });
  };

  const updateTrainerRatings = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    const {rating} = req.body;
    const {trainerId} = req.query;
  
    let trainer;
    try {
      trainer = await Trainer.findById(trainerId);
    } catch (err) { 
      const error = new HttpError(
        'Something went wrong, could not update place.',
        500
      );
      return next(error);
    }
    console.log('trainer',trainer)
    trainer.rating.totalRating += rating;
    trainer.rating.numberOfRatings += 1;

    trainer.rating.averageRating = trainer.rating.totalRating / trainer.rating.numberOfRatings;
    
    try {
      await trainer.save();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update place.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ trainer: trainer.toObject({ getters: true }) });
  };

const deleteTrainer = async (req, res, next) => {
  const trainerId = req.params.pid;

  let trainer;
  try {
    trainer = await Trainer.findById(trainerId)
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete trainer.',
      500
    );
    return next(error);
  }

  if (!trainer) {
    const error = new HttpError('Could not find trainer for this id.', 404);
    return next(error);
  }

  try {
    await trainer.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete trainer.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted trainer.' });
};

module.exports = {
    createTrainers, 
    getTrainerByExpertise,
    getTrainerByName,
    getAllTrainers,
    getPlacesByUserId,
    createTrainer,
    updateTrainerDetails,
    deleteTrainer,
    updateTrainerRatings
};






