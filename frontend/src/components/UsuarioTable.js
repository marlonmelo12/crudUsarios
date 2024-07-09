import React from 'react';

const UsuarioTable = ({ data, selecionarUsuario }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Operação</th>
        </tr>
      </thead>
      <tbody>
        {data.map(usuario => (
          <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.nome}</td>
            <td>{usuario.email}</td>
            <td>{usuario.telefone}</td>
            <td>
              <button className="btn btn-primary" onClick={() => selecionarUsuario(usuario, "Editar")}>Editar</button> {"  "}
              <button className="btn btn-danger" onClick={() => selecionarUsuario(usuario, "Excluir")}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsuarioTable;
