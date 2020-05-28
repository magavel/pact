export default class UserExtended {
  constructor(username, email, password) {
    this.utilisateur_id = null;
    this.utilisateur_prenom = null,
    this.utilisateur_nom = null,
    this.utilisateur_username = username;
    this.utilisateur_titre = null;
    this.utilisateur_email = email;
    this.utilisateur_password = password;
    this.utilisateur_actif = true;
    this.utilisateur_roles = [];
    this.utilisateur_equipes= [];
  }
}
