Forma git
=========

## Pourquoi utiliser un gestionnaire de version ?

**Projet perso :**

  - On avance sur ses fonctionnalités, ça marche, jusqu'à un moment où on essaie une nouvelle feature qui plante tout, on tente de réparer, ça fout encore plus la merde, c'est le chaos, des modifications dans 20 fichiers différents... On finit par appuyer frénétiquement sur Ctrl+Z en priant pour avoir assez d'historique.
  - Si on est plus prévoyant, on fait une copie du dossier "version_qui_marche_2017-02-12", puis une autre "version_qui_marche_vraiment_2017-02-12-14h35"... Le répertoire de travail est dégueulasse, y'a 15 copies partout, et on ne s'y retrouve plus.
  - On commence à bosser sur une feature, et puis on a soudainement une idée de génie sur laquelle on veut bosser immédiatement. Problème : on a laissé le code dans un état semi-terminé, ça ne peut pas compiler parce qu'on a pas fini, mais on ne veut pas revenir en arrière pour ne pas perdre le travail déjà effectué.
  - On se retrouve à commenter du code qui ne sert plus/est cassé, en se disant que ça servira peut-être un jour -> le code est pollué
  - Si jamais son ordinateur meurt, adieu code... :cry:

**Projet collectif :**  
Comment bosser à plusieurs sur un projet ? Comment partager son code ?

  - Envoyer un .zip avec son code, et les gens doivent copier-coller les parties modifiées dans leur code ?
  - Google Drive ? Mais les fichiers ne sont pas synchronisés en temps réel, et on ne sait pas comment Google va fusionner un fichier modifié par 2 personnes différentes.
  - Utiliser une seule machine, et coder à tour de rôle...

C'est dans toute ces situations que les gestionnaires de versions peuvent servir.

  - On peut sauvegarder l'état de tous les fichiers à un instant dans le temps, et naviguer dans l'historique de tous ces "points" à l'envi. Ajout/suppression/modification de lignes, ajout/suppression de fichiers, tout est sauvegardé, et un message permettant d'indiquer l'objet du changement permet de s'y retrouver.
  - Un serveur central garde une copie de tout le code, on peut le blinder pour protéger les sources.
  - On peut travailler à plusieurs grâce à des branches distinctes.
  - On peut travailler sur plusieurs fonctionnalités en même temps de manière totalement indépendante, là aussi grâce aux branches.
  - On gagne des trucs assez cool/swag, comme la possibilité de retrouver le moment exact dans le temps où un bug a été introduit, quelles lignes de code sont concernées, qui a tapé ce code... (avec git blame)

## Autres solutions :

  - SVN (aka Subversion)
  - CVS
  - Mercurial
  - Bazaar

## (Dé)centralisé ?

SVN et CVS sont des gestionnaires de versions **centralisée** => un seul dépôt sert de référence, une seule source de vérité : le serveur central où le code est stocké.
[Image de chez Mathieu Lemoine]
**Avantages** : Tout le monde est toujours à jour sur le code.
**Problèmes** : Si Internet n'est pas là, vous ne pouvez pas travailler. Si Internet est lent, vous travaillez très difficilement.

Git et Mercurial sont des gestionnaires de versions **décentralisée**. Chacun va travailler à son rythme sur une version locale du dépot.
[Image de gitflow avec les dépôts chez tout le monde et le repo central]
**Avantages** :
  - Le code est chez tous les développeurs, ce qui limite les risques si jamais le serveur central meurt.
  - On peut travailler hors-ligne (et les opérations sont plus rapides, car faites en local).
  - On peut tester des trucs, faire des brouillons localement sans polluer le dépôt principal (et les autres développeurs).
**Désavantages** :
  - Cloner le dépôt est plus long, puisqu'on récupère tout l'historique du projet (mais encore une fois, si le serveur meurt on a le code).
  - Difficile de merge des fichiers binaires modifiés par 2 personnes en même temps.

## Qu'est-ce que c'est quoi dis donc git dans tout ça ?

Git est un logiciel de gestion de versions.
Développé par Linus Torvalds en 2005 pour gérer le développement du noyau Linux.
Git est disponible sur à peu près toutes les plateformes : Windows, macOS, Linux (toutes les distro), Android (et autres ARM)...

(PS : Ça se prononce "guitte", à l'inverse de "gif" (qui se dit "jif"))

Ligne de commande (mais plusieurs interfaces graphiques sont disponibles, open-source ou non, gratuites ou payantes)
Décentralisé
Système de branches très léger et facile d'utilisation (ça ne vous fait ni chaud ni froid pour le moment, mais on y reviendra en temps voulu)

### Téléchargement

**AJOUTER DES LIENS**
Pour Windows : git-scm (vient avec le git bash), ou cmder, ou github desktop
Pour Linux : `apt install git` ou `yum install git` ou `pacman <truc> git`
Pour Mac : avec Homebrew, `brew install git`

On vérifie que ça marche bien avec `git --version`.

## Les commandes de base (notre premier workflow)

### Création du repo

```bash
$ mkdir forma_git
$ cd forma_git
$ git init
Initialized empty Git repository in ~/forma_git/.git/
```

Là, si on fait un `ls -la`, on devrait voir un dossier `.git`. C'est là que toutes les informations dont git a besoin pour gérer votre dépôt, les commits, les branches, tout l'historique de fichiers se trouve. Donc on ne le supprime PAS !

Que peut me dire git là tout de suite, alors que je viens d'initialiser mon repo ?

```bash
$ git status
On branch master

Initial commit

nothing to commit (create/copy files and use "git add" to track)
```

On a déjà plusieurs informations :

  - Git a créé par défaut une branche `master`. C'est une convention, très souvent la branche par défaut s'appelle comme ça, tous les outils supposent que cette branche existe et qu'elle est la principale source du code.
  - Si on commit, ce sera le tout premier commit.
  - On n'a rien à commit, normal puisque le dossier est vide. Git est même gentil puisqu'il nous explique comment ajouter des choses à commit.

### Et si on versionnait un truc ?

```bash
$ vim README.md
#Taper ce qu'on veut et enregistrer
$ git status
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

  README.md

nothing added to commit but untracked files present (use "git add" to track)
```

Cette fois-ci, git nous indique qu'il a détecté des fichiers dans notre dossier, mais que ceux-ci ne sont pas "trackés" par git. En effet, git ne sauvegarde pas par défaut tous les fichiers du dossier, il faut lui indiquer spécifiquement ce dont il doit se souvenir. Là aussi, la commande à entrer est indiquée par git.

``bash
$ git add README.md
$ git status
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

  new file:   README.md
```

Maintenant, git a compris qu'on veut garder l'état de ce fichier en mémoire. Il reste encore à créer cet instantané du code.

```bash
$ git commit
#Normalement git va vous dire que vous n'avez configuré ni votre nom ni votre adresse mail. Ces deux options sont obligatoires, car elles permettent d'identifier qui fait chaque commit.
#Réglons le problème en suivant les instructions de git :
$ git config --global user.name "Thomas Gaudin"
$ git config --global user.email "thomas.gaudin@centraliens-lille.org
#On peut réessayer notre commit
$ git commit
#Taper sur la première ligne un message court de commit, qui indique brièvement la fonction du commit
#Vim (l'éditeur par défaut) indique généralement avec de la couleur à quel moment le message est trop long (50 caractères)
#Si jamais vous avez des informations particulières à ajouter au commit, une description plus détaillée du travail effectué, ou quand vous compacterez plusieurs commits en un seul, vous pouvez sauter une ligne, et écrire un roman en dessous.
#Tout le texte commenté en dessous est un récapitulatif de ce que va faire git (les fichiers ajoutés, supprimés et modifiés)
#Résultat de la commande :
[master (root-commit) 8b8a0d0] First commit
 1 file changed, 3 insertions(+)
 create mode 100644 README.md
$ git status
On branch master
nothing to commit, working directory clean
```

On se chauffe, deuxième commit ?

```bash
$ vim README.md
#On rajoute encore du texte
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

  modified:   README.md
$ git add README.md
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

  modified:   README.md
$ git commit
[master dc6d412] Second commit
 1 file changed, 1 insertion(+)
```

### Les différentes "zones" de git

Que s'est-il passé juste avant ?
On avait un fichier qui était "untracked". On l'a déplacé dans la zone "staged" avec la commande `git add`, puis dans la zone "**À CHERCHER**" avec `git commit`.



## Trucs à savoir

`git config --global user.name "Thomas Gaudin"`
`git config --global user.email "thomas.gaudin@centraliens-lille.org"`
Config : pull --ff-only, merge --no-ff
Git aime le texte, pas les binaires. Pourquoi ? diff, merge, commits légers, fichiers normalement plus petits... -> git lfs ? l'autre truc ?
**JAMAIS** faire de `git add .`
