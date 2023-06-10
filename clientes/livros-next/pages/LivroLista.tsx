import Head from 'next/head';
import { Menu } from '../componentes/Menu';
import { LinhaLivro } from '../componentes/LinhaLivro';
import { useState, useEffect, SetStateAction } from 'react';
import styles from '../styles/Home.module.css';
import Livro from '../classes/modelo/Livro';
import ControleLivros from '../classes/controle/ControleLivros';
import 'bootstrap/dist/css/bootstrap.css';

const LivroLista: React.FC = () => {
  const controleLivros = new ControleLivros();
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    controleLivros.obterLivros().then((data: SetStateAction<Livro[]>) => {
      setLivros(data);
      setCarregado(true);
    });
  }, [carregado]);

  const excluir = async (codigo: string) => {
    await controleLivros.excluir(codigo).then(() => {
      setCarregado(false);
    });
  };

  return (
    <div className='container'>
      <Head>
        <title>Livro Lista</title>
      </Head>
      <main className={styles.main}>
        <h1>Lista de Livros</h1>
        <table className='table table-striped'>
          <thead className='table-dark'>
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autor</th>
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
    </div>
  );
};

export default LivroLista;
