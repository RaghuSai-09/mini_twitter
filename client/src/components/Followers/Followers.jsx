import { useState, useEffect } from 'react';
import * as api from '../../../api';

import { useNavigate } from 'react-router';

const Followers = () => {
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState([]);
  const [followusers, setFollowUsers] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.getusers();
      const allusers = response.data.allusers;
      const followingResponse = await api.user('/users/followlist'); 
      const followingList = followingResponse.data.followingList.map(
        (user) => user._id
      );

      const updatedUsers = allusers.map((user) => ({
        ...user,
        isFollowing: followingList.includes(user._id),
      }));
      setFollowUsers(updatedUsers);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleFollow = async ({ id, isFollowing }) => {
    try {
      if (isFollowing) {
        const response = await api.unfollow({ id });
        if (response.status === 200) {
          setFollowUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === id ? { ...user, isFollowing: false } : user
            )
          );
        }
      } else {
        const response = await api.follow({ id });
        if (response.status === 200) {
          setFollowUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === id ? { ...user, isFollowing: true } : user
            )
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileClick = (id) => {
    history(`/profile/${id}`);
  };

  return (
    <div className="p-5 md:mx-0 mx-auto">
      <p className="font-bold text-blue-900 mb-10 text-center">
        People you may Know
      </p>
      <div className="flex flex-col">
        {loading ? (
          <p>Loading users...</p>
        ) : (
          followusers.map((user) => (
            <div
              key={user._id}
              className="flex flex-row justify-between cursor-pointer"
              onClick={() => handleProfileClick(user._id)}
            >
              <div className="flex flex-row mt-5">
                <img
                  src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                  alt=""
                  className="w-12 h-10 rounded-full mr-2"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{user.name}</p>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex flex-row items-center">
                {user.isFollowing ? (
                  <button className="bg-gray-300 text-black rounded-md px-2 py-1">
                    Following
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white rounded-md px-2 py-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFollow({ id: user._id, isFollowing: false });
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Followers;
