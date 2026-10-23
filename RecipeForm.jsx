import React, { useEffect, useState } from 'react';

const recetteVide = { nom: '', categorie: 'Entrée', ingredients: [''], difficulte: 1, description: '', image: '' };

function RecipeForm({ recette, onEnregistrer, onAnnuler }) {
  const [form, setForm] = useState(recette || recetteVide);
  const [nouvelleImage, setNouvelleImage] = useState(null);

  useEffect(() => {
    setForm(recette ? { ...recette, ingredients: recette.ingredients.length ? [...recette.ingredients] : [''] } : { ...recetteVide, ingredients: [''] });
    setNouvelleImage(null);
  }, [recette]);

  function changerChamp(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function changerIngredient(index, valeur) {
    const ingredients = [...form.ingredients]; ingredients[index] = valeur; setForm({ ...form, ingredients });
  }
  function ajouterIngredient() { setForm({ ...form, ingredients: [...form.ingredients, ''] }); }
  function supprimerIngredient(index) { setForm({ ...form, ingredients: form.ingredients.filter((_, i) => i !== index) }); }
  function envoyer(e) {
    e.preventDefault();
    onEnregistrer({ ...form, nom: form.nom.trim(), difficulte: Number(form.difficulte), ingredients: form.ingredients.map(x => x.trim()).filter(Boolean), image: nouvelleImage ? URL.createObjectURL(nouvelleImage) : form.image });
  }

  return <form className="recipe-form" onSubmit={envoyer}>
    <label>Nom de la recette
      <input name="nom" value={form.nom} onChange={changerChamp} required />
    </label>
    <label>Catégorie
      <select name="categorie" value={form.categorie} onChange={changerChamp}>
        <option>Entrée</option><option>Plat</option><option>Dessert</option><option>Boisson</option>
      </select>
    </label>
    <div className="ingredients-field"><span className="field-title">Ingrédients</span>
      {form.ingredients.map((ingredient, index) => <div className="ingredient-row" key={index}>
        <input value={ingredient} onChange={e => changerIngredient(index, e.target.value)} aria-label={`Ingrédient ${index + 1}`} />
        <button type="button" className="danger" onClick={() => supprimerIngredient(index)} disabled={form.ingredients.length === 1}>Retirer</button>
      </div>)}
      <button type="button" onClick={ajouterIngredient}>Ajouter un ingrédient</button>
    </div>
    <label>Difficulté (1 à 5)
      <input type="range" name="difficulte" min="1" max="5" value={form.difficulte} onChange={changerChamp} />
      <span>{form.difficulte}/5</span>
    </label>
    <label>Description
      <textarea name="description" value={form.description} onChange={changerChamp} rows="3" />
    </label>
    <label>Image
      <input type="file" accept="image/*" onChange={e => setNouvelleImage(e.target.files[0] || null)} />
    </label>
    <div className="actions"><button type="submit">Enregistrer</button><button type="button" className="secondary" onClick={onAnnuler}>Annuler</button></div>
  </form>;
}
export default RecipeForm;
