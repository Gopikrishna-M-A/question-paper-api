import passport from 'passport';
import express from 'express';

export const isLoggedIn = (req, res, next) => {
   console.log(req.session.passport.user);
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
  };
  
  // export const isAdmin = (req, res, next) => {
  //   if (req.isAuthenticated() && req.user.isAdmin) {
  //     return next();
  //   }
  //   return res.status(403).json({ message: 'Forbidden' });
  // };
  