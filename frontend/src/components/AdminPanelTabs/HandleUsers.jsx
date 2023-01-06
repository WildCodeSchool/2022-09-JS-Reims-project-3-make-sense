import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../_services/AuthContext";

function HandleUsers() {
  const [data, setData] = useState({});
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };

  const handleRoleChange = (event, user) => {
    // Mettre à jour l'état local de la balise select
    setData({ ...data, [user.id]: event.target.value });
  };

  const handleUpdateClick = (user) => {
    // Envoyer une requête axios pour mettre à jour le rôle de l'utilisateur dans la base de données
    axios
      .put(
        `http://localhost:5000/users/${user.id}`,
        { role: data[user.id] },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then(() => {
        console.warn(data[user.id]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`, config)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const getUsersInformations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/users/decisions",
          config
        );
        console.warn(res.data);
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUsersInformations();
  }, []);
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold pb-8 pt-4">Gestion des utilisateurs</h1>
      <table className="table-auto w-full text-left border-2 border-black">
        <thead>
          <tr className="bg-gray-300">
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Prénom</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Nbr de décisions</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-200">
              <td className="border-2 border-black px-4 py-2">{user.id}</td>
              <td className="border-2 border-black px-4 py-2">
                {user.lastname}
              </td>
              <td className="border-2 border-black px-4 py-2">
                {user.firstname}
              </td>
              <td className="border-2 border-black px-4 py-2">{user.email}</td>
              <td className="border-2 border-black px-4 py-2">
                {user.nb_decisions}
              </td>
              <td className="border-2 border-black px-4 py-2">
                <select
                  value={data[user.id] || user.role}
                  onChange={(event) => handleRoleChange(event, user)}
                >
                  <option value="admin">Admin</option>
                  <option value="visitor">Visitor</option>
                  <option value="employee">Employee</option>
                </select>
              </td>
              <td className="border-2 border-black px-4 py-2">
                <button
                  type="button"
                  className="px-2 py-1 rounded-full bg-blue-500 text-white"
                  onClick={() => handleUpdateClick(user)}
                >
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={() => deleteUser(user.id)}
                  className="px-2 py-1 rounded-full bg-red-500 text-white"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HandleUsers;
