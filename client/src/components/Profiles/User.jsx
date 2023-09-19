import { useParams } from 'react-router-dom'
import  Sidebar  from '../Sidebar';
import { useEffect, useState } from 'react';
import * as api from '../../../api';
import Post from '../Post';

const User = () => {

  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.getuser(id);
      const user = response.data.user;
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
            <div className="flex flex-col items-center">
              <div className="h-40 w-40 bg-gray-300 rounded-full overflow-hidden">
                <img src={user.profilePictureUrl} alt={user.username} className="object-cover h-full w-full" />
              </div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
          )
          }
        </div>
        <div >
          <p className="text-2xl text-blue-900 font-bold mb-4">Tweets</p>
          <div className="space-y-4">
            {loading ? (
              <p>Loading tweets...</p>
            ) : (
              user.tweets.map((tweet) => (
                <Post key={tweet._id} tweet={tweet} />
              ))
            )}
        </div>  
      </div>
      </div>
    </div>
    
  )
}

export default User