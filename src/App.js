import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  
  useEffect(()=>{
    api.get('repositories').then((response) => {
      setRepositories(response.data)
    })
  })
  async function handleAddRepository() {
    const repo = {
      title: 'New Repository ' + Date.now(),
      url: 'localhost',
      techs: ['new', 'nuevo', 'novo']
    }

    const response = await api.post('repositories',repo)

    setRepositories([...repositories,response.data])

  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete('repositories/'+id)
    console.log(response)
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
