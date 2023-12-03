import React from 'react';
import UserCard from '../UserCard/UserCard';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux';

const UserList = () => {
  const users = useSelector(userSelector);

  return (
    <>
      <table>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Password</th>
          <th>Gender</th>
          <th>T&C</th>
          <th>Picture</th>
          <th>Country</th>
        </tr>
        {users.map((user) => (
          <UserCard key={user.name} {...user} />
        ))}
      </table>
    </>
  );
};

export default UserList;
