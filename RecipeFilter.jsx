import React from 'react';

function RecipeFilter({ recherche, setRecherche, categorie, setCategorie }) {
  return <div className="filters">
    <input type="search" placeholder="Rechercher une recette" value={recherche} onChange={e => setRecherche(e.target.value)} />
    <select value={categorie} onChange={e => setCategorie(e.target.value)}>
      <option value="Toutes">Toutes les catégories</option><option>Entrée</option><option>Plat</option><option>Dessert</option><option>Boisson</option>
    </select>
  </div>;
}
export default RecipeFilter;
