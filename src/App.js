import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  
  useEffect(()=>{
    api.get('/repositories').then((response) => {
      setRepositories(response.data)
    })
  },[])
  async function handleAddRepository() {
    const repo = {
      title: 'New Repository ',
      url: 'http://github.com/gersonsalvador',
      techs: ['new', 'nuevo', 'novo']
    }

    const response = await api.post('/repositories',repo)

    setRepositories([...repositories,response.data])

  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete('/repositories/'+id)
    if (response.status === 204) {
      setRepositories(repositories.filter(repository => repository.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map((item) => (
            <li key={item.id}>
              {item.title}
              <button onClick={() => handleRemoveRepository(item.id)}>Remover</button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
