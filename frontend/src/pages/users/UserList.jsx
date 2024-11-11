import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, updateUser, sendInvitation } from '../../app/features/users/usersSlice';
import UserForm from './UserForm';

function UsersList() {
  const dispatch = useDispatch();
  const { users, loading, error, invitationStatus } = useSelector((state) => state.users);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [editUser, setEditUser] = useState(null); 

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSendInvitation = (data) => {
    dispatch(sendInvitation(data));
    setShowInviteForm(false);
  };

  const handleEditUser = (data) => {
    dispatch(updateUser({ userId: editUser.userid, ...data }));
    setEditUser(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      {invitationStatus && <p className="text-green-600">{invitationStatus}</p>}

      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => setShowInviteForm(true)}
      >
        Send Invitation
      </button>

      {showInviteForm && (
        <UserForm
          onSubmit={handleSendInvitation}
          isEditMode={false}
        />
      )}

      {editUser && (
        <div className="mb-4">
          <UserForm
            onSubmit={handleEditUser}
            isEditMode={true}
            initialData={editUser}
          />
          <button onClick={() => setEditUser(null)} className="mt-2 text-red-500">
            Cancel Edit
          </button>
        </div>
      )}

      <table className='border-2 w-[100%]'>
          <tr className='boder-2 border-blue'>
            <th className='w-[20%]'>Username</th>
            <th className='w-[20%]'>Email</th>
            <th className='w-[20%]'>Button</th>
          </tr>
        {users.map((user) => (
          <tr key={user.userid} className="rounded shadow-md flex justify-between items-center">
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
              <button
                className="p-2 bg-yellow-400 text-white rounded"
                onClick={() => setEditUser(user)}
              >
                Edit
              </button>
              <button className="p-2 bg-red-500 text-white rounded">Delete</button>
              </td>
              </tr>
        ))}
      </table >
    </div>
  );
}

export default UsersList;
