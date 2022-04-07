## L'architecture du projet :
Ce projet, dit frontend, est connecté à un service API backend que vous devez aussi lancer en local.

- Le projet backend se trouve ici: https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-back
- Le projet Frontend se trouve ici : https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-Front

## Organiser son espace de travail :
Pour une bonne organization, vous pouvez créer un dossier bill-app dans lequel vous allez cloner le projet backend et par la suite, le projet frontend:

Clonez le projet backend dans le dossier bill-app :
```
$ git clone https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-Back.git
```

```
bill-app/
   - Billed-app-FR-Back
```

Clonez le projet frontend dans le dossier bill-app :
```
$ git clone https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-Front.git
```

```
bill-app/
   - Billed-app-FR-Back
   - Billed-app-FR-Front
```

## Comment lancer l'application en local ?

### Etape 1 - Lancer le backend :

#### Acceder au repertoire du projet :
```
cd Billed-app-FR-Back
```

#### Installer les dépendances du projet :

```
npm install
```

#### Lancer l'API :

```
npm run run:dev
```

### Accéder à l'API :

L'api est accessible sur le port `5678` en local, c'est à dire `http://localhost:5678`

### Etape 2 - Lancer le frontend :

#### Allez au repo cloné :
```
$ cd Billed-app-FR-Front
```

#### Installez les packages npm (décrits dans `package.json`) :
```
$ npm install
```

#### Installez live-server pour lancer un serveur local :
```
$ npm install -g live-server
```

#### Lancez l'application :
```
$ live-server
```

Puis allez à l'adresse : `http://127.0.0.1:8080/`

## Utilisateurs par défaut:

### administrateur : 
```
utilisateur : admin@test.tld 
mot de passe : admin
```
### employé :
```
utilisateur : employee@test.tld
mot de passe : employee
```

## Comment lancer tous les tests en local avec Jest ?

```
$ npm run test
```

## Comment lancer un seul test ?

Installez jest-cli :

```
$npm i -g jest-cli
```
Puis :

```
$jest src/__tests__/your_test_file.js
```

Ou :

```
$jest Bills
$jest NewBill
```

## Comment voir la couverture de test ?

`http://127.0.0.1:8080/coverage/lcov-report/`
