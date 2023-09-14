import  { useState, useEffect } from 'react';
import PostCreationForm from './PostCreation';
// import Post from './Post'; 
import * as api from '../../api';

function Feed() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    setLoading(true);
    try {
      const response = await api.getTweets();
      setTweets(response.data);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = async (content) => {
    try {
      const response = await api.createTweet({content}); 
      const newTweet = response.data;
      setTweets([newTweet, ...tweets]);
    } catch (error) {
      console.error('Error creating tweet:', error);
    }
  };

  return (
    <div className="flex-1 w-full p-4">
      <p className="text-2xl text-blue-900 font-bold mb-4">Home</p>
      <div className="mb-4">
        <PostCreationForm onPostSubmit={handleNewPost} />
      </div>
      <div className="space-y-4">
        {loading ? (
          <p>Loading tweets...</p>
        ) : (
          tweets.map((tweet) => (
            <Post key={tweet.id} tweet={tweet} />
          ))
        )}
      </div>
    </div>
  );
}

export default Feed;
