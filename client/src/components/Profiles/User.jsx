import { useParams } from 'react-router-dom'
import  Sidebar  from '../Sidebar';
import { useEffect, useState } from 'react';
import * as api from '../../../api';


const User = () => {

  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.getuser(id);
      const user = response.data.user;
      console.log(response.data.tweets);
      setTweets(response.data.tweets);
      setUser(user);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen mx-auto md:w-10/12">
      <div className='w-1/5 border-slate-200 border-r-2'> 
        <Sidebar/>
      </div>
      <div className='w-4/6 '>
        <div className='border-b-2 border-slate-300'>
          {loading ? (
            <p className='text-bold text-2xl text-blue-900'>Loading user...</p>
          ) : (
            <>
            <div className="flex flex-col items-center">
              <div className="h-40 w-40 bg-gray-300 rounded-full overflow-hidden">
                <img src='https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' alt={user.username} className="object-cover h-full w-full" />
              </div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col items-center">
                <p className="font-bold text-blue-900 mb-10 text-center">
                  Followers
                </p>
                <p className="font-bold text-blue-900 mb-10 text-center">
                  Following
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold text-blue-900 mb-10 text-center">
                  100
                </p>
                <p className="font-bold text-blue-900 mb-10 text-center">
                  100
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col items-center">
                <p className="font-bold text-blue-900 mb-10 text-center">
                  Tweets
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold text-blue-900 mb-10 text-center">
                  100
                </p>
              </div>
            </div>

            </>
          )
          }
        </div>
        <div >
          <p className="text-2xl text-blue-900 font-bold mb-4 text-center">Tweets</p>
          <div className="space-y-4">
            {loading ? (
              <p>Loading tweets...</p>
            ) : (
              tweets.map((tweet) => (
                <div key={tweet._id} className="bg-white p-4 my-4 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-300 rounded-full overflow-hidden">
                      <img src={"author.profilePictureUrl"} alt={"author"} className="object-cover h-full w-full" />
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
      </div>
    </div>
    
  )
}

export default User