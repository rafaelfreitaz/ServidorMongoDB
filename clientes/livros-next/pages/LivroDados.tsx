import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { Menu } from '../componentes/Menu';
import ControleLivros from '../classes/controle/ControleLivros';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../src/app/page.module.css';
import Livro from '../classes/modelo/Livro';
import 'bootstrap/dist/css/bootstrap.css';
import ControleEditora from '../classes/controle/ControleEditora';

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LivroDados: NextPage = () => {
  const [opcoes, setOpcoes] = useState(
    controleEditora.getEditoras().map((editora) => ({
      value: editora.codEditora.toString(),
      text: editora.nome,
    }))
  );
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(0);
  const navigate = useRouter().push;

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const livro: Livro = {
      codigo: '',
      titulo,
      resumo,
      autores: autores.split('\n'),
      codEditora,
    };
    controleLivro.incluir(livro).then(() => {
      navigate('/LivroLista');
    });
  };

  return (
    <div className="container">
      <Head>
        <title>Livro Dados</title>
      </Head>
      <main className={styles.main}>
        <h1>Cadastro de Livro</h1>
        <form className="w-100" onSubmit={incluir}>
          <div className="mb-3">
            <label className="form-label">Título:</label>
            <input
              className="form-control"
              type="text"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Resumo:</label>
            <textarea
              className="form-control"
              value={resumo}
              onChange={(event) => setResumo(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Editora:</label>
            <select className="form-select" value={codEditora} onChange={tratarCombo}>
              {opcoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Autores:</label>
            <textarea
              className="form-control"
              value={autores}
              onChange={(event) => setAutores(event.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary mt-3" type="submit">
            Incluir
          </button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
