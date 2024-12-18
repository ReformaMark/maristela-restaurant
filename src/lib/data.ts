export interface Barangay {
    barangay: string;
    municipality: string;
    province: string;
}

export const barangays = [
    { barangay: "Balagbag", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "Concepcion", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "Concordia", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "Dalipit East", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "Dalipit West", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "Dominador East", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "Dominador West", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "Munlawin", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "Muzon Primero", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "Muzon Segundo", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "Pinagkurusan", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "Ping-As", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "Poblacion East", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "Poblacion West", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "Salvador Agito", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "San Jose", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "San Juan", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "Santa Cruz", municipality: "Alitagtag", province: "Batangas" },
    { barangay: "Tadlac", municipality: "Alitagtag", province: "Batangas" },
  
    { barangay: "Balagbag", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Bungahan", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Calumayin", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Dalipit East", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Dalipit West", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Dita", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Don Juan", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Emmanuel", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Ibabao", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Labac", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Pinagkaisahan", municipality: "Cuenca", province: "Batangas" },
    { barangay: "San Felipe", municipality: "Cuenca", province: "Batangas" },
    { barangay: "San Isidro", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Barangay 1 (Poblacion)", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Barangay 2 (Poblacion)", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Barangay 3 (Poblacion)", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Barangay 4 (Poblacion)", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Barangay 5 (Poblacion)", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Barangay 6 (Poblacion)", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Barangay 7 (Poblacion)", municipality: "Cuenca", province: "Batangas" },
    { barangay: "Barangay 8 (Poblacion)", municipality: "Cuenca", province: "Batangas" },
  
    { barangay: "Antipolo", municipality: "Sta. Teresita", province: "Batangas" },
    { barangay: "Bihis", municipality: "Sta. Teresita", province: "Batangas" },
    { barangay: "Burol", municipality: "Sta. Teresita", province: "Batangas" },
    { barangay: "Calayaan", municipality: "Sta. Teresita", province: "Batangas" },
    { barangay: "Calumala", municipality: "Sta. Teresita", province: "Batangas" },
    { barangay: "Cuta East", municipality: "Sta. Teresita", province: "Batangas" },
    { barangay: "Cutang Cawayan", municipality: "Sta. Teresita", province: "Batangas" },
    { barangay: "Irukan", municipality: "Sta. Teresita", province: "Batangas" },
    { barangay: "Pacifico", municipality: "Sta. Teresita", province: "Batangas" },
    { barangay: "Poblacion I", municipality: "Sta. Teresita", province: "Batangas" },
    { barangay: "Saimsim", municipality: "Sta. Teresita", province: "Batangas" },
    { barangay: "Sampa", municipality: "Sta. Teresita", province: "Batangas" },
    { barangay: "Sinipian", municipality: "Sta. Teresita", province: "Batangas" },
    { barangay: "Tambo Ibaba", municipality: "Sta. Teresita", province: "Batangas" },
    { barangay: "Tambo Ilaya", municipality: "Sta. Teresita", province: "Batangas" },
    { barangay: "Poblacion II", municipality: "Sta. Teresita", province: "Batangas" },
    { barangay: "Poblacion III", municipality: "Sta. Teresita", province: "Batangas" }
  ];
  

  export const badWords = [
    // English offensive words
    "asshole", "bitch", "bastard", "shit", "fuck", "damn", "piss", "cunt", 
    "slut", "whore", "dick", "cock", "motherfucker", "faggot", "bastards",
    "ugly", "idiot", "stupid", "douchebag", "jackass", "prick", "bastards",
    
    // Filipino offensive words
    "puta", "putang", "gago", "bobo", "engot", "tanga", "buwisit", "putangina", 
    "uwak", "loko", "kalbo", "siraulo", "bagag", "bayot", "hamog", "kupal",
    "yawa", "pangit", "saklap", "litson", "salbahe", "tarantado", 
    "t@ng@", "tang@", "t@nga", "t@ng@a", "t4nga", "t@ng4", "t@ng", 
    "ulol", "inutil", "pakyu", "lintik", "punyeta",
    
    // Derogatory phrases
    "shut up", "shut your mouth", "suck my dick", "go to hell", "eat shit", 
    "blow me", "kiss my ass", "suck it", "fuck you", "fucker", "bastard"
];
