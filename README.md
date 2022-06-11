# Architecture :
Pour ce test j'ai créé deux pages, deux composants et trois modèles et un context
# Pages :
- index :
      il inclut la liste des discussions filtrables et accessibles au clavier et à la souris
      chaque discussion est un élément à mémoriser
      il a également un bouton qui ouvre un modal pour démarrer une nouvelle conversation
- conversation
      il comprend la liste des messages et le formulaire pour envoyer un message
      chaque message est une composition
# composents:
    Discution pour les discussions
    Message pour les message
# Models:
    Discution pour les discussions
    Message pour les message
    User pour les utilisateur
# Context:
    AuthContext pour les l'utilisateur connecter

    
# Opération:
une application assez simple où l'on minimise les requêtes http qui ont un rappel pour alerter l'utilisateur lorsque les opérations échouent