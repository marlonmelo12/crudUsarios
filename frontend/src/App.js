import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import IncluirModal from './components/IncluirModal';
import EditarModal from './components/EditarModal';
import ExcluirModal from './components/ExcluirModal';
import logoCadastro from './assets/cadastro.png';

function App() {
  const baseUrl = "http://localhost:5011/api/usuarios";
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);
  const [modalIncluir, setModalIncluir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({ id: '', nome: '', email: '', telefone: '' });

  const selecionarUsuario = (usuario, opcao) => {
    setUsuarioSelecionado(usuario);
    opcao === "Editar" ? abrirFecharModalEditar() : abrirFecharModalExcluir();
  }

  const abrirFecharModalIncluir = () => setModalIncluir(!modalIncluir);
  const abrirFecharModalEditar = () => setModalEditar(!modalEditar);
  const abrirFecharModalExcluir = () => setModalExcluir(!modalExcluir);

  const handleChange = e => {
    const { name, value } = e.target;
    setUsuarioSelecionado({ ...usuarioSelecionado, [name]: value });
  }

  const pedidoGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const pedidoPost = async () => {
    delete usuarioSelecionado.id;
    await axios.post(baseUrl, usuarioSelecionado)
      .then(response => {
        setData(data.concat(response.data));
        setUpdateData(true);
        abrirFecharModalIncluir();
      }).catch(error => {
        console.log(error);
      })
  }

  const pedidoPut = async () => {
    await axios.put(`${baseUrl}/${usuarioSelecionado.id}`, usuarioSelecionado)
      .then(response => {
        const resposta = response.data;
        const dadosAuxiliar = data;
        dadosAuxiliar.map(usuario => {
          if (usuario.id === usuarioSelecionado.id) {
            usuario.nome = resposta.nome;
            usuario.email = resposta.email;
            usuario.telefone = resposta.telefone;
          }
        });
        setUpdateData(true);
        abrirFecharModalEditar();
      }).catch(error => {
        console.log(error);
      })
  }

  const pedidoDelete = async () => {
    await axios.delete(`${baseUrl}/${usuarioSelecionado.id}`)
      .then(response => {
        setData(data.filter(usuario => usuario.id !== response.data));
        setUpdateData(true);
        abrirFecharModalExcluir();
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    if (updateData) {
      pedidoGet();
      setUpdateData(false);
    }
  }, [updateData])

  return (
    <div className="usuario-container">
      <br />
      <h3>Cadastro de usuarios</h3>
      <header>
        <img src={logoCadastro} alt='Cadastro' />
        <button className="btn btn-success" onClick={abrirFecharModalIncluir}>Incluir Novo usuario</button>
      </header>
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
                <button className="btn btn-primary" onClick={() => selecionarUsuario(usuario, "Editar")}>Editar</button> {" "}
                <button className="btn btn-danger" onClick={() => selecionarUsuario(usuario, "Excluir")}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <IncluirModal
        isOpen={modalIncluir}
        handleChange={handleChange}
        abrirFecharModalIncluir={abrirFecharModalIncluir}
        pedidoPost={pedidoPost}
      />

      <EditarModal
        isOpen={modalEditar}
        usuarioSelecionado={usuarioSelecionado}
        handleChange={handleChange}
        abrirFecharModalEditar={abrirFecharModalEditar}
        pedidoPut={pedidoPut}
      />

      <ExcluirModal
        isOpen={modalExcluir}
        usuarioSelecionado={usuarioSelecionado}
        abrirFecharModalExcluir={abrirFecharModalExcluir}
        pedidoDelete={pedidoDelete}
      />
    </div>
  );
}

export default App;
