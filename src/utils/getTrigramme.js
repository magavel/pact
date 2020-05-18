export default function getTrigramme(nomComplet) {
    if (nomComplet) {
        const nom = nomComplet.split('.')
        const trigramme = nom[0].charAt(0) + nom[0].charAt(1) + nom[1].charAt(0)
        return trigramme.toUpperCase();
    }else {
        return 'Inconnu'
    }
}
