// Contient le plan pour le fichier circuit.html
const plan = {
    lycee: {
        batiments: [
            //Bat B
            {
                nom: "Bâtiment B",
                img: "img/lycee/exterieur/bat_B.png",
                description: "Bâtiment B du collège/lycée Jean Moulin - Accueille les différents matières portées sur les langues.",
                matieres: [ // Les matières que contient le bâtiment en question
                    {
                        nom: "Allemand", // Nom de la matière
                        genially: null, // Genially de la matière, null si aucun genially fourni
                        videos: [ // Vidéos fournies par la matière

                        ]
                    }
                ]
            },

            //Bat E
            {
                nom: "Bâtiment E",
                img: "",
                description: "",
                matieres: []
            },

            //Bat G
            {
                nom: "Bâtiment G",
                img: "",
                description: "",
                matieres: []
            }

        ]
    },

    college: {
        batiments: []
    }
}
export default plan;