import React, { useEffect, useState } from "react";

import "./styles.css";

import api from './services/api';

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    let mounted = true;

    api.get('/repositories')
    .then(response => {
      if(mounted){
        setRepositories(response.data)
      }
    })

    return () => {
      mounted = false;
    }
  }, [])

  async function handleAddRepository() {
    try {
      
      const response = await api.post('/repositories', {
        title: "Desafio ReactJS " + Date.now(),
        url: "",
        techs: [],
      });

      setRepositories(repositories => [...repositories, response.data])

    } catch (error) {}
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete('/repositories/' + id);

      if(response.status === 204){
        setRepositories(repositories => repositories.filter(repository => repository.id !== id))
      }

    } catch (error) {}
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
