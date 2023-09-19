const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');
const {requireAuth} = require('../middlewares/controller');
const { createPost, updatePost, deletePost } = require('./PostRoutes');


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(401).json({
          message: 'User not found',
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({
          message: 'Incorrect password',
        });
      }
  
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        token,
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
  
        message: 'Login failed. Please try again later.',
      });
    }
  });
  
  router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({
          message: 'User already exists',
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
  
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        token,
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'fail',
        message: 'Signup failed. Please try again later.',
      });
    }
  });

router.get('/all',requireAuth, async(req, res) => {
    
    try {
        const allusers = await User.find({ _id: { $ne: req.user._id } });
        res.status(200).json({
            status: 'success',
            allusers
        });

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
});

router.put('/follow/', requireAuth, async(req, res) => {
    const { id} = req.body;
    console.log(id);
    try {
        const loggedInUser = await User.findById(req.user._id);
        if (loggedInUser.following.includes(id)) {
            return res.status(400).json({
              status: 'fail',
              message: 'You are already following this user',
            });
          }
      
          loggedInUser.following.push(id);
          await loggedInUser.save();
      
          res.status(200).json({
            status: 'success',
            message: 'User followed successfully',
          });
        } catch (error) {
          res.status(500).json({
            status: 'fail',
            message: error.message,
          });
        }
});

router.get('/followlist', requireAuth, async(req, res) => {
    try {
        
        const user = await User.findById(req.user._id).populate('following', 'name');
    
        if (!user) {
          return res.status(404).json({
            status: 'fail',
            message: 'User not found',
          });
        }
        const followingList = user.following.map((followingUser) => ({
          _id: followingUser._id,
          name: followingUser.name,
        }));
    
        res.status(200).json({
          status: 'success',
          followingList,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          status: 'fail',
          message: error.message,
        });
      }
});

router.get('/tweets', requireAuth, async(req, res) => {
    try {
        const tweets = await Post.find({ author: req.user._id });
        const followerTweets = await Post.find({ author: { $in: req.user.following } });  
        // const allTweets = [...tweets, ...followerTweets];
          res.status(200).json({
            status: 'success',
            tweets: followerTweets,
          });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
});


router.get('/:id', requireAuth, async(req, res) => {
    try {
      const user = await User.findById(req.params.id);
      
      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found',
        });
      }
      
      res.status(200).json({
        status: 'success',
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  });


router.post('/create', requireAuth, createPost);

router.put('/:postId', requireAuth, updatePost);

router.delete('/:postId', requireAuth, deletePost);

module.exports = router;


