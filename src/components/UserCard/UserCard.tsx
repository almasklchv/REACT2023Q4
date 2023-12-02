import React from 'react';
import { User } from '../../entities';

const UserCard = (props: User) => {
  return (
    <>
      <tr>
        <td>{props.name}</td>
        <td>{props.age}</td>
        <td>{props.email}</td>
        <td>{props.password}</td>
        <td>{props.gender}</td>
        <td>{props.terms}</td>
        <td>{props.pictureInBase64}</td>
        <td>{props.country}</td>
      </tr>
    </>
  );
};

export default UserCard;
