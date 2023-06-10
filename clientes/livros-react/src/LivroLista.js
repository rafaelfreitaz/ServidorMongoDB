import React, { useState, useEffect } from 'react';
import ControleLivros from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

function LinhaLivro(props) {
    const controleEditora = new ControleEditora();
    const nomeEditora = controleEditora.getNomeEditora(props.livro.codEditora);

    return (
        <tr>
            <td>{props.livro.titulo}
                <div>
                    <button className="btn btn-danger" onClick={() => props.excluir(props.livro.codigo)}>Excluir</button>
                </div>
            </td>
            <td>{props.livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td>
                <ul>
                    {props.livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
}

export default function LivroLista() {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);
    const controleLivro = new ControleLivros();

    useEffect(() => {
        const obterLivros = async () => {
            controleLivro.obterLivros().then((livrosObtidos) => {
                setLivros(livrosObtidos);
                setCarregado(true);
            });
        };

        obterLivros();
    },[carregado]);

    const excluir = (codigoLivro) => {
        controleLivro.excluir(codigoLivro).then(() => {
            setCarregado(false);
        });
    };

    return (
        <main>
            <h1>Catálogo de Livros</h1>
            <table className='table table-striped'>
                <thead className='table-dark'>
                    <tr>
                        <th>Título</th>
                        <th>Resumo</th>
                        <th>Editora</th>
                        <th>Autores</th>
                    </tr>
                </thead>
                <tbody>
                    {carregado &&
                        livros.map((livro, index) => (
                            <LinhaLivro key={index} livro={livro} excluir={excluir} />
                        ))}
                </tbody>
            </table>
        </main>
    );
}
