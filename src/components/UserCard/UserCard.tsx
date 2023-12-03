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
        <td>{String(props.terms)}</td>
        <td>
          <img width={50} src={props.pictureInBase64} alt="profile pictre" />
        </td>
        <td>{props.country}</td>
      </tr>
    </>
  );
};

export default UserCard;
