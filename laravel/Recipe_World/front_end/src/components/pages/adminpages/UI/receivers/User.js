import React from "react";

export default function User({
  id,
  email,
  full_name,
  birthday,
  profile_image,
  phone,
  followers,
  isActive,
  changeStatus,
}) {
  const handleStatusChange = () => {
    changeStatus(!isActive);
  };

  return (
    <tr className="align-middle">
      <td>{id}</td>
      <td>{email}</td>
      <td>{full_name}</td>
      <td>{birthday}</td>
      <td>{phone}</td>
      <td>{followers}</td>
      <td>
        <img
          src={`https://firebasestorage.googleapis.com/v0/b/recipeworld-8ecc6.appspot.com/o/images%2F${profile_image}?alt=media&token=6faaf2a3-91a1-4350-9b33-9ccbcc755a28`}
          alt=""
          className="img-fluid object-fit"
          width={90}
          height={90}
        />
      </td>
      <td>
        {isActive ? (
          <button onClick={handleStatusChange} className="btn btn-danger">
            Ban
          </button>
        ) : (
          <button onClick={handleStatusChange} className="btn btn-success">
            Unban
          </button>
        )}
      </td>
    </tr>
  );
}
