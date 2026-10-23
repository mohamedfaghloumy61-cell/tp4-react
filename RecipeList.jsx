import React from 'react';
import RecipeItem from './RecipeItem';

function RecipeList({ recettes, onModifier, onDupliquer, onSupprimer }) {
  if (recettes.length === 0) return <p className="empty">Aucune recette à afficher.</p>;
  return <div className="recipe-list">{recettes.map(recette => <RecipeItem key={recette.id} recette={recette} onModifier={onModifier} onDupliquer={onDupliquer} onSupprimer={onSupprimer} />)}</div>;
}
export default RecipeList;
