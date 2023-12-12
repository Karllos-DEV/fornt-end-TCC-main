import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import dadoService from '../services/dadoService'
import Input from '../layout/Input'

function Editar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [foto, setFoto] = useState(null)
  const [fotoPreview, setFotoPreview] = useState(null)
  const [fotoAntiga, setFotoAntiga] = useState(null) // Adicionando estado para a prévia da imagem

  useEffect(() => {
    dadoService.getOne(id).then((response) => {
      setNome(response.data.nome)
      setDescricao(response.data.descricao)

      setFoto(response.data.foto)
      setFotoAntiga('http://localhost:3001/images/' + foto)
    })
  }, [id, foto])

  const handleNomeChange = (event) => {
    // console.log(event.target.value);
    setNome(event.target.value)
  }

  const handleDescricaochange = (event) => {
    // console.log(event.target.value);
    setDescricao(event.target.value)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFoto(file)

    // Exibindo uma prévia da imagem
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFotoPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      setFotoPreview(null)
    }
  }

  const editObject = async (event) => {
    event.preventDefault()




    const dadoObject = {
      nome,
      descricao,
      foto,
    }

    console.log(dadoObject)

    await dadoService.update(id, dadoObject)

    navigate('/')
  }

  const cancel = () => {
    navigate('/')
  }

  return (
    <div className='container'>
      <h2>Edição de Dados</h2>
      <hr />
      <form onSubmit={editObject} className='bg-success-subtle p-2'>
        <Input
          textLabel='nome'
          text='Nome'
          inputType='text'
          textPlaceholder='Digite o seu nome...'
          handleChange={handleNomeChange}
          isPhone={false}
          defaultValue={nome}
        />
        <Input
          textLabel='descricao'
          text='Descrição'
          inputType='text'
          textPlaceholder='Digite sua Descrição'
          handleChange={handleDescricaochange}
          isPhone={false}
          defaultValue={descricao}
        />
        
        <div className='form-group'>
          <label htmlFor='foto'>Foto: </label>
          <input
            type='file'
            id='foto'
            className='form-control-file m-2'
            onChange={handleFileChange}
          />
          {fotoPreview ? (
            <img
              src={fotoPreview}
              alt='Preview'
              style={{ maxWidth: '200px' }}
            />
          ) : fotoAntiga ? (
            <img src={fotoAntiga} alt='Preview' style={{ maxWidth: '200px' }} />
          ) : null}
        </div>
        <button className='btn btn-success m-2'>Editar</button>
        <button className='btn btn-danger m-2' onClick={() => cancel()}>
          Cancelar
        </button>
      </form>
    </div>
  )
}

export default Editar
