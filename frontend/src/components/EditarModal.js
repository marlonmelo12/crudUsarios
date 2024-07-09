import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const EditarModal = ({ isOpen, usuarioSelecionado, handleChange, abrirFecharModalEditar, pedidoPut }) => (
  <Modal isOpen={isOpen}>
    <ModalHeader>Editar usuário</ModalHeader>
    <ModalBody>
      <div className="form-group">
        <br />
        <label>Nome: </label>
        <input type="text" className="form-control" name="nome" onChange={handleChange} value={usuarioSelecionado?.nome || ''} />
        <br />
        <label>Email: </label>
        <input type="text" className="form-control" name="email" onChange={handleChange} value={usuarioSelecionado?.email || ''} />
        <br />
        <label>Telefone: </label>
        <input type="text" className="form-control" name="telefone" onChange={handleChange} value={usuarioSelecionado?.telefone || ''} />
        <br />
      </div>
    </ModalBody>
    <ModalFooter>
      <button className="btn btn-primary" onClick={pedidoPut}>Editar</button>{" "}
      <button className="btn btn-danger" onClick={abrirFecharModalEditar}>Cancelar</button>
    </ModalFooter>
  </Modal>
);

export default EditarModal;
