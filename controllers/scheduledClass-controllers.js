// const { validationResult } = require('express-validator');
// const mongoose = require('mongoose');
// const HttpError = require('../models/http-error'); 
// const ScheduledClass = require('../models/scheduledClass');
// const User = require('../models/user');

// const getAllScheduledClass = async (req, res, next) => {
 

//  let scheduledClass
//   try {
//     scheduledClass = await ScheduledClass.find();
//   } catch (err) {
//     const error = new HttpError(
//       'Something went wrong, could not find a place.',
//       500
//     );
//     return next(error);
//   }

//   if (!scheduledClass) {
//     const error = new HttpError(
//       'Could not find a scheduledClass for the provided id.',
//       404
//     );
//     return next(error);
//   }

//   res.json({ scheduledClass: scheduledClass });
// };
// const getScheduledClassByName = async (req, res, next) => {
//    const name= req.params.pid;
//     console.log(name)
//     let scheduledClass
//      try {
//        scheduledClass = await ScheduledClass.find({ name: { $regex: name, $options: 'i' } });
//      } catch (err) {
//        const error = new HttpError(
//          'Something went wrong, could not find a place.',
//          500
//        );
//        return next(error);
//      }
   
//      if (!scheduledClass) {
//        const error = new HttpError(
//          'Could not find a scheduledClass for the provided id.',
//          404
//        );
//        return next(error);
//      }
   
//      res.json({ scheduledClass: scheduledClass });
//    };
   
//    const getScheduledClassByExpertise = async (req, res, next) => {
//     const expertise= req.query.expertise;
//     console.log(expertise)
//      let scheduledClass
//       try {
//         scheduledClass = await ScheduledClass.find({ expertise:{ $regex: expertise, $options: 'i' }});
//       } catch (err) {
//         const error = new HttpError(
//           'Something went wrong, could not find a place.',
//           500
//         );
//         return next(error);
//       }
    
//       if (!scheduledClass) {
//         const error = new HttpError(
//           'Could not find a scheduledClass for the provided id.',
//           404
//         );
//         return next(error);
//       }
    
//       res.json({ scheduledClass: scheduledClass });
//     };
    
 
// const createScheduledClass = async (req, res, next) => {
//   const { name, qualifications, expertise, rating,reviews,profilePic } = req.body;

//   const createdScheduledClass = new ScheduledClass({
//     name, 
//     qualifications,
//      expertise,
//       rating,
//       reviews,
//       profilePic 
//   });
// try {
//   await createdScheduledClass.save();
// } catch (err) {
//   const error = new HttpError(
//     'Signing up failed, please try again.',
//     500
//   );
//   return next(error);
// }
// res.status(201).json({ scheduledClass: createdScheduledClass.toObject({getters:true})});
 
// };
// const createScheduledClass = async (req, res, next) => {
//     const scheduledClass = req.body;
//     let    createdScheduledClass
//     try {
//      createdScheduledClass = await ScheduledClass.insertMany(scheduledClass);
 
//   } catch (err) {
//     const error = new HttpError(
//       'Signing up failed, please try again.',
//       500
//     );
//     return next(error);
//   }
//   res.status(201).json({ scheduledClass: createdScheduledClass});
   
//   };
// const getPlacesByUserId = async (req, res, next) => {
//     const userId = req.params.uid;
  
//     // let places;
//     let userWithPlaces;
//     try {
//       userWithPlaces = await User.findById(userId).populate('places');
//     } catch (err) {
//       const error = new HttpError(
//         'Fetching places failed, please try again later',
//         500
//       );
//       return next(error);
//     }
  
//     // if (!places || places.length === 0) {
//     if (!userWithPlaces || userWithPlaces.places.length === 0) {
//       return next(
//         new HttpError('Could not find places for the provided user id.', 404)
//       );
//     }
  
//     res.json({
//       places: userWithPlaces.places.map(place =>
//         place.toObject({ getters: true })
//       )
//     });
//   };
// const updateScheduledClass = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(
//       new HttpError('Invalid inputs passed, please check your data.', 422)
//     );
//   }

//   const { title, description } = req.body;
//   const placeId = req.params.pid;

//   let place;
//   try {
//     place = await Place.findById(placeId);
//   } catch (err) {
//     const error = new HttpError(
//       'Something went wrong, could not update place.',
//       500
//     );
//     return next(error);
//   }

//   place.title = title;
//   place.description = description;

//   try {
//     await place.save();
//   } catch (err) {
//     const error = new HttpError(
//       'Something went wrong, could not update place.',
//       500
//     );
//     return next(error);
//   }

//   res.status(200).json({ place: place.toObject({ getters: true }) });
// };

// const deleteScheduledClass = async (req, res, next) => {
//   const scheduledClassId = req.params.pid;

//   let scheduledClass;
//   try {
//     scheduledClass = await ScheduledClass.findById(scheduledClassId)
//   } catch (err) {
//     const error = new HttpError(
//       'Something went wrong, could not delete scheduledClass.',
//       500
//     );
//     return next(error);
//   }

//   if (!scheduledClass) {
//     const error = new HttpError('Could not find scheduledClass for this id.', 404);
//     return next(error);
//   }

//   try {
//     await scheduledClass.remove();
//   } catch (err) {
//     const error = new HttpError(
//       'Something went wrong, could not delete scheduledClass.',
//       500
//     );
//     return next(error);
//   }

//   res.status(200).json({ message: 'Deleted scheduledClass.' });
// };

// exports.createScheduledClass=createScheduledClass
// exports.getScheduledClassByExpertise=getScheduledClassByExpertise
// exports.getScheduledClassByName=getScheduledClassByName;
// exports.getAllScheduledClass = getAllScheduledClass;
// exports.getPlacesByUserId = getPlacesByUserId;
// exports.createScheduledClass = createScheduledClass;
// exports.updateScheduledClass = updateScheduledClass;
// exports.deleteScheduledClass = deleteScheduledClass;