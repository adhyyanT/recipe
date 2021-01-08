import './App.css';
import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import { APP_ID, APP_KEY } from './API_KEY';

function App() {
  // const APP_ID = APP_ID_EXPORT;
  // const APP_KEY = APP_KEY_EXPORT;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('butter chicken');

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };
  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
    };
    getRecipe();
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getSearch(e);
    }
  };

  var tempKey = 0;

  return (
    <div className='App'>
      <form
        onSubmit={getSearch}
        onKeyDown={handleKeyDown}
        className='search-form'
      >
        <input
          type='text'
          className='search-bar'
          value={search}
          onChange={updateSearch}
          placeholder='Butter Chicken'
        />
        <button type='submit' className='search-button'>
          Search
        </button>
      </form>
      <div className='recipes'>
        {recipes.map((recipe) => (
          <Recipe
            key={tempKey++}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
