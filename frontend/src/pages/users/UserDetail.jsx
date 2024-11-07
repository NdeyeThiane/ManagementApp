// src/pages/Users/UserDetail.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchUsers } from '../../app/features/users/usersSlice';

const UserDetail = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.selectedUser);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">{user.username}</h1>
      <p className="text-gray-500 mt-2">Email: {user.email}</p>
      <p className="text-gray-500 mt-2">Role: {user.role}</p>
      <Link to={`/users/${user.id}/edit`} className="text-blue-500 mt-4 inline-block hover:underline">
        Edit User
      </Link>
    </div>
  );
};

export default UserDetail;
