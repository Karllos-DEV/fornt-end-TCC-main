import { Link } from "react-router-dom";

function Table({ dados, handleDelete }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome</th>
          <th scope="col">Descrições</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((dado, index) => (
          <tr key={dado.id}>
            <td>{index + 1}</td>
            <td>{dado.nome}</td>
            <td>{dado.descricao}</td>
            <td>
              <Link to={`/${dado.id}`} className="btn btn-success">
                <i className="bi bi-pencil"></i> Editar
              </Link>
              <button
                className="btn btn-danger mx-2"
                onClick={() => handleDelete(dado.id)}
              >
                <i className="bi bi-trash3"></i> Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
