import React, { useState } from "react";
import "./HookForm.css";
import { v4 as uuid4 } from "uuid";

// Se crea el componente HookForm a través de una función
const HookForm = () => {

  // Se crean 2 valores, userFormData que es el valor actual de las propiedades username, email y password que en este caso son strings vacíos. Y setUserFormData que va a ser el valor actualizado de userFormData. Esta línea de código es para almacenar los valores actuales del formulario de registro (username, email y password) mientras se está rellenando el formulario por el usuario. La idea es que cada vez que el usuario ingrese algún dato en un input, se actualice el valor de userFormData mediante setUserFormData.
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Se crean los valores users y setUsers, el valor de users es un array vacío que va a ir almacenando una lista de todos los usuarios registrados en el sistema. Cuando el usuario hace clic en el botón "registrar", los valores actuales en userFormData se agregarán a la lista de users mediante setUsers.
  const [users, setUsers] = useState([]);

  // handleInputChange es una función que maneja los cambios en los inputs del formulario de registro. Esta función es llamada cada vez que el usuario ingresa o modifica algún dato en los inputs (username, email y password). 
  // La función toma el evento (e) que desencadenó la llamada a la función y extrae dos valores del objeto target del evento: `name` y `value`. `name` representa el nombre del input que causó el evento (username, email o password) y `value` representa el valor actual del input. 
  // Luego, la función utiliza setUserFormData para actualizar el estado de `userFormData` con los nuevos valores de `name` y `value`. La nueva versión de `userFormData` se crea usando la sintaxis de propagación (`...`) para mantener los valores actuales de `userFormData` y solo actualizar el valor correspondiente al nombre del input que causó el evento.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };  

  // Esta función se utiliza para agregar un nuevo usuario a la lista de usuarios, donde cada usuario es un objeto con información como nombre de usuario, email, contraseña y un id único.
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newUser = { ...userFormData, id: uuid4() };
    setUsers([ ...users, newUser ]);
    console.log("form submitted", users);
  };

  // Este código renderiza un formulario para registrar usuarios. Hay tres campos de entrada: nombre de usuario, correo electrónico y contraseña. Cada uno de estos campos tiene un "onChange" asociado que maneja el evento de cambio de entrada, actualizando el estado "userFormData" con los valores actuales de los campos de entrada. Cuando se hace clic en el botón "Registrar", se ejecuta la función "handleFormSubmit" que maneja el envío del formulario, agrega un nuevo usuario al estado "users" y muestra los detalles de los usuarios existentes en una vista de resultados.
  return (
    <>
      <div className="container">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={userFormData.username}
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={userFormData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={userFormData.password}
            onChange={handleInputChange}
          />
          <button>Register</button>
        </form>
      </div>


      {users.length > 0 && (
        <div className="result">
          {users.map(({ id, username, email }) => (
            <div key={id}>
              <p>{id}</p>
              <p>{username}</p>
              <p>{email}</p>
            </div>
          ))}
        </div>
      )}
    </> //{ users.length } y lo demás, es, si el array "users" contiene algún elemento, se mostrará un componente "result". Dentro de este componente, se utiliza la función "map" para iterar sobre cada elemento en el array "users" y mostrar ciertos datos (en este caso, el id, nombre de usuario y correo electrónico) de cada elemento en forma de elementos HTML. Cada elemento renderizado se le da una "key" única basada en el id para ayudar a React a identificarlo de manera eficiente en caso de cambios futuros en la lista
  );
};

export default HookForm;

