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
        const trigramme = nom[0].charAt(0) + nom[0].charAt(1) + nom[1].charAt(0)
        return trigramme.toUpperCase();
    }else {
        return 'Inconnu'
    }
}
