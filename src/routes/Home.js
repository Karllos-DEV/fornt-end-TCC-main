import { useEffect, useState } from "react";

import dadoService from "../services/dadoService";

// import Table from '../layout/Table'
import Input from "../layout/Input";
import Cards from "../layout/Cards";


function Home() {
  const [dados, setDados] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null); // Adicionando estado para a prévia da imagem
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(); // Carrega os dados iniciais
  }, []);


  

  const fetchData = () => {
    dadoService
      .getAll()
      .then((response) => {
        setDados(response.data);
        setShowForm(false);
      })
      .catch((error) => {
        if (error.response) {
          // O servidor respondeu com um status de erro
          console.error("Erro na requisição:", error.response);
        } else if (error.request) {
          // A requisição foi feita, mas não houve resposta do servidor
          console.error("Não foi possível se conectar ao servidor.");
          setError(
            "Não foi possível se conectar ao servidor. Verifique sua conexão de rede."
          );
        } else {
          // Algo aconteceu na configuração da requisição que causou o erro
          console.error("Erro na configuração da requisição:", error.message);
        }
      });
  };

  const addDado = async (event) => {
    event.preventDefault();
    const dadoObject = {
      nome,
      descricao,
      foto,
    };

    await dadoService.create(dadoObject);

    setFoto(null);
    setFotoPreview(null);// Limpar a imagem após o envio

    // Após a criação, atualize a lista de dados chamando fetchData novamente
    fetchData();
  };

  const handleNomeChange = (event) => {
    // console.log(event.target.value);
    setNome(event.target.value);
  };

  const handleDescricaochange = (event) => {
    // console.log(event.target.value);
    setDescricao(event.target.value);
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);

    // Exibindo uma prévia da imagem
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFotoPreview(null);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleDelete = async (id) => {
    await dadoService.remove(id);
    // Após a exclusão, atualize a lista de dados chamando fetchData novamente
    fetchData();
  };

  return (
    
    <div className="container">
      <h2 className="mt-2"></h2>
      {error ? (
        <p className="alert alert-warning" role="alert">
          {error}
        </p>
      ) : (
        <>
          <button onClick={toggleForm} className=" add">
            {showForm ? "Voltar para a Tabela" :  <i class="bi bi-plus-lg" ></i>}
          </button>

          {showForm ? (
            <>
              <hr />
              <form onSubmit={addDado} className="bg-success-subtle p-2">
                <Input
                  textLabel="nome"
                  text="Nome"
                  inputType="text"
                  textPlaceholder="Digite o seu nome..."
                  handleChange={handleNomeChange}
                  isPhone={false}
                />
                <Input
                  textLabel="descricao"
                  text="Descrição"
                  inputType="text"
                  textPlaceholder="Digite sua Descrição"
                  handleChange={handleDescricaochange}
                  isPhone={false}
                />
                

                <div className="form-group">
                  <label htmlFor="foto">Foto: </label>
                  <input
                    type="file"
                    id="foto"
                    className="form-control-file m-2"
                    onChange={handleFileChange}
                  />
                  {fotoPreview && (
                    <img
                      src={fotoPreview}
                      alt="Preview"
                      style={{ maxWidth: "200px" }}
                    />
                  )}
                </div>
                <button className="btn btn-success mt-4 container">Cadastrar</button>
              </form>
              <br />
            </>
          ) : (
            <div className="my-3">
              <hr />
              <Cards dados={dados} handleDelete={handleDelete} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
