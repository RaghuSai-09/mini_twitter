const Post = require('../models/Post');


exports.createPost = async (req, res) => {
    console.log(req.user._id);
    console.log(req.user);
    try {
      const { content } = req.body;
      const author = req.user._id; 
  
      const post = new Post({ content, author });
      await post.save();
  
      res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.updatePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const { content } = req.body;
  
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      if (post.author.toString() !== req.user._id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      post.content = content;
      await post.save();
  
      res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.deletePost = async (req, res) => {
    try {
      const { postId } = req.params;
  
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      
      if (post.author.toString() !== req.user._id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      await post.remove();
  
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  
