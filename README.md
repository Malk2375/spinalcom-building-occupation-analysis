### README

# Application d'Occupation des Pièces d'un Bâtiment

Cette application affiche l'occupation des pièces d'un bâtiment, classée par étage. Le statut d'occupation peut être TRUE (occupée), FALSE (non occupée) ou UNDEFINED (inconnu). L'application est développée avec Vue.js version 2.x.x et interagit avec l'API SpinalCom pour récupérer les données des pièces.

## Table des matières
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Endpoints API](#endpoints-api)
- [Choix de Conception](#choix-de-conception)
- [Licence](#licence)

## Fonctionnalités
- Affichage du statut d'occupation pour chaque pièce.
- Pièces organisées par étage.
- Interface utilisateur interactive avec affichage des détails des pièces au clic.
- Liste de pièces scrollable.
- Barre de défilement stylisée et fonds de carte dynamiques.

## Installation
Pour installer et exécuter l'application localement, suivez ces étapes :

1. Clonez le dépôt :
    ```sh
    git clone https://github.com/Malk2375/application-occupation-batiment.git
    ```
2. Naviguez jusqu'au répertoire du projet :
    ```sh
    cd application-occupation-batiment
    ```
3. Installez les dépendances :
    ```sh
    npm install
    ```
4. Lancez l'application :
    ```sh
    npm run serve
    ```
5. Ouvrez votre navigateur et accédez à `http://localhost:8080`.

## Utilisation
L'application se compose d'un volet gauche affichant les étages et d'un volet droit affichant les pièces. En cliquant sur une carte d'étage, les pièces correspondantes s'affichent dans le volet droit. Le premier étage est pré-sélectionné au chargement de l'application.

## Endpoints API
L'application utilise les endpoints suivants de l'API SpinalCom :

1. Obtenir la liste des pièces par étage :
    ```sh
    GET https://api-developers.spinalcom.com/api/v1/geographicContext/space
    ```
2. Obtenir la liste des endpoints de contrôle et leurs valeurs pour une pièce donnée :
    ```sh
    GET https://api-developers.spinalcom.com/api/v1/room/{dynamicId}/control_endpoint_list
    ```

## Choix de Conception
- **Vue.js** : Choisi pour sa liaison de données réactive et son architecture basée sur les composants, idéale pour une application front-end dynamique.
- **Composants Modulaires** : L'application est divisée en composants (`FloorView` et `RoomView`) pour une meilleure organisation du code et une réutilisation facilitée.
- **Barre de Défilement Stylisée** : La barre de défilement de la liste des pièces est personnalisée pour être fine, avec un pouce bleu foncé à coins arrondis, améliorant ainsi l'expérience utilisateur.
- **Fond de Carte Dynamique** : La carte d'étage sélectionnée est mise en surbrillance avec un fond vert pour indiquer la sélection active.
