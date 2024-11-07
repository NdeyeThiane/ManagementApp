import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, isEditMode, initialData = {} }) => {
  const [username, setUsername] = useState(initialData.username || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [role, setRole] = useState(initialData.role || 'student');

  useEffect(() => {
    if (isEditMode && initialData) {
      setUsername(initialData.username);
      setEmail(initialData.email);
      setRole(initialData.role); 
    }
  }, [isEditMode, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, email, role });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isEditMode && (
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
      )}
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
          disabled={isEditMode}
        />
      </div>
      <div>
        <label className="block text-gray-700">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md"
      >
        {isEditMode ? 'Update User' : 'Send Invitation'}
      </button>
    </form>
  );
};

export default UserForm;
