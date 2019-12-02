# Accès aux données d'un événement Facebook

Écrire une application en ligne de commande qui accède via l'API de Facebook aux données d'un événement. L'application affiche ces données et la date d'expiration du token utilisé.

## Contraintes

- L'application doit être écrite en NodeJS, idéalement en Typescript.
- La sortie doit afficher un json suivant le format montré dans l'exemple.
- Le token doit être un "user token" et avoir une durée de vie supérieure à 24h.

## Événement à utiliser

https://www.facebook.com/events/376029953348299/

## Exemples

```
> node facebook-event
{
    "event_name": "Recrutement développeur",
    "start_time": "01/01/2020 10:12",
    "end_time": "02/01/2020 17:30",
    "cover": "https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/70427152_141014303796807_4689528362182377472_o.jpg?_nc_cat=101&_nc_oc=AQl47NhhyfGAdvqBsH7Ht14PAAlL6Ync2zfzAyY4B-fA65fU2G4ASZMS3Z55bZxRFYc&_nc_ht=scontent.xx&oh=56bda3ef0e9af6f7e79c50405a306295&oe=5DF61DDE",
    "days_before_token_expiration": "59"
}
```

## Rendu

Le code doit être poussé sur un repo https://gitlab.com/ avec l'historique des commits. Une fois terminé ajoute maxime@germinal.io en tant que développeur.
