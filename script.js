document.addEventListener('DOMContentLoaded', function() {
  var menuToggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('menu');
  var promotionsList = document.getElementById('promotionsList');
  var panierListe = document.getElementById('panier-liste');
  var panierLink = document.getElementById('panier-link'); // Le lien vers le panier dans la barre de navigation
  var totalPrix = document.getElementById('total'); // Elément affichant le total des prix
  var boutonViderPanier = document.getElementById('vider-panier'); // Bouton pour vider le panier

  var nombreArticlesPanier = 0; // Initialisation du nombre d'articles dans le panier
  var total = 0; // Initialisation du total des prix dans le panier

  menuToggle.addEventListener('click', function() {
    menu.classList.toggle('active');
  });
  

  // Fonction pour ajouter un article au panier
  function ajouterAuPanier(nomProduit, prixProduit) {
      var row = document.createElement('tr'); // Créer une nouvelle ligne pour le tableau
      var produitCell = document.createElement('td'); // Créer une cellule pour le produit
      var prixCell = document.createElement('td'); // Créer une cellule pour le prix
      var actionCell = document.createElement('td'); // Créer une cellule pour l'action (à implémenter selon vos besoins)

      produitCell.textContent = nomProduit; // Ajouter le nom du produit dans la cellule correspondante
      prixCell.textContent = prixProduit; // Ajouter le prix du produit dans la cellule correspondante

      row.appendChild(produitCell); // Ajouter la cellule du produit à la ligne
      row.appendChild(prixCell); // Ajouter la cellule du prix à la ligne

      panierListe.appendChild(row); // Ajouter la ligne au tableau du panier

      nombreArticlesPanier++; // Incrémenter le nombre d'articles dans le panier
      mettreAJourNombreArticlesPanier(); // Mettre à jour le texte du lien "Panier"
      total += parseFloat(prixProduit); // Ajouter le prix du produit au total
      mettreAJourTotal(); // Mettre à jour le total des prix
      sauvegarderPanier(); // Sauvegarder le panier dans le stockage local
  }

  // Mettre à jour le texte du lien "Panier" pour afficher le nombre d'articles
  function mettreAJourNombreArticlesPanier() {
    panierLink.textContent = 'Panier (' + nombreArticlesPanier + ')';
  }

  // Mettre à jour le total des prix dans le panier
  function mettreAJourTotal() {
      totalPrix.textContent = total.toFixed(2) + '€'; // Mettre à jour le texte avec le total arrondi à deux décimales
  }

  // Vider le panier
  function viderPanier() {
      panierListe.innerHTML = ''; // Vider le contenu du panier
      nombreArticlesPanier = 0; // Réinitialiser le nombre d'articles dans le panier
      total = 0; // Réinitialiser le total des prix
      mettreAJourNombreArticlesPanier(); // Mettre à jour le texte du lien "Panier"
      mettreAJourTotal(); // Mettre à jour le total des prix
      sauvegarderPanier(); // Sauvegarder le panier vide dans le stockage local
  }

  // Récupérer le panier depuis le stockage local
  function recupererPanier() {
    var panier = localStorage.getItem('panier');
    if (panier) {
      panierListe.innerHTML = panier;
      nombreArticlesPanier = panierListe.children.length; // Mettre à jour le nombre d'articles dans le panier
      total = calculerTotalPanier(); // Calculer le total des prix à partir des articles récupérés
      mettreAJourNombreArticlesPanier(); // Mettre à jour le texte du lien "Panier"
      mettreAJourTotal(); // Mettre à jour le total des prix
    }
  }

  // Calculer le total des prix dans le panier à partir des articles actuels
  function calculerTotalPanier() {
      var total = 0;
      var rows = panierListe.querySelectorAll('tr');
      rows.forEach(function(row) {
          var prixCell = row.querySelector('td:nth-child(2)');
          total += parseFloat(prixCell.textContent);
      });
      return total;
  }

  // Sauvegarder le panier dans le stockage local
  function sauvegarderPanier() {
    localStorage.setItem('panier', panierListe.innerHTML);
  }

  // Récupérer le panier lors du chargement de la page
  recupererPanier();

  // Ajouter un écouteur d'événement à chaque bouton "Ajouter au panier"
  var boutonsAjouterPanier = document.querySelectorAll('.ajouter-panier');
  boutonsAjouterPanier.forEach(function(bouton) {
    bouton.addEventListener('click', function(event) {
      event.preventDefault(); // Empêcher le lien de déclencher une action par défaut
      var produit = this.parentNode;
      var nomProduit = produit.querySelector('h3').textContent;
      var prixProduit = produit.querySelector('.prix-promo').textContent;
      ajouterAuPanier(nomProduit, prixProduit);
    });
  });

  // Ajouter un écouteur d'événement au bouton pour vider le panier
  if (boutonViderPanier) {
      boutonViderPanier.addEventListener('click', function() {
          viderPanier();
      });
  };

  document.addEventListener('DOMContentLoaded', function() {
    // Autres éléments et fonctions existantes

    var validerPanierBtn = document.getElementById('valider-panier');

    validerPanierBtn.addEventListener('click', function() {
        // Rediriger vers la page de paiement
        window.location.href = 'paiement.html';
    });

    // Autres éléments et fonctions existantes
});


});
