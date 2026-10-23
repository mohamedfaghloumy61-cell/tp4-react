import React, { useMemo, useState } from 'react';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeFilter from './components/RecipeFilter';
import Pagination from './components/Pagination';
import Aide from './components/Aide';

function App() {
  const [recettes, setRecettes] = useState([
    { id: 1, nom: 'Salade fraîche', categorie: 'Entrée', ingredients: ['Tomate', 'Concombre', 'Laitue'], difficulte: 1, description: 'Une salade simple et fraîche.', image: '/recipe-placeholder.svg' },
    { id: 2, nom: 'Pâtes à la sauce tomate', categorie: 'Plat', ingredients: ['Pâtes', 'Tomates', 'Huile d’olive'], difficulte: 2, description: 'Des pâtes faciles à préparer.', image: '/recipe-placeholder.svg' },
    { id: 3, nom: 'Crêpes sucrées', categorie: 'Dessert', ingredients: ['Farine', 'Lait', 'Œufs', 'Sucre'], difficulte: 2, description: 'Des crêpes pour le dessert.', image: '/recipe-placeholder.svg' }
  ]);
  const [recherche, setRecherche] = useState('');
  const [categorie, setCategorie] = useState('Toutes');
  const [recetteEnCours, setRecetteEnCours] = useState(null);
  const [modalOuvert, setModalOuvert] = useState(false);
  const [page, setPage] = useState(1);
  const recettesParPage = 3;

  const recettesFiltrees = useMemo(() => recettes.filter(r =>
    r.nom.toLowerCase().includes(recherche.toLowerCase()) && (categorie === 'Toutes' || r.categorie === categorie)
  ), [recettes, recherche, categorie]);
  const totalPages = Math.max(1, Math.ceil(recettesFiltrees.length / recettesParPage));
  const recettesAffichees = recettesFiltrees.slice((page - 1) * recettesParPage, page * recettesParPage);

  function ouvrirCreation() { setRecetteEnCours(null); setModalOuvert(true); }
  function ouvrirModification(recette) { setRecetteEnCours(recette); setModalOuvert(true); }
  function enregistrer(donnees) {
    if (recetteEnCours) setRecettes(recettes.map(r => r.id === recetteEnCours.id ? { ...donnees, id: r.id } : r));
    else setRecettes([...recettes, { ...donnees, id: Date.now() }]);
    setModalOuvert(false); setRecetteEnCours(null); setPage(1);
  }
  function dupliquer(recette) { setRecettes([...recettes, { ...recette, id: Date.now(), nom: `${recette.nom} (copie)` }]); }
  function supprimer(id) { if (window.confirm('Voulez-vous supprimer cette recette ?')) setRecettes(recettes.filter(r => r.id !== id)); }

  return <main className="container">
    <header className="page-header"><h1>Creative Recipe Builder</h1><button onClick={ouvrirCreation}>+creer une Nouvelle recette</button></header>
    <RecipeFilter recherche={recherche} setRecherche={value => { setRecherche(value); setPage(1); }} categorie={categorie} setCategorie={value => { setCategorie(value); setPage(1); }} />
    <RecipeList recettes={recettesAffichees} onModifier={ouvrirModification} onDupliquer={dupliquer} onSupprimer={supprimer} />
    <Pagination page={Math.min(page, totalPages)} totalPages={totalPages} onPageChange={setPage} />
    <Aide />
    {modalOuvert && <div className="modal-backdrop" role="presentation"><section className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title"><div className="modal-header"><h2 id="form-title">{recetteEnCours ? 'Modifier la recette' : 'Nouvelle recette'}</h2><button className="secondary" onClick={() => setModalOuvert(false)} aria-label="Fermer">×</button></div><RecipeForm recette={recetteEnCours} onEnregistrer={enregistrer} onAnnuler={() => setModalOuvert(false)} /></section></div>}
  </main>;
}
export default App;
