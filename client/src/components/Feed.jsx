import  { useState, useEffect } from 'react';
import PostCreationForm from './PostCreation';
import Post from './Post'; 
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
      setTweets(response.data.tweets);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = async (content) => {
    try {
      const response = await api.createTweet({content});
      if(response.status === 201){
        fetchTweets();
      }
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
            <div key={tweet._id} className="bg-white p-4 my-4 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-300 rounded-full overflow-hidden">
                  <img src={"author.profilePictureUrl"} alt={"author.username"} className="object-cover h-full w-full" />
                </div>
              <div className="ml-2">
                <h2 className="text-lg font-semibold">{tweet.author_name}</h2>
                <p className="text-gray-600 text-sm">{tweet.content}</p>
                <p className="text-gray-600 text-sm">{new Date(tweet.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feed;
