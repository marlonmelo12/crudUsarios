import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const IncluirModal = ({ isOpen, handleChange, abrirFecharModalIncluir, pedidoPost }) => (
  <Modal isOpen={isOpen}>
    <ModalHeader>Incluir Usuários</ModalHeader>
    <ModalBody>
      <div className="form-group">
        <label>Nome: </label>
        <br />
        <input type="text" className="form-control" name="nome" onChange={handleChange} />
        <br />
        <label>Email: </label>
        <br />
        <input type="text" className="form-control" name="email" onChange={handleChange} />
        <br />
        <label>Telefone: </label>
        <br />
        <input type="text" className="form-control" name="telefone" onChange={handleChange} />
        <br />
      </div>
    </ModalBody>
    <ModalFooter>
      <button className="btn btn-primary" onClick={pedidoPost}>Incluir</button>{" "}
      <button className="btn btn-danger" onClick={abrirFecharModalIncluir}>Cancelar</button>
    </ModalFooter>
  </Modal>
);

export default IncluirModal;
