import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import './Cards.css'
import { useState } from 'react'

function Cards({ dados, handleDelete }) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [taskIdToDelete, setTaskIdToDelete] = useState(null)

  const openConfirmation = (id) => {
    setTaskIdToDelete(id)
    setShowConfirmation(true)
  }

  const closeConfirmation = () => {
    setTaskIdToDelete(null)
    setShowConfirmation(false)
  }

  const urlBase = 'http://localhost:3001/images/'

  const confirmDelete = (id) => {
    if (taskIdToDelete !== null) {
      handleDelete(taskIdToDelete)
      closeConfirmation()
    }
  }

  if (dados.length === 0) {
    return (
      <div>
        <p>Não existem dados a serem exibidos!</p>
      </div>
    )
  }
  return (
    <div className='row'>
      {dados.map((dados) => (
        <div className='col-sm-4' key={dados.id}>
          <div className='card mb-3'>
            <img
              src={urlBase + dados.foto}
              className='card-img-top'
              alt='foto'
            />
            <div className='card-body'>
              <h5 className='card-title'>{dados.nome}</h5>
              <p className='card-text '>
              <i class="bi bi-chat-dots"></i> {dados.descricao}
              </p>
            </div>
            <div className='card-footer text-muted'>
              <Link to={`/${dados.id}`} className='btn btn-primary'>
                <i class="bi bi-wrench"></i> Editar
              </Link>
              <button
                className='btn btn-secondary mx-2'
                onClick={() => openConfirmation(dados.id)}
              >
                <i class="bi bi-trash-fill"></i> Excluir
              </button>
            </div>
          </div>
        </div>
      ))}

      {showConfirmation && (
        <div className='modal'>
          <div className='modal-content'>
            <h4>Realmente deseja excluir?</h4>
            <button onClick={confirmDelete}>Sim</button>
            <button onClick={closeConfirmation}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cards
