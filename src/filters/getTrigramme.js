           /**
 * Retourne le trigramme utilisé dans les filtres composé de
 * 2 premières lettre du prénom
 * 1 ere lettre du nom
 * @param nomComplet: string
 * @returns {string}
 */
export default function getTrigramme(nomComplet) {
    if (nomComplet) {
        const nom = nomComplet.split('.')
        console.log(nom)
        console.log(nom.length)
        let trigramme = 'Inconnu'
        if(nom.length>1) {
            trigramme = nom[0].charAt(0) + nom[0].charAt(1) + nom[1].charAt(0)
        }
        else{
            trigramme = nom[0].charAt(0) + nom[0].charAt(1);
        }
        return trigramme.toUpperCase();
    }else {
        return 'Inconnu'
    }
}
