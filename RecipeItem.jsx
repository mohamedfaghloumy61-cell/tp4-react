import React from 'react';

function RecipeItem({ recette, onModifier, onDupliquer, onSupprimer }) {
  return (
    <article className="recipe-card">
      {recette.image && <img className="recipe-image" src={recette.image} alt={recette.nom} />}
      <div className="recipe-content">
        <h3>{recette.nom}</h3>
        <p><strong>Catégorie :</strong> {recette.categorie}</p>
        <p> {recette.ingredients.join(', ')}</p>
        <p><strong>Difficulté :</strong> {recette.difficulte}/5</p>
        <p>{recette.description}</p>
        <div className="actions">
          <button onClick={() => onModifier(recette)}>Modifier</button>
          <button onClick={() => onDupliquer(recette)}>Dupliquer</button>
          <button className="danger" onClick={() => onSupprimer(recette.id)}>Supprimer</button>
        </div>
      </div>
    </article>
  );
}
export default RecipeItem;
