import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

const ExcluirModal = ({ isOpen, usuarioSelecionado, abrirFecharModalExcluir, pedidoDelete }) => (
  <Modal isOpen={isOpen}>
    <ModalBody>
      Confirma a exclusão deste(a) usuário(a): {usuarioSelecionado && usuarioSelecionado.nome}?
    </ModalBody>
    <ModalFooter>
      <button className="btn btn-danger" onClick={pedidoDelete}>Sim</button>
      <button className="btn btn-secondary" onClick={abrirFecharModalExcluir}>Não</button>
    </ModalFooter>
  </Modal>
);

export default ExcluirModal;
