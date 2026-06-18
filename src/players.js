const PLAYERS = [
  {
    "name": "Matěj Kovář",
    "nationality": "République Tchèque",
    "position": "GB"
  },
  {
    "name": "Jindřich Staněk",
    "nationality": "République Tchèque",
    "position": "GB"
  },
  {
    "name": "Lukáš Horníček",
    "nationality": "République Tchèque",
    "position": "GB"
  },
  {
    "name": "Vladimír Coufal",
    "nationality": "République Tchèque",
    "position": "DC"
  },
  {
    "name": "Tomáš Holeš",
    "nationality": "République Tchèque",
    "position": "DC"
  },
  {
    "name": "Ladislav Krejčí",
    "nationality": "République Tchèque",
    "position": "DC"
  },
  {
    "name": "David Zima",
    "nationality": "République Tchèque",
    "position": "DC"
  },
  {
    "name": "Jaroslav Zelený",
    "nationality": "République Tchèque",
    "position": "DC"
  },
  {
    "name": "David Jurásek",
    "nationality": "République Tchèque",
    "position": "DG"
  },
  {
    "name": "David Douděra",
    "nationality": "République Tchèque",
    "position": "DD"
  },
  {
    "name": "Robin Hranáč",
    "nationality": "République Tchèque",
    "position": "DC"
  },
  {
    "name": "Štěpán Chaloupek",
    "nationality": "République Tchèque",
    "position": "DC"
  },
  {
    "name": "Tomáš Souček",
    "nationality": "République Tchèque",
    "position": "MC"
  },
  {
    "name": "Vladimír Darida",
    "nationality": "République Tchèque",
    "position": "MC"
  },
  {
    "name": "Lukáš Provod",
    "nationality": "République Tchèque",
    "position": "MC"
  },
  {
    "name": "Michal Sadílek",
    "nationality": "République Tchèque",
    "position": "MC"
  },
  {
    "name": "Pavel Šulc",
    "nationality": "République Tchèque",
    "position": "MC"
  },
  {
    "name": "Lukáš Červ",
    "nationality": "République Tchèque",
    "position": "MC"
  },
  {
    "name": "Hugo Sochůrek",
    "nationality": "République Tchèque",
    "position": "MC"
  },
  {
    "name": "Alexandr Sojka",
    "nationality": "République Tchèque",
    "position": "MC"
  },
  {
    "name": "Denis Višinský",
    "nationality": "République Tchèque",
    "position": "MC"
  },
  {
    "name": "Patrik Schick",
    "nationality": "République Tchèque",
    "position": "ATT"
  },
  {
    "name": "Adam Hložek",
    "nationality": "République Tchèque",
    "position": "ATT"
  },
  {
    "name": "Jan Kuchta",
    "nationality": "République Tchèque",
    "position": "ATT"
  },
  {
    "name": "Mojmír Chytil",
    "nationality": "République Tchèque",
    "position": "ATT"
  },
  {
    "name": "Tomáš Chorý",
    "nationality": "République Tchèque",
    "position": "ATT"
  },
  {
    "name": "Guillermo Ochoa",
    "nationality": "Mexique",
    "position": "GB"
  },
  {
    "name": "Raúl Rangel",
    "nationality": "Mexique",
    "position": "GB"
  },
  {
    "name": "Carlos Acevedo",
    "nationality": "Mexique",
    "position": "GB"
  },
  {
    "name": "Jesús Gallardo",
    "nationality": "Mexique",
    "position": "DG"
  },
  {
    "name": "César Montes",
    "nationality": "Mexique",
    "position": "DC"
  },
  {
    "name": "Jorge Sánchez",
    "nationality": "Mexique",
    "position": "DD"
  },
  {
    "name": "Johan Vásquez",
    "nationality": "Mexique",
    "position": "DC"
  },
  {
    "name": "Israel Reyes",
    "nationality": "Mexique",
    "position": "DC"
  },
  {
    "name": "Mateo Chávez",
    "nationality": "Mexique",
    "position": "DC"
  },
  {
    "name": "Edson Álvarez",
    "nationality": "Mexique",
    "position": "MDC"
  },
  {
    "name": "Orbelín Pineda",
    "nationality": "Mexique",
    "position": "MC"
  },
  {
    "name": "Roberto Alvarado",
    "nationality": "Mexique",
    "position": "MC"
  },
  {
    "name": "Luis Romo",
    "nationality": "Mexique",
    "position": "MC"
  },
  {
    "name": "Luis Chávez",
    "nationality": "Mexique",
    "position": "MC"
  },
  {
    "name": "Érik Lira",
    "nationality": "Mexique",
    "position": "MC"
  },
  {
    "name": "Gilberto Mora",
    "nationality": "Mexique",
    "position": "MC"
  },
  {
    "name": "Brian Gutiérrez",
    "nationality": "Mexique",
    "position": "MC"
  },
  {
    "name": "Obed Vargas",
    "nationality": "Mexique",
    "position": "MC"
  },
  {
    "name": "Álvaro Fidalgo",
    "nationality": "Mexique",
    "position": "MC"
  },
  {
    "name": "Raúl Jiménez",
    "nationality": "Mexique",
    "position": "ATT"
  },
  {
    "name": "Alexis Vega",
    "nationality": "Mexique",
    "position": "ATT"
  },
  {
    "name": "Santiago Giménez",
    "nationality": "Mexique",
    "position": "ATT"
  },
  {
    "name": "César Huerta",
    "nationality": "Mexique",
    "position": "ATT"
  },
  {
    "name": "Julián Quiñones",
    "nationality": "Mexique",
    "position": "ATT"
  },
  {
    "name": "Guillermo Martínez",
    "nationality": "Mexique",
    "position": "ATT"
  },
  {
    "name": "Armando González",
    "nationality": "Mexique",
    "position": "ATT"
  },
  {
    "name": "Ronwen Williams",
    "nationality": "Afrique du Sud",
    "position": "GB"
  },
  {
    "name": "Ricardo Goss",
    "nationality": "Afrique du Sud",
    "position": "GB"
  },
  {
    "name": "Sipho Chaine",
    "nationality": "Afrique du Sud",
    "position": "GB"
  },
  {
    "name": "Aubrey Modiba",
    "nationality": "Afrique du Sud",
    "position": "DG"
  },
  {
    "name": "Khuliso Mudau",
    "nationality": "Afrique du Sud",
    "position": "DD"
  },
  {
    "name": "Nkosinathi Sibisi",
    "nationality": "Afrique du Sud",
    "position": "DC"
  },
  {
    "name": "Mbekezeli Mbokazi",
    "nationality": "Afrique du Sud",
    "position": "DC"
  },
  {
    "name": "Ime Okon",
    "nationality": "Afrique du Sud",
    "position": "DC"
  },
  {
    "name": "Samukele Kabini",
    "nationality": "Afrique du Sud",
    "position": "DC"
  },
  {
    "name": "Khulumani Ndamane",
    "nationality": "Afrique du Sud",
    "position": "DC"
  },
  {
    "name": "Thabang Matuludi",
    "nationality": "Afrique du Sud",
    "position": "DC"
  },
  {
    "name": "Kamogelo Sebelebele",
    "nationality": "Afrique du Sud",
    "position": "DC"
  },
  {
    "name": "Bradley Cross",
    "nationality": "Afrique du Sud",
    "position": "DC"
  },
  {
    "name": "Olwethu Makhanya",
    "nationality": "Afrique du Sud",
    "position": "DC"
  },
  {
    "name": "Teboho Mokoena",
    "nationality": "Afrique du Sud",
    "position": "MC"
  },
  {
    "name": "Sphephelo Sithole",
    "nationality": "Afrique du Sud",
    "position": "MC"
  },
  {
    "name": "Thalente Mbatha",
    "nationality": "Afrique du Sud",
    "position": "MC"
  },
  {
    "name": "Jayden Adams",
    "nationality": "Afrique du Sud",
    "position": "MC"
  },
  {
    "name": "Themba Zwane",
    "nationality": "Afrique du Sud",
    "position": "ATT"
  },
  {
    "name": "Lyle Foster",
    "nationality": "Afrique du Sud",
    "position": "ATT"
  },
  {
    "name": "Evidence Makgopa",
    "nationality": "Afrique du Sud",
    "position": "ATT"
  },
  {
    "name": "Oswin Appollis",
    "nationality": "Afrique du Sud",
    "position": "ATT"
  },
  {
    "name": "Iqraam Rayners",
    "nationality": "Afrique du Sud",
    "position": "ATT"
  },
  {
    "name": "Relebohile Mofokeng",
    "nationality": "Afrique du Sud",
    "position": "ATT"
  },
  {
    "name": "Thapelo Maseko",
    "nationality": "Afrique du Sud",
    "position": "ATT"
  },
  {
    "name": "Tshepang Moremi",
    "nationality": "Afrique du Sud",
    "position": "ATT"
  },
  {
    "name": "Kim Seung-gyu",
    "nationality": "Corée du Sud",
    "position": "GB"
  },
  {
    "name": "Jo Hyeon-woo",
    "nationality": "Corée du Sud",
    "position": "GB"
  },
  {
    "name": "Song Bum-keun",
    "nationality": "Corée du Sud",
    "position": "GB"
  },
  {
    "name": "Kim Min-jae",
    "nationality": "Corée du Sud",
    "position": "DC"
  },
  {
    "name": "Kim Moon-hwan",
    "nationality": "Corée du Sud",
    "position": "DD"
  },
  {
    "name": "Seol Young-woo",
    "nationality": "Corée du Sud",
    "position": "DC"
  },
  {
    "name": "Lee Tae-seok",
    "nationality": "Corée du Sud",
    "position": "DC"
  },
  {
    "name": "Park Jin-seob",
    "nationality": "Corée du Sud",
    "position": "DC"
  },
  {
    "name": "Kim Tae-hyeon",
    "nationality": "Corée du Sud",
    "position": "DC"
  },
  {
    "name": "Lee Han-beom",
    "nationality": "Corée du Sud",
    "position": "DC"
  },
  {
    "name": "Jens Castrop",
    "nationality": "Corée du Sud",
    "position": "DC"
  },
  {
    "name": "Lee Ki-hyuk",
    "nationality": "Corée du Sud",
    "position": "DC"
  },
  {
    "name": "Cho Wi-je",
    "nationality": "Corée du Sud",
    "position": "DC"
  },
  {
    "name": "Lee Jae-sung",
    "nationality": "Corée du Sud",
    "position": "MC"
  },
  {
    "name": "Hwang Hee-chan",
    "nationality": "Corée du Sud",
    "position": "ATT"
  },
  {
    "name": "Hwang In-beom",
    "nationality": "Corée du Sud",
    "position": "MC"
  },
  {
    "name": "Lee Kang-in",
    "nationality": "Corée du Sud",
    "position": "MO"
  },
  {
    "name": "Paik Seung-ho",
    "nationality": "Corée du Sud",
    "position": "MC"
  },
  {
    "name": "Kim Jin-gyu",
    "nationality": "Corée du Sud",
    "position": "MC"
  },
  {
    "name": "Lee Dong-gyeong",
    "nationality": "Corée du Sud",
    "position": "MC"
  },
  {
    "name": "Bae Jun-ho",
    "nationality": "Corée du Sud",
    "position": "MC"
  },
  {
    "name": "Eom Ji-sung",
    "nationality": "Corée du Sud",
    "position": "MC"
  },
  {
    "name": "Yang Hyun-jun",
    "nationality": "Corée du Sud",
    "position": "AG"
  },
  {
    "name": "Son Heung-min",
    "nationality": "Corée du Sud",
    "position": "ATT"
  },
  {
    "name": "Cho Gue-sung",
    "nationality": "Corée du Sud",
    "position": "ATT"
  },
  {
    "name": "Oh Hyeon-gyu",
    "nationality": "Corée du Sud",
    "position": "ATT"
  },
  {
    "name": "Nikola Vasilj",
    "nationality": "Bosnie-Herzégovine",
    "position": "GB"
  },
  {
    "name": "Martin Zlomislić",
    "nationality": "Bosnie-Herzégovine",
    "position": "GB"
  },
  {
    "name": "Osman Hadžikić",
    "nationality": "Bosnie-Herzégovine",
    "position": "GB"
  },
  {
    "name": "Sead Kolašinac",
    "nationality": "Bosnie-Herzégovine",
    "position": "DG"
  },
  {
    "name": "Dennis Hadžikadunić",
    "nationality": "Bosnie-Herzégovine",
    "position": "DC"
  },
  {
    "name": "Amar Dedić",
    "nationality": "Bosnie-Herzégovine",
    "position": "DD"
  },
  {
    "name": "Nikola Katić",
    "nationality": "Bosnie-Herzégovine",
    "position": "DC"
  },
  {
    "name": "Tarik Muharemović",
    "nationality": "Bosnie-Herzégovine",
    "position": "DC"
  },
  {
    "name": "Nihad Mujakić",
    "nationality": "Bosnie-Herzégovine",
    "position": "DC"
  },
  {
    "name": "Stjepan Radeljić",
    "nationality": "Bosnie-Herzégovine",
    "position": "DC"
  },
  {
    "name": "Nidal Čelik",
    "nationality": "Bosnie-Herzégovine",
    "position": "DC"
  },
  {
    "name": "Amir Hadžiahmetović",
    "nationality": "Bosnie-Herzégovine",
    "position": "MC"
  },
  {
    "name": "Benjamin Tahirović",
    "nationality": "Bosnie-Herzégovine",
    "position": "MC"
  },
  {
    "name": "Armin Gigović",
    "nationality": "Bosnie-Herzégovine",
    "position": "MC"
  },
  {
    "name": "Dženis Burnić",
    "nationality": "Bosnie-Herzégovine",
    "position": "MC"
  },
  {
    "name": "Ivan Bašić",
    "nationality": "Bosnie-Herzégovine",
    "position": "MC"
  },
  {
    "name": "Esmir Bajraktarević",
    "nationality": "Bosnie-Herzégovine",
    "position": "MC"
  },
  {
    "name": "Amar Memić",
    "nationality": "Bosnie-Herzégovine",
    "position": "MC"
  },
  {
    "name": "Ivan Šunjić",
    "nationality": "Bosnie-Herzégovine",
    "position": "MC"
  },
  {
    "name": "Kerim Alajbegović",
    "nationality": "Bosnie-Herzégovine",
    "position": "MC"
  },
  {
    "name": "Ermin Mahmić",
    "nationality": "Bosnie-Herzégovine",
    "position": "MC"
  },
  {
    "name": "Edin Džeko",
    "nationality": "Bosnie-Herzégovine",
    "position": "ATT"
  },
  {
    "name": "Ermedin Demirović",
    "nationality": "Bosnie-Herzégovine",
    "position": "ATT"
  },
  {
    "name": "Samed Baždar",
    "nationality": "Bosnie-Herzégovine",
    "position": "ATT"
  },
  {
    "name": "Haris Tabaković",
    "nationality": "Bosnie-Herzégovine",
    "position": "ATT"
  },
  {
    "name": "Jovo Lukić",
    "nationality": "Bosnie-Herzégovine",
    "position": "ATT"
  },
  {
    "name": "Dayne St. Clair",
    "nationality": "Canada",
    "position": "GB"
  },
  {
    "name": "Maxime Crépeau",
    "nationality": "Canada",
    "position": "GB"
  },
  {
    "name": "Owen Goodman",
    "nationality": "Canada",
    "position": "GB"
  },
  {
    "name": "Alistair Johnston",
    "nationality": "Canada",
    "position": "DD"
  },
  {
    "name": "Luc de Fougerolles",
    "nationality": "Canada",
    "position": "DC"
  },
  {
    "name": "Alfie Jones",
    "nationality": "Canada",
    "position": "DC"
  },
  {
    "name": "Joel Waterman",
    "nationality": "Canada",
    "position": "DC"
  },
  {
    "name": "Derek Cornelius",
    "nationality": "Canada",
    "position": "DC"
  },
  {
    "name": "Moïse Bombito",
    "nationality": "Canada",
    "position": "DC"
  },
  {
    "name": "Richie Laryea",
    "nationality": "Canada",
    "position": "DD"
  },
  {
    "name": "Niko Sigur",
    "nationality": "Canada",
    "position": "DC"
  },
  {
    "name": "Alphonso Davies",
    "nationality": "Canada",
    "position": "DG"
  },
  {
    "name": "Mathieu Choinière",
    "nationality": "Canada",
    "position": "MC"
  },
  {
    "name": "Stephen Eustáquio",
    "nationality": "Canada",
    "position": "MC"
  },
  {
    "name": "Ismaël Koné",
    "nationality": "Canada",
    "position": "MC"
  },
  {
    "name": "Liam Millar",
    "nationality": "Canada",
    "position": "MC"
  },
  {
    "name": "Jacob Shaffelburg",
    "nationality": "Canada",
    "position": "MC"
  },
  {
    "name": "Ali Ahmed",
    "nationality": "Canada",
    "position": "MC"
  },
  {
    "name": "Jonathan Osorio",
    "nationality": "Canada",
    "position": "MC"
  },
  {
    "name": "Nathan Saliba",
    "nationality": "Canada",
    "position": "MC"
  },
  {
    "name": "Tajon Buchanan",
    "nationality": "Canada",
    "position": "AD"
  },
  {
    "name": "Cyle Larin",
    "nationality": "Canada",
    "position": "ATT"
  },
  {
    "name": "Jonathan David",
    "nationality": "Canada",
    "position": "ATT"
  },
  {
    "name": "Tani Oluwaseyi",
    "nationality": "Canada",
    "position": "ATT"
  },
  {
    "name": "Promise David",
    "nationality": "Canada",
    "position": "ATT"
  },
  {
    "name": "Mahmud Abunada",
    "nationality": "Qatar",
    "position": "GB"
  },
  {
    "name": "Salah Zakaria",
    "nationality": "Qatar",
    "position": "GB"
  },
  {
    "name": "Meshaal Barsham",
    "nationality": "Qatar",
    "position": "GB"
  },
  {
    "name": "Pedro Miguel",
    "nationality": "Qatar",
    "position": "DG"
  },
  {
    "name": "Lucas Mendes",
    "nationality": "Qatar",
    "position": "DC"
  },
  {
    "name": "Issa Laye",
    "nationality": "Qatar",
    "position": "DC"
  },
  {
    "name": "Homam Ahmed",
    "nationality": "Qatar",
    "position": "DC"
  },
  {
    "name": "Sultan Al-Brake",
    "nationality": "Qatar",
    "position": "DC"
  },
  {
    "name": "Boualem Khoukhi",
    "nationality": "Qatar",
    "position": "DC"
  },
  {
    "name": "Ayoub Al-Oui",
    "nationality": "Qatar",
    "position": "DC"
  },
  {
    "name": "Al-Hashmi Al-Hussain",
    "nationality": "Qatar",
    "position": "DC"
  },
  {
    "name": "Jassem Gaber",
    "nationality": "Qatar",
    "position": "MC"
  },
  {
    "name": "Abdulaziz Hatem",
    "nationality": "Qatar",
    "position": "MC"
  },
  {
    "name": "Karim Boudiaf",
    "nationality": "Qatar",
    "position": "MC"
  },
  {
    "name": "Assim Madibo",
    "nationality": "Qatar",
    "position": "MC"
  },
  {
    "name": "Ahmed Fathy",
    "nationality": "Qatar",
    "position": "MC"
  },
  {
    "name": "Mohamed Al-Mannai",
    "nationality": "Qatar",
    "position": "MC"
  },
  {
    "name": "Ahmed Alaaeldin",
    "nationality": "Qatar",
    "position": "ATT"
  },
  {
    "name": "Edmilson Junior",
    "nationality": "Qatar",
    "position": "ATT"
  },
  {
    "name": "Mohammed Muntari",
    "nationality": "Qatar",
    "position": "ATT"
  },
  {
    "name": "Hassan Al-Haydos",
    "nationality": "Qatar",
    "position": "ATT"
  },
  {
    "name": "Akram Afif",
    "nationality": "Qatar",
    "position": "ATT"
  },
  {
    "name": "Yusuf Abdurisag",
    "nationality": "Qatar",
    "position": "ATT"
  },
  {
    "name": "Ahmed Al-Ganehi",
    "nationality": "Qatar",
    "position": "ATT"
  },
  {
    "name": "Almoez Ali",
    "nationality": "Qatar",
    "position": "ATT"
  },
  {
    "name": "Tahsin Jamshid",
    "nationality": "Qatar",
    "position": "ATT"
  },
  {
    "name": "Gregor Kobel",
    "nationality": "Suisse",
    "position": "GB"
  },
  {
    "name": "Yvon Mvogo",
    "nationality": "Suisse",
    "position": "GB"
  },
  {
    "name": "Marvin Keller",
    "nationality": "Suisse",
    "position": "GB"
  },
  {
    "name": "Miro Muheim",
    "nationality": "Suisse",
    "position": "DG"
  },
  {
    "name": "Silvan Widmer",
    "nationality": "Suisse",
    "position": "DD"
  },
  {
    "name": "Nico Elvedi",
    "nationality": "Suisse",
    "position": "DC"
  },
  {
    "name": "Manuel Akanji",
    "nationality": "Suisse",
    "position": "DC"
  },
  {
    "name": "Ricardo Rodriguez",
    "nationality": "Suisse",
    "position": "DG"
  },
  {
    "name": "Eray Cömert",
    "nationality": "Suisse",
    "position": "DC"
  },
  {
    "name": "Aurèle Amenda",
    "nationality": "Suisse",
    "position": "DC"
  },
  {
    "name": "Luca Jaquez",
    "nationality": "Suisse",
    "position": "DC"
  },
  {
    "name": "Denis Zakaria",
    "nationality": "Suisse",
    "position": "MC"
  },
  {
    "name": "Remo Freuler",
    "nationality": "Suisse",
    "position": "MC"
  },
  {
    "name": "Johan Manzambi",
    "nationality": "Suisse",
    "position": "MC"
  },
  {
    "name": "Granit Xhaka",
    "nationality": "Suisse",
    "position": "MDC"
  },
  {
    "name": "Djibril Sow",
    "nationality": "Suisse",
    "position": "MC"
  },
  {
    "name": "Christian Fassnacht",
    "nationality": "Suisse",
    "position": "MC"
  },
  {
    "name": "Michel Aebischer",
    "nationality": "Suisse",
    "position": "MC"
  },
  {
    "name": "Fabian Rieder",
    "nationality": "Suisse",
    "position": "MC"
  },
  {
    "name": "Ardon Jashari",
    "nationality": "Suisse",
    "position": "MC"
  },
  {
    "name": "Breel Embolo",
    "nationality": "Suisse",
    "position": "ATT"
  },
  {
    "name": "Dan Ndoye",
    "nationality": "Suisse",
    "position": "AD"
  },
  {
    "name": "Rubén Vargas",
    "nationality": "Suisse",
    "position": "AG"
  },
  {
    "name": "Noah Okafor",
    "nationality": "Suisse",
    "position": "ATT"
  },
  {
    "name": "Zeki Amdouni",
    "nationality": "Suisse",
    "position": "ATT"
  },
  {
    "name": "Cedric Itten",
    "nationality": "Suisse",
    "position": "ATT"
  },
  {
    "name": "Alisson",
    "nationality": "Brésil",
    "position": "GB"
  },
  {
    "name": "Weverton",
    "nationality": "Brésil",
    "position": "GB"
  },
  {
    "name": "Ederson",
    "nationality": "Brésil",
    "position": "GB"
  },
  {
    "name": "Wesley",
    "nationality": "Brésil",
    "position": "DD"
  },
  {
    "name": "Gabriel Magalhães",
    "nationality": "Brésil",
    "position": "DC"
  },
  {
    "name": "Marquinhos",
    "nationality": "Brésil",
    "position": "DC"
  },
  {
    "name": "Alex Sandro",
    "nationality": "Brésil",
    "position": "DG"
  },
  {
    "name": "Danilo Luiz",
    "nationality": "Brésil",
    "position": "DD"
  },
  {
    "name": "Bremer",
    "nationality": "Brésil",
    "position": "DC"
  },
  {
    "name": "Léo Pereira",
    "nationality": "Brésil",
    "position": "DC"
  },
  {
    "name": "Douglas Santos",
    "nationality": "Brésil",
    "position": "DG"
  },
  {
    "name": "Roger Ibañez",
    "nationality": "Brésil",
    "position": "DC"
  },
  {
    "name": "Casemiro",
    "nationality": "Brésil",
    "position": "MDC"
  },
  {
    "name": "Bruno Guimarães",
    "nationality": "Brésil",
    "position": "MC"
  },
  {
    "name": "Fabinho",
    "nationality": "Brésil",
    "position": "MDC"
  },
  {
    "name": "Danilo Santos",
    "nationality": "Brésil",
    "position": "MC"
  },
  {
    "name": "Lucas Paquetá",
    "nationality": "Brésil",
    "position": "MO"
  },
  {
    "name": "Vinícius Júnior",
    "nationality": "Brésil",
    "position": "AG"
  },
  {
    "name": "Neymar",
    "nationality": "Brésil",
    "position": "MO"
  },
  {
    "name": "Raphinha",
    "nationality": "Brésil",
    "position": "AD"
  },
  {
    "name": "Endrick",
    "nationality": "Brésil",
    "position": "ATT"
  },
  {
    "name": "Matheus Cunha",
    "nationality": "Brésil",
    "position": "ATT"
  },
  {
    "name": "Luiz Henrique",
    "nationality": "Brésil",
    "position": "ATT"
  },
  {
    "name": "Gabriel Martinelli",
    "nationality": "Brésil",
    "position": "AG"
  },
  {
    "name": "Igor Thiago",
    "nationality": "Brésil",
    "position": "ATT"
  },
  {
    "name": "Rayan",
    "nationality": "Brésil",
    "position": "ATT"
  },
  {
    "name": "Mike Maignan",
    "nationality": "France",
    "position": "GB"
  },
  {
    "name": "Alphonse Areola",
    "nationality": "France",
    "position": "GB"
  },
  {
    "name": "Guillaume Restes",
    "nationality": "France",
    "position": "GB"
  },
  {
    "name": "Jules Koundé",
    "nationality": "France",
    "position": "DD"
  },
  {
    "name": "William Saliba",
    "nationality": "France",
    "position": "DC"
  },
  {
    "name": "Dayot Upamecano",
    "nationality": "France",
    "position": "DC"
  },
  {
    "name": "Ibrahima Konaté",
    "nationality": "France",
    "position": "DC"
  },
  {
    "name": "Théo Hernández",
    "nationality": "France",
    "position": "DG"
  },
  {
    "name": "Jonathan Clauss",
    "nationality": "France",
    "position": "DD"
  },
  {
    "name": "Lucas Digne",
    "nationality": "France",
    "position": "DG"
  },
  {
    "name": "Benoit Badiashile",
    "nationality": "France",
    "position": "DC"
  },
  {
    "name": "N'Golo Kanté",
    "nationality": "France",
    "position": "MDC"
  },
  {
    "name": "Aurélien Tchouaméni",
    "nationality": "France",
    "position": "MDC"
  },
  {
    "name": "Eduardo Camavinga",
    "nationality": "France",
    "position": "MC"
  },
  {
    "name": "Adrien Rabiot",
    "nationality": "France",
    "position": "MC"
  },
  {
    "name": "Youssouf Fofana",
    "nationality": "France",
    "position": "MC"
  },
  {
    "name": "Warren Zaïre-Emery",
    "nationality": "France",
    "position": "MC"
  },
  {
    "name": "Kylian Mbappé",
    "nationality": "France",
    "position": "ATT"
  },
  {
    "name": "Antoine Griezmann",
    "nationality": "France",
    "position": "MO"
  },
  {
    "name": "Ousmane Dembélé",
    "nationality": "France",
    "position": "AD"
  },
  {
    "name": "Marcus Thuram",
    "nationality": "France",
    "position": "ATT"
  },
  {
    "name": "Randal Kolo Muani",
    "nationality": "France",
    "position": "ATT"
  },
  {
    "name": "Bradley Barcola",
    "nationality": "France",
    "position": "AG"
  },
  {
    "name": "Kingsley Coman",
    "nationality": "France",
    "position": "AG"
  },
  {
    "name": "Olivier Giroud",
    "nationality": "France",
    "position": "ATT"
  },
  {
    "name": "Christopher Nkunku",
    "nationality": "France",
    "position": "ATT"
  },
  {
    "name": "Emiliano Martínez",
    "nationality": "Argentine",
    "position": "GB"
  },
  {
    "name": "Geronimo Rulli",
    "nationality": "Argentine",
    "position": "GB"
  },
  {
    "name": "Walter Benítez",
    "nationality": "Argentine",
    "position": "GB"
  },
  {
    "name": "Nahuel Molina",
    "nationality": "Argentine",
    "position": "DD"
  },
  {
    "name": "Gonzalo Montiel",
    "nationality": "Argentine",
    "position": "DD"
  },
  {
    "name": "Cristian Romero",
    "nationality": "Argentine",
    "position": "DC"
  },
  {
    "name": "Lisandro Martínez",
    "nationality": "Argentine",
    "position": "DC"
  },
  {
    "name": "Nicolás Otamendi",
    "nationality": "Argentine",
    "position": "DC"
  },
  {
    "name": "Germán Pezzella",
    "nationality": "Argentine",
    "position": "DC"
  },
  {
    "name": "Marcos Acuña",
    "nationality": "Argentine",
    "position": "DG"
  },
  {
    "name": "Nicolás Tagliafico",
    "nationality": "Argentine",
    "position": "DG"
  },
  {
    "name": "Rodrigo De Paul",
    "nationality": "Argentine",
    "position": "MC"
  },
  {
    "name": "Leandro Paredes",
    "nationality": "Argentine",
    "position": "MDC"
  },
  {
    "name": "Enzo Fernández",
    "nationality": "Argentine",
    "position": "MC"
  },
  {
    "name": "Alexis Mac Allister",
    "nationality": "Argentine",
    "position": "MC"
  },
  {
    "name": "Giovani Lo Celso",
    "nationality": "Argentine",
    "position": "MO"
  },
  {
    "name": "Thiago Almada",
    "nationality": "Argentine",
    "position": "MC"
  },
  {
    "name": "Exequiel Palacios",
    "nationality": "Argentine",
    "position": "MC"
  },
  {
    "name": "Lionel Messi",
    "nationality": "Argentine",
    "position": "MO"
  },
  {
    "name": "Lautaro Martínez",
    "nationality": "Argentine",
    "position": "ATT"
  },
  {
    "name": "Julián Álvarez",
    "nationality": "Argentine",
    "position": "ATT"
  },
  {
    "name": "Paulo Dybala",
    "nationality": "Argentine",
    "position": "MO"
  },
  {
    "name": "Ángel Di María",
    "nationality": "Argentine",
    "position": "AD"
  },
  {
    "name": "Alejandro Garnacho",
    "nationality": "Argentine",
    "position": "AG"
  },
  {
    "name": "Nicolás González",
    "nationality": "Argentine",
    "position": "ATT"
  },
  {
    "name": "Valentín Castellanos",
    "nationality": "Argentine",
    "position": "ATT"
  },
  {
    "name": "Unai Simón",
    "nationality": "Espagne",
    "position": "GB"
  },
  {
    "name": "David Raya",
    "nationality": "Espagne",
    "position": "GB"
  },
  {
    "name": "Álex Remiro",
    "nationality": "Espagne",
    "position": "GB"
  },
  {
    "name": "Dani Carvajal",
    "nationality": "Espagne",
    "position": "DD"
  },
  {
    "name": "Pedro Porro",
    "nationality": "Espagne",
    "position": "DD"
  },
  {
    "name": "Robin Le Normand",
    "nationality": "Espagne",
    "position": "DC"
  },
  {
    "name": "Aymeric Laporte",
    "nationality": "Espagne",
    "position": "DC"
  },
  {
    "name": "Pau Cubarsí",
    "nationality": "Espagne",
    "position": "DC"
  },
  {
    "name": "Alejandro Balde",
    "nationality": "Espagne",
    "position": "DG"
  },
  {
    "name": "Grimaldo",
    "nationality": "Espagne",
    "position": "DG"
  },
  {
    "name": "Marc Cucurella",
    "nationality": "Espagne",
    "position": "DG"
  },
  {
    "name": "Rodri",
    "nationality": "Espagne",
    "position": "MDC"
  },
  {
    "name": "Pedri",
    "nationality": "Espagne",
    "position": "MC"
  },
  {
    "name": "Gavi",
    "nationality": "Espagne",
    "position": "MC"
  },
  {
    "name": "Fabián Ruiz",
    "nationality": "Espagne",
    "position": "MC"
  },
  {
    "name": "Martín Zubimendi",
    "nationality": "Espagne",
    "position": "MDC"
  },
  {
    "name": "Dani Olmo",
    "nationality": "Espagne",
    "position": "MO"
  },
  {
    "name": "Lamine Yamal",
    "nationality": "Espagne",
    "position": "AD"
  },
  {
    "name": "Nico Williams",
    "nationality": "Espagne",
    "position": "AG"
  },
  {
    "name": "Ferran Torres",
    "nationality": "Espagne",
    "position": "ATT"
  },
  {
    "name": "Mikel Oyarzabal",
    "nationality": "Espagne",
    "position": "ATT"
  },
  {
    "name": "Álvaro Morata",
    "nationality": "Espagne",
    "position": "ATT"
  },
  {
    "name": "Ayoze Pérez",
    "nationality": "Espagne",
    "position": "ATT"
  },
  {
    "name": "Bryan Zaragoza",
    "nationality": "Espagne",
    "position": "AG"
  },
  {
    "name": "Jesús Navas",
    "nationality": "Espagne",
    "position": "DD"
  },
  {
    "name": "Manuel Neuer",
    "nationality": "Allemagne",
    "position": "GB"
  },
  {
    "name": "Marc-André ter Stegen",
    "nationality": "Allemagne",
    "position": "GB"
  },
  {
    "name": "Oliver Baumann",
    "nationality": "Allemagne",
    "position": "GB"
  },
  {
    "name": "Joshua Kimmich",
    "nationality": "Allemagne",
    "position": "DD"
  },
  {
    "name": "Benjamin Pavard",
    "nationality": "Allemagne",
    "position": "DC"
  },
  {
    "name": "Antonio Rüdiger",
    "nationality": "Allemagne",
    "position": "DC"
  },
  {
    "name": "Nico Schlotterbeck",
    "nationality": "Allemagne",
    "position": "DC"
  },
  {
    "name": "Jonathan Tah",
    "nationality": "Allemagne",
    "position": "DC"
  },
  {
    "name": "David Raum",
    "nationality": "Allemagne",
    "position": "DG"
  },
  {
    "name": "Maximilian Mittelstädt",
    "nationality": "Allemagne",
    "position": "DG"
  },
  {
    "name": "Waldemar Anton",
    "nationality": "Allemagne",
    "position": "DC"
  },
  {
    "name": "Toni Kroos",
    "nationality": "Allemagne",
    "position": "MC"
  },
  {
    "name": "Leon Goretzka",
    "nationality": "Allemagne",
    "position": "MC"
  },
  {
    "name": "Robert Andrich",
    "nationality": "Allemagne",
    "position": "MDC"
  },
  {
    "name": "Pascal Groß",
    "nationality": "Allemagne",
    "position": "MC"
  },
  {
    "name": "Aleksandar Pavlović",
    "nationality": "Allemagne",
    "position": "MDC"
  },
  {
    "name": "Assan Ouédraogo",
    "nationality": "Allemagne",
    "position": "MC"
  },
  {
    "name": "Jamal Musiala",
    "nationality": "Allemagne",
    "position": "MO"
  },
  {
    "name": "Florian Wirtz",
    "nationality": "Allemagne",
    "position": "MO"
  },
  {
    "name": "Leroy Sané",
    "nationality": "Allemagne",
    "position": "AD"
  },
  {
    "name": "Kai Havertz",
    "nationality": "Allemagne",
    "position": "ATT"
  },
  {
    "name": "Thomas Müller",
    "nationality": "Allemagne",
    "position": "MO"
  },
  {
    "name": "Deniz Undav",
    "nationality": "Allemagne",
    "position": "ATT"
  },
  {
    "name": "Tim Kleindienst",
    "nationality": "Allemagne",
    "position": "ATT"
  },
  {
    "name": "Niclas Füllkrug",
    "nationality": "Allemagne",
    "position": "ATT"
  },
  {
    "name": "Jordan Pickford",
    "nationality": "Angleterre",
    "position": "GB"
  },
  {
    "name": "Dean Henderson",
    "nationality": "Angleterre",
    "position": "GB"
  },
  {
    "name": "James Trafford",
    "nationality": "Angleterre",
    "position": "GB"
  },
  {
    "name": "Kyle Walker",
    "nationality": "Angleterre",
    "position": "DD"
  },
  {
    "name": "Trent Alexander-Arnold",
    "nationality": "Angleterre",
    "position": "DD"
  },
  {
    "name": "John Stones",
    "nationality": "Angleterre",
    "position": "DC"
  },
  {
    "name": "Harry Maguire",
    "nationality": "Angleterre",
    "position": "DC"
  },
  {
    "name": "Marc Guéhi",
    "nationality": "Angleterre",
    "position": "DC"
  },
  {
    "name": "Luke Shaw",
    "nationality": "Angleterre",
    "position": "DG"
  },
  {
    "name": "Andrew Robertson",
    "nationality": "Angleterre",
    "position": "DG"
  },
  {
    "name": "Ezri Konsa",
    "nationality": "Angleterre",
    "position": "DC"
  },
  {
    "name": "Declan Rice",
    "nationality": "Angleterre",
    "position": "MDC"
  },
  {
    "name": "Kobbie Mainoo",
    "nationality": "Angleterre",
    "position": "MC"
  },
  {
    "name": "Conor Gallagher",
    "nationality": "Angleterre",
    "position": "MC"
  },
  {
    "name": "Jude Bellingham",
    "nationality": "Angleterre",
    "position": "MO"
  },
  {
    "name": "Phil Foden",
    "nationality": "Angleterre",
    "position": "MO"
  },
  {
    "name": "Cole Palmer",
    "nationality": "Angleterre",
    "position": "MO"
  },
  {
    "name": "Bukayo Saka",
    "nationality": "Angleterre",
    "position": "AD"
  },
  {
    "name": "Marcus Rashford",
    "nationality": "Angleterre",
    "position": "AG"
  },
  {
    "name": "Jarrod Bowen",
    "nationality": "Angleterre",
    "position": "AD"
  },
  {
    "name": "Harry Kane",
    "nationality": "Angleterre",
    "position": "ATT"
  },
  {
    "name": "Ollie Watkins",
    "nationality": "Angleterre",
    "position": "ATT"
  },
  {
    "name": "Ivan Toney",
    "nationality": "Angleterre",
    "position": "ATT"
  },
  {
    "name": "Anthony Gordon",
    "nationality": "Angleterre",
    "position": "AG"
  },
  {
    "name": "Eberechi Eze",
    "nationality": "Angleterre",
    "position": "MO"
  },
  {
    "name": "Diogo Costa",
    "nationality": "Portugal",
    "position": "GB"
  },
  {
    "name": "Rui Patrício",
    "nationality": "Portugal",
    "position": "GB"
  },
  {
    "name": "José Sá",
    "nationality": "Portugal",
    "position": "GB"
  },
  {
    "name": "João Cancelo",
    "nationality": "Portugal",
    "position": "DD"
  },
  {
    "name": "Diogo Dalot",
    "nationality": "Portugal",
    "position": "DD"
  },
  {
    "name": "Rúben Dias",
    "nationality": "Portugal",
    "position": "DC"
  },
  {
    "name": "Pepe",
    "nationality": "Portugal",
    "position": "DC"
  },
  {
    "name": "António Silva",
    "nationality": "Portugal",
    "position": "DC"
  },
  {
    "name": "Nuno Mendes",
    "nationality": "Portugal",
    "position": "DG"
  },
  {
    "name": "Raphael Guerreiro",
    "nationality": "Portugal",
    "position": "DG"
  },
  {
    "name": "Gonçalo Inácio",
    "nationality": "Portugal",
    "position": "DC"
  },
  {
    "name": "Vitinha",
    "nationality": "Portugal",
    "position": "MC"
  },
  {
    "name": "Bernardo Silva",
    "nationality": "Portugal",
    "position": "MC"
  },
  {
    "name": "Bruno Fernandes",
    "nationality": "Portugal",
    "position": "MO"
  },
  {
    "name": "Rúben Neves",
    "nationality": "Portugal",
    "position": "MDC"
  },
  {
    "name": "João Palhinha",
    "nationality": "Portugal",
    "position": "MDC"
  },
  {
    "name": "Matheus Nunes",
    "nationality": "Portugal",
    "position": "MC"
  },
  {
    "name": "Cristiano Ronaldo",
    "nationality": "Portugal",
    "position": "ATT"
  },
  {
    "name": "Rafael Leão",
    "nationality": "Portugal",
    "position": "AG"
  },
  {
    "name": "João Félix",
    "nationality": "Portugal",
    "position": "ATT"
  },
  {
    "name": "Diogo Jota",
    "nationality": "Portugal",
    "position": "ATT"
  },
  {
    "name": "Gonçalo Ramos",
    "nationality": "Portugal",
    "position": "ATT"
  },
  {
    "name": "Francisco Trincão",
    "nationality": "Portugal",
    "position": "AD"
  },
  {
    "name": "Pedro Neto",
    "nationality": "Portugal",
    "position": "AG"
  },
  {
    "name": "Rafa Silva",
    "nationality": "Portugal",
    "position": "MO"
  },
  {
    "name": "Thibaut Courtois",
    "nationality": "Belgique",
    "position": "GB"
  },
  {
    "name": "Koen Casteels",
    "nationality": "Belgique",
    "position": "GB"
  },
  {
    "name": "Matz Sels",
    "nationality": "Belgique",
    "position": "GB"
  },
  {
    "name": "Timothy Castagne",
    "nationality": "Belgique",
    "position": "DD"
  },
  {
    "name": "Thomas Meunier",
    "nationality": "Belgique",
    "position": "DD"
  },
  {
    "name": "Wout Faes",
    "nationality": "Belgique",
    "position": "DC"
  },
  {
    "name": "Jan Vertonghen",
    "nationality": "Belgique",
    "position": "DC"
  },
  {
    "name": "Arthur Theate",
    "nationality": "Belgique",
    "position": "DC"
  },
  {
    "name": "Zeno Debast",
    "nationality": "Belgique",
    "position": "DC"
  },
  {
    "name": "Maxim De Cuyper",
    "nationality": "Belgique",
    "position": "DG"
  },
  {
    "name": "Brandon Mechele",
    "nationality": "Belgique",
    "position": "DC"
  },
  {
    "name": "Axel Witsel",
    "nationality": "Belgique",
    "position": "MDC"
  },
  {
    "name": "Youri Tielemans",
    "nationality": "Belgique",
    "position": "MC"
  },
  {
    "name": "Kevin De Bruyne",
    "nationality": "Belgique",
    "position": "MO"
  },
  {
    "name": "Amadou Onana",
    "nationality": "Belgique",
    "position": "MDC"
  },
  {
    "name": "Charles De Ketelaere",
    "nationality": "Belgique",
    "position": "MO"
  },
  {
    "name": "Hans Vanaken",
    "nationality": "Belgique",
    "position": "MC"
  },
  {
    "name": "Jeremy Doku",
    "nationality": "Belgique",
    "position": "AG"
  },
  {
    "name": "Leandro Trossard",
    "nationality": "Belgique",
    "position": "AG"
  },
  {
    "name": "Lois Openda",
    "nationality": "Belgique",
    "position": "ATT"
  },
  {
    "name": "Romelu Lukaku",
    "nationality": "Belgique",
    "position": "ATT"
  },
  {
    "name": "Dodi Lukebakio",
    "nationality": "Belgique",
    "position": "AD"
  },
  {
    "name": "Johan Bakayoko",
    "nationality": "Belgique",
    "position": "AD"
  },
  {
    "name": "Loïs Openda",
    "nationality": "Belgique",
    "position": "ATT"
  },
  {
    "name": "Arthur Vermeeren",
    "nationality": "Belgique",
    "position": "MC"
  },
  {
    "name": "Bart Verbruggen",
    "nationality": "Pays-Bas",
    "position": "GB"
  },
  {
    "name": "Mark Flekken",
    "nationality": "Pays-Bas",
    "position": "GB"
  },
  {
    "name": "Remko Pasveer",
    "nationality": "Pays-Bas",
    "position": "GB"
  },
  {
    "name": "Denzel Dumfries",
    "nationality": "Pays-Bas",
    "position": "DD"
  },
  {
    "name": "Lutsharel Geertruida",
    "nationality": "Pays-Bas",
    "position": "DD"
  },
  {
    "name": "Virgil van Dijk",
    "nationality": "Pays-Bas",
    "position": "DC"
  },
  {
    "name": "Stefan de Vrij",
    "nationality": "Pays-Bas",
    "position": "DC"
  },
  {
    "name": "Matthijs de Ligt",
    "nationality": "Pays-Bas",
    "position": "DC"
  },
  {
    "name": "Nathan Aké",
    "nationality": "Pays-Bas",
    "position": "DG"
  },
  {
    "name": "Daley Blind",
    "nationality": "Pays-Bas",
    "position": "DG"
  },
  {
    "name": "Micky van de Ven",
    "nationality": "Pays-Bas",
    "position": "DC"
  },
  {
    "name": "Frenkie de Jong",
    "nationality": "Pays-Bas",
    "position": "MC"
  },
  {
    "name": "Tijjani Reijnders",
    "nationality": "Pays-Bas",
    "position": "MC"
  },
  {
    "name": "Ryan Gravenberch",
    "nationality": "Pays-Bas",
    "position": "MC"
  },
  {
    "name": "Jerdy Schouten",
    "nationality": "Pays-Bas",
    "position": "MDC"
  },
  {
    "name": "Xavi Simons",
    "nationality": "Pays-Bas",
    "position": "MO"
  },
  {
    "name": "Joey Veerman",
    "nationality": "Pays-Bas",
    "position": "MC"
  },
  {
    "name": "Cody Gakpo",
    "nationality": "Pays-Bas",
    "position": "AG"
  },
  {
    "name": "Steven Bergwijn",
    "nationality": "Pays-Bas",
    "position": "AD"
  },
  {
    "name": "Donyell Malen",
    "nationality": "Pays-Bas",
    "position": "ATT"
  },
  {
    "name": "Memphis Depay",
    "nationality": "Pays-Bas",
    "position": "ATT"
  },
  {
    "name": "Brian Brobbey",
    "nationality": "Pays-Bas",
    "position": "ATT"
  },
  {
    "name": "Wout Weghorst",
    "nationality": "Pays-Bas",
    "position": "ATT"
  },
  {
    "name": "Noa Lang",
    "nationality": "Pays-Bas",
    "position": "AG"
  },
  {
    "name": "Sávio",
    "nationality": "Pays-Bas",
    "position": "AD"
  },
  {
    "name": "Gianluigi Donnarumma",
    "nationality": "Italie",
    "position": "GB"
  },
  {
    "name": "Alex Meret",
    "nationality": "Italie",
    "position": "GB"
  },
  {
    "name": "Guglielmo Vicario",
    "nationality": "Italie",
    "position": "GB"
  },
  {
    "name": "Giovanni Di Lorenzo",
    "nationality": "Italie",
    "position": "DD"
  },
  {
    "name": "Alessandro Florenzi",
    "nationality": "Italie",
    "position": "DD"
  },
  {
    "name": "Alessandro Bastoni",
    "nationality": "Italie",
    "position": "DG"
  },
  {
    "name": "Giorgio Scalvini",
    "nationality": "Italie",
    "position": "DC"
  },
  {
    "name": "Riccardo Calafiori",
    "nationality": "Italie",
    "position": "DG"
  },
  {
    "name": "Matteo Darmian",
    "nationality": "Italie",
    "position": "DD"
  },
  {
    "name": "Federico Gatti",
    "nationality": "Italie",
    "position": "DC"
  },
  {
    "name": "Manuel Locatelli",
    "nationality": "Italie",
    "position": "MDC"
  },
  {
    "name": "Nicolo Barella",
    "nationality": "Italie",
    "position": "MC"
  },
  {
    "name": "Sandro Tonali",
    "nationality": "Italie",
    "position": "MC"
  },
  {
    "name": "Bryan Cristante",
    "nationality": "Italie",
    "position": "MC"
  },
  {
    "name": "Lorenzo Pellegrini",
    "nationality": "Italie",
    "position": "MO"
  },
  {
    "name": "Davide Frattesi",
    "nationality": "Italie",
    "position": "MC"
  },
  {
    "name": "Samuele Ricci",
    "nationality": "Italie",
    "position": "MDC"
  },
  {
    "name": "Federico Chiesa",
    "nationality": "Italie",
    "position": "AD"
  },
  {
    "name": "Federico Dimarco",
    "nationality": "Italie",
    "position": "AG"
  },
  {
    "name": "Matteo Politano",
    "nationality": "Italie",
    "position": "AD"
  },
  {
    "name": "Mateo Retegui",
    "nationality": "Italie",
    "position": "ATT"
  },
  {
    "name": "Giacomo Raspadori",
    "nationality": "Italie",
    "position": "ATT"
  },
  {
    "name": "Lorenzo Lucca",
    "nationality": "Italie",
    "position": "ATT"
  },
  {
    "name": "Moise Kean",
    "nationality": "Italie",
    "position": "ATT"
  },
  {
    "name": "Stephan El Shaarawy",
    "nationality": "Italie",
    "position": "AG"
  },
  {
    "name": "Dominik Livakovic",
    "nationality": "Croatie",
    "position": "GB"
  },
  {
    "name": "Ivica Ivušić",
    "nationality": "Croatie",
    "position": "GB"
  },
  {
    "name": "Nediljko Labrović",
    "nationality": "Croatie",
    "position": "GB"
  },
  {
    "name": "Josip Juranović",
    "nationality": "Croatie",
    "position": "DD"
  },
  {
    "name": "Sime Vrsaljko",
    "nationality": "Croatie",
    "position": "DD"
  },
  {
    "name": "Duje Ćaleta-Car",
    "nationality": "Croatie",
    "position": "DC"
  },
  {
    "name": "Martin Erlić",
    "nationality": "Croatie",
    "position": "DC"
  },
  {
    "name": "Joško Gvardiol",
    "nationality": "Croatie",
    "position": "DG"
  },
  {
    "name": "Borna Sosa",
    "nationality": "Croatie",
    "position": "DG"
  },
  {
    "name": "Luka Modric",
    "nationality": "Croatie",
    "position": "MC"
  },
  {
    "name": "Mateo Kovacic",
    "nationality": "Croatie",
    "position": "MC"
  },
  {
    "name": "Marcelo Brozovic",
    "nationality": "Croatie",
    "position": "MDC"
  },
  {
    "name": "Mario Pasalic",
    "nationality": "Croatie",
    "position": "MC"
  },
  {
    "name": "Lovro Majer",
    "nationality": "Croatie",
    "position": "MO"
  },
  {
    "name": "Luka Ivanusec",
    "nationality": "Croatie",
    "position": "MO"
  },
  {
    "name": "Ivan Perisic",
    "nationality": "Croatie",
    "position": "AG"
  },
  {
    "name": "Ante Budimir",
    "nationality": "Croatie",
    "position": "ATT"
  },
  {
    "name": "Marko Livaja",
    "nationality": "Croatie",
    "position": "ATT"
  },
  {
    "name": "Bruno Petkovic",
    "nationality": "Croatie",
    "position": "ATT"
  },
  {
    "name": "Andrej Kramarić",
    "nationality": "Croatie",
    "position": "ATT"
  },
  {
    "name": "Marko Pjaca",
    "nationality": "Croatie",
    "position": "AD"
  },
  {
    "name": "Luka Sucic",
    "nationality": "Croatie",
    "position": "MC"
  },
  {
    "name": "Toni Fruk",
    "nationality": "Croatie",
    "position": "MC"
  },
  {
    "name": "Petar Musa",
    "nationality": "Croatie",
    "position": "ATT"
  },
  {
    "name": "Nikola Vlasic",
    "nationality": "Croatie",
    "position": "MO"
  },
  {
    "name": "Kristijan Jakic",
    "nationality": "Croatie",
    "position": "MC"
  },
  {
    "name": "Yassine Bounou",
    "nationality": "Maroc",
    "position": "GB"
  },
  {
    "name": "Munir Mohamedi",
    "nationality": "Maroc",
    "position": "GB"
  },
  {
    "name": "Ahmed Tagnaouti",
    "nationality": "Maroc",
    "position": "GB"
  },
  {
    "name": "Achraf Hakimi",
    "nationality": "Maroc",
    "position": "DD"
  },
  {
    "name": "Noussair Mazraoui",
    "nationality": "Maroc",
    "position": "DD"
  },
  {
    "name": "Nayef Aguerd",
    "nationality": "Maroc",
    "position": "DC"
  },
  {
    "name": "Romain Saïss",
    "nationality": "Maroc",
    "position": "DC"
  },
  {
    "name": "Jawad El Yamiq",
    "nationality": "Maroc",
    "position": "DC"
  },
  {
    "name": "Adam Masina",
    "nationality": "Maroc",
    "position": "DG"
  },
  {
    "name": "Yahia Attiat-Allah",
    "nationality": "Maroc",
    "position": "DG"
  },
  {
    "name": "Marwane Saâdane",
    "nationality": "Maroc",
    "position": "DC"
  },
  {
    "name": "Sofyan Amrabat",
    "nationality": "Maroc",
    "position": "MDC"
  },
  {
    "name": "Azzedine Ounahi",
    "nationality": "Maroc",
    "position": "MC"
  },
  {
    "name": "Selim Amallah",
    "nationality": "Maroc",
    "position": "MC"
  },
  {
    "name": "Bilal El Khannouss",
    "nationality": "Maroc",
    "position": "MO"
  },
  {
    "name": "Ilias Chair",
    "nationality": "Maroc",
    "position": "MO"
  },
  {
    "name": "Abde Ezzalzouli",
    "nationality": "Maroc",
    "position": "AG"
  },
  {
    "name": "Hakim Ziyech",
    "nationality": "Maroc",
    "position": "MO"
  },
  {
    "name": "Soufiane Rahimi",
    "nationality": "Maroc",
    "position": "ATT"
  },
  {
    "name": "Youssef En-Nesyri",
    "nationality": "Maroc",
    "position": "ATT"
  },
  {
    "name": "Sofiane Boufal",
    "nationality": "Maroc",
    "position": "AG"
  },
  {
    "name": "Ayoub El Kaabi",
    "nationality": "Maroc",
    "position": "ATT"
  },
  {
    "name": "Amine Sbaï",
    "nationality": "Maroc",
    "position": "AD"
  },
  {
    "name": "Zakaria Aboukhlal",
    "nationality": "Maroc",
    "position": "ATT"
  },
  {
    "name": "Brahim Díaz",
    "nationality": "Maroc",
    "position": "MO"
  },
  {
    "name": "Nassim Azaouzi",
    "nationality": "Maroc",
    "position": "MC"
  },
  {
    "name": "Édouard Mendy",
    "nationality": "Sénégal",
    "position": "GB"
  },
  {
    "name": "Alfred Gomis",
    "nationality": "Sénégal",
    "position": "GB"
  },
  {
    "name": "Seny Dieng",
    "nationality": "Sénégal",
    "position": "GB"
  },
  {
    "name": "Formose Mendy",
    "nationality": "Sénégal",
    "position": "DD"
  },
  {
    "name": "Youssouf Sabaly",
    "nationality": "Sénégal",
    "position": "DD"
  },
  {
    "name": "Abdou Diallo",
    "nationality": "Sénégal",
    "position": "DC"
  },
  {
    "name": "Kalidou Koulibaly",
    "nationality": "Sénégal",
    "position": "DC"
  },
  {
    "name": "Moussa Niakhaté",
    "nationality": "Sénégal",
    "position": "DC"
  },
  {
    "name": "Fodé Ballo-Touré",
    "nationality": "Sénégal",
    "position": "DG"
  },
  {
    "name": "Ismail Jakobs",
    "nationality": "Sénégal",
    "position": "DG"
  },
  {
    "name": "Idrissa Gueye",
    "nationality": "Sénégal",
    "position": "MDC"
  },
  {
    "name": "Cheikhou Kouyaté",
    "nationality": "Sénégal",
    "position": "MC"
  },
  {
    "name": "Pape Matar Sarr",
    "nationality": "Sénégal",
    "position": "MC"
  },
  {
    "name": "Nampalys Mendy",
    "nationality": "Sénégal",
    "position": "MDC"
  },
  {
    "name": "Krepin Diatta",
    "nationality": "Sénégal",
    "position": "AD"
  },
  {
    "name": "Lamine Camara",
    "nationality": "Sénégal",
    "position": "MC"
  },
  {
    "name": "Sadio Mané",
    "nationality": "Sénégal",
    "position": "ATT"
  },
  {
    "name": "Ismaïla Sarr",
    "nationality": "Sénégal",
    "position": "AD"
  },
  {
    "name": "Boulaye Dia",
    "nationality": "Sénégal",
    "position": "ATT"
  },
  {
    "name": "Nicolas Jackson",
    "nationality": "Sénégal",
    "position": "ATT"
  },
  {
    "name": "Habib Diallo",
    "nationality": "Sénégal",
    "position": "ATT"
  },
  {
    "name": "Abdallah Sima",
    "nationality": "Sénégal",
    "position": "ATT"
  },
  {
    "name": "Iliman Ndiaye",
    "nationality": "Sénégal",
    "position": "MO"
  },
  {
    "name": "Famara Diédhiou",
    "nationality": "Sénégal",
    "position": "ATT"
  },
  {
    "name": "Pathé Ciss",
    "nationality": "Sénégal",
    "position": "MDC"
  },
  {
    "name": "Matt Turner",
    "nationality": "États-Unis",
    "position": "GB"
  },
  {
    "name": "Patrick Schulte",
    "nationality": "États-Unis",
    "position": "GB"
  },
  {
    "name": "Ethan Horvath",
    "nationality": "États-Unis",
    "position": "GB"
  },
  {
    "name": "Sergiño Dest",
    "nationality": "États-Unis",
    "position": "DD"
  },
  {
    "name": "DeAndre Yedlin",
    "nationality": "États-Unis",
    "position": "DD"
  },
  {
    "name": "Chris Richards",
    "nationality": "États-Unis",
    "position": "DC"
  },
  {
    "name": "Cameron Carter-Vickers",
    "nationality": "États-Unis",
    "position": "DC"
  },
  {
    "name": "Miles Robinson",
    "nationality": "États-Unis",
    "position": "DC"
  },
  {
    "name": "Antonee Robinson",
    "nationality": "États-Unis",
    "position": "DG"
  },
  {
    "name": "Joe Scally",
    "nationality": "États-Unis",
    "position": "DD"
  },
  {
    "name": "Tim Ream",
    "nationality": "États-Unis",
    "position": "DC"
  },
  {
    "name": "Tyler Adams",
    "nationality": "États-Unis",
    "position": "MDC"
  },
  {
    "name": "Weston McKennie",
    "nationality": "États-Unis",
    "position": "MC"
  },
  {
    "name": "Yunus Musah",
    "nationality": "États-Unis",
    "position": "MC"
  },
  {
    "name": "Luca de la Torre",
    "nationality": "États-Unis",
    "position": "MC"
  },
  {
    "name": "Johnny Cardoso",
    "nationality": "États-Unis",
    "position": "MDC"
  },
  {
    "name": "Christian Pulisic",
    "nationality": "États-Unis",
    "position": "MO"
  },
  {
    "name": "Gio Reyna",
    "nationality": "États-Unis",
    "position": "MO"
  },
  {
    "name": "Tim Weah",
    "nationality": "États-Unis",
    "position": "AD"
  },
  {
    "name": "Brenden Aaronson",
    "nationality": "États-Unis",
    "position": "MC"
  },
  {
    "name": "Folarin Balogun",
    "nationality": "États-Unis",
    "position": "ATT"
  },
  {
    "name": "Ricardo Pepi",
    "nationality": "États-Unis",
    "position": "ATT"
  },
  {
    "name": "Josh Sargent",
    "nationality": "États-Unis",
    "position": "ATT"
  },
  {
    "name": "Cade Cowell",
    "nationality": "États-Unis",
    "position": "AG"
  },
  {
    "name": "Patrick Agyemang",
    "nationality": "États-Unis",
    "position": "ATT"
  },
  {
    "name": "Sergio Rochet",
    "nationality": "Uruguay",
    "position": "GB"
  },
  {
    "name": "Sebastián Sosa",
    "nationality": "Uruguay",
    "position": "GB"
  },
  {
    "name": "Santiago Mele",
    "nationality": "Uruguay",
    "position": "GB"
  },
  {
    "name": "Ronald Araújo",
    "nationality": "Uruguay",
    "position": "DC"
  },
  {
    "name": "José María Giménez",
    "nationality": "Uruguay",
    "position": "DC"
  },
  {
    "name": "Sebastián Coates",
    "nationality": "Uruguay",
    "position": "DC"
  },
  {
    "name": "Matías Viña",
    "nationality": "Uruguay",
    "position": "DG"
  },
  {
    "name": "Mathias Olivera",
    "nationality": "Uruguay",
    "position": "DG"
  },
  {
    "name": "Martín Cáceres",
    "nationality": "Uruguay",
    "position": "DD"
  },
  {
    "name": "Guillermo Varela",
    "nationality": "Uruguay",
    "position": "DD"
  },
  {
    "name": "Federico Valverde",
    "nationality": "Uruguay",
    "position": "MC"
  },
  {
    "name": "Rodrigo Bentancur",
    "nationality": "Uruguay",
    "position": "MC"
  },
  {
    "name": "Manuel Ugarte",
    "nationality": "Uruguay",
    "position": "MDC"
  },
  {
    "name": "Nicolás De La Cruz",
    "nationality": "Uruguay",
    "position": "MO"
  },
  {
    "name": "Giorgian de Arrascaeta",
    "nationality": "Uruguay",
    "position": "MO"
  },
  {
    "name": "Darwin Núñez",
    "nationality": "Uruguay",
    "position": "ATT"
  },
  {
    "name": "Facundo Pellistri",
    "nationality": "Uruguay",
    "position": "AD"
  },
  {
    "name": "Maximiliano Araújo",
    "nationality": "Uruguay",
    "position": "AG"
  },
  {
    "name": "Luis Suárez",
    "nationality": "Uruguay",
    "position": "ATT"
  },
  {
    "name": "Edinson Cavani",
    "nationality": "Uruguay",
    "position": "ATT"
  },
  {
    "name": "Brian Rodríguez",
    "nationality": "Uruguay",
    "position": "AG"
  },
  {
    "name": "Agustín Canobbio",
    "nationality": "Uruguay",
    "position": "ATT"
  },
  {
    "name": "Luciano Rodríguez",
    "nationality": "Uruguay",
    "position": "ATT"
  },
  {
    "name": "Emiliano Martínez",
    "nationality": "Uruguay",
    "position": "ATT"
  },
  {
    "name": "Ignacio Laquintana",
    "nationality": "Uruguay",
    "position": "ATT"
  },
  {
    "name": "Stanley Nwabali",
    "nationality": "Nigeria",
    "position": "GB"
  },
  {
    "name": "Maduka Okoye",
    "nationality": "Nigeria",
    "position": "GB"
  },
  {
    "name": "John Noble",
    "nationality": "Nigeria",
    "position": "GB"
  },
  {
    "name": "Ola Aina",
    "nationality": "Nigeria",
    "position": "DD"
  },
  {
    "name": "Zaidu Sanusi",
    "nationality": "Nigeria",
    "position": "DG"
  },
  {
    "name": "William Troost-Ekong",
    "nationality": "Nigeria",
    "position": "DC"
  },
  {
    "name": "Bright Osayi-Samuel",
    "nationality": "Nigeria",
    "position": "DD"
  },
  {
    "name": "Semi Ajayi",
    "nationality": "Nigeria",
    "position": "DC"
  },
  {
    "name": "Calvin Bassey",
    "nationality": "Nigeria",
    "position": "DC"
  },
  {
    "name": "Tanimu Musa",
    "nationality": "Nigeria",
    "position": "DC"
  },
  {
    "name": "Alex Iwobi",
    "nationality": "Nigeria",
    "position": "MC"
  },
  {
    "name": "Wilfred Ndidi",
    "nationality": "Nigeria",
    "position": "MDC"
  },
  {
    "name": "Frank Onyeka",
    "nationality": "Nigeria",
    "position": "MC"
  },
  {
    "name": "Samuel Chukwueze",
    "nationality": "Nigeria",
    "position": "AD"
  },
  {
    "name": "Moses Simon",
    "nationality": "Nigeria",
    "position": "AG"
  },
  {
    "name": "Victor Osimhen",
    "nationality": "Nigeria",
    "position": "ATT"
  },
  {
    "name": "Kelechi Iheanacho",
    "nationality": "Nigeria",
    "position": "ATT"
  },
  {
    "name": "Paul Onuachu",
    "nationality": "Nigeria",
    "position": "ATT"
  },
  {
    "name": "Ademola Lookman",
    "nationality": "Nigeria",
    "position": "ATT"
  },
  {
    "name": "Taiwo Awoniyi",
    "nationality": "Nigeria",
    "position": "ATT"
  },
  {
    "name": "Terem Moffi",
    "nationality": "Nigeria",
    "position": "ATT"
  },
  {
    "name": "Fisayo Dele-Bashiru",
    "nationality": "Nigeria",
    "position": "MC"
  },
  {
    "name": "Alhassan Yusuf",
    "nationality": "Nigeria",
    "position": "MC"
  },
  {
    "name": "Oluwafemi Adeniyi",
    "nationality": "Nigeria",
    "position": "MC"
  },
  {
    "name": "Tosin Adarabioyo",
    "nationality": "Nigeria",
    "position": "DC"
  },
  {
    "name": "Yahia Fofana",
    "nationality": "Côte d'Ivoire",
    "position": "GB"
  },
  {
    "name": "Badra Ali Sangaré",
    "nationality": "Côte d'Ivoire",
    "position": "GB"
  },
  {
    "name": "Ali Badra Sangaré",
    "nationality": "Côte d'Ivoire",
    "position": "GB"
  },
  {
    "name": "Serge Aurier",
    "nationality": "Côte d'Ivoire",
    "position": "DD"
  },
  {
    "name": "Willy Boly",
    "nationality": "Côte d'Ivoire",
    "position": "DC"
  },
  {
    "name": "Odilon Kossounou",
    "nationality": "Côte d'Ivoire",
    "position": "DC"
  },
  {
    "name": "Ghislain Konan",
    "nationality": "Côte d'Ivoire",
    "position": "DG"
  },
  {
    "name": "Eric Bailly",
    "nationality": "Côte d'Ivoire",
    "position": "DC"
  },
  {
    "name": "Simon Deli",
    "nationality": "Côte d'Ivoire",
    "position": "DC"
  },
  {
    "name": "Issiaka Ouédraogo",
    "nationality": "Côte d'Ivoire",
    "position": "DC"
  },
  {
    "name": "Franck Kessié",
    "nationality": "Côte d'Ivoire",
    "position": "MC"
  },
  {
    "name": "Ibrahim Sangaré",
    "nationality": "Côte d'Ivoire",
    "position": "MDC"
  },
  {
    "name": "Jean-Michaël Seri",
    "nationality": "Côte d'Ivoire",
    "position": "MC"
  },
  {
    "name": "Seko Fofana",
    "nationality": "Côte d'Ivoire",
    "position": "MC"
  },
  {
    "name": "Badou Ndiaye",
    "nationality": "Côte d'Ivoire",
    "position": "MC"
  },
  {
    "name": "Wilfried Zaha",
    "nationality": "Côte d'Ivoire",
    "position": "AG"
  },
  {
    "name": "Nicolas Pépé",
    "nationality": "Côte d'Ivoire",
    "position": "AD"
  },
  {
    "name": "Simon Adingra",
    "nationality": "Côte d'Ivoire",
    "position": "AD"
  },
  {
    "name": "Sébastien Haller",
    "nationality": "Côte d'Ivoire",
    "position": "ATT"
  },
  {
    "name": "Jérémie Boga",
    "nationality": "Côte d'Ivoire",
    "position": "MO"
  },
  {
    "name": "Oumar Diakité",
    "nationality": "Côte d'Ivoire",
    "position": "ATT"
  },
  {
    "name": "Christian Kouamé",
    "nationality": "Côte d'Ivoire",
    "position": "ATT"
  },
  {
    "name": "Jonathan Bamba",
    "nationality": "Côte d'Ivoire",
    "position": "AG"
  },
  {
    "name": "Max-Alain Gradel",
    "nationality": "Côte d'Ivoire",
    "position": "AG"
  },
  {
    "name": "Amad Diallo",
    "nationality": "Côte d'Ivoire",
    "position": "AD"
  },
  {
    "name": "Christopher Opéri",
    "nationality": "Côte d'Ivoire",
    "position": "MC"
  },
  {
    "name": "Shuichi Gonda",
    "nationality": "Japon",
    "position": "GB"
  },
  {
    "name": "Zion Suzuki",
    "nationality": "Japon",
    "position": "GB"
  },
  {
    "name": "Shūto Machino",
    "nationality": "Japon",
    "position": "GB"
  },
  {
    "name": "Hiroki Sakai",
    "nationality": "Japon",
    "position": "DD"
  },
  {
    "name": "Miki Yamane",
    "nationality": "Japon",
    "position": "DD"
  },
  {
    "name": "Maya Yoshida",
    "nationality": "Japon",
    "position": "DC"
  },
  {
    "name": "Takehiro Tomiyasu",
    "nationality": "Japon",
    "position": "DC"
  },
  {
    "name": "Ko Itakura",
    "nationality": "Japon",
    "position": "DC"
  },
  {
    "name": "Hiroki Ito",
    "nationality": "Japon",
    "position": "DG"
  },
  {
    "name": "Yuto Nagatomo",
    "nationality": "Japon",
    "position": "DG"
  },
  {
    "name": "Shogo Taniguchi",
    "nationality": "Japon",
    "position": "DC"
  },
  {
    "name": "Wataru Endo",
    "nationality": "Japon",
    "position": "MDC"
  },
  {
    "name": "Ao Tanaka",
    "nationality": "Japon",
    "position": "MC"
  },
  {
    "name": "Hidemasa Morita",
    "nationality": "Japon",
    "position": "MC"
  },
  {
    "name": "Sho Ito",
    "nationality": "Japon",
    "position": "AD"
  },
  {
    "name": "Junya Ito",
    "nationality": "Japon",
    "position": "AD"
  },
  {
    "name": "Kaoru Mitoma",
    "nationality": "Japon",
    "position": "AG"
  },
  {
    "name": "Takumi Minamino",
    "nationality": "Japon",
    "position": "MO"
  },
  {
    "name": "Ritsu Doan",
    "nationality": "Japon",
    "position": "AD"
  },
  {
    "name": "Daichi Kamada",
    "nationality": "Japon",
    "position": "MO"
  },
  {
    "name": "Ayase Ueda",
    "nationality": "Japon",
    "position": "ATT"
  },
  {
    "name": "Takuma Asano",
    "nationality": "Japon",
    "position": "ATT"
  },
  {
    "name": "Keito Nakamura",
    "nationality": "Japon",
    "position": "AD"
  },
  {
    "name": "Koki Machida",
    "nationality": "Japon",
    "position": "DC"
  },
  {
    "name": "Yuki Soma",
    "nationality": "Japon",
    "position": "MO"
  },
  {
    "name": "Mat Ryan",
    "nationality": "Australie",
    "position": "GB"
  },
  {
    "name": "Danny Vukovic",
    "nationality": "Australie",
    "position": "GB"
  },
  {
    "name": "Joe Gauci",
    "nationality": "Australie",
    "position": "GB"
  },
  {
    "name": "Nathaniel Atkinson",
    "nationality": "Australie",
    "position": "DD"
  },
  {
    "name": "Milos Degenek",
    "nationality": "Australie",
    "position": "DC"
  },
  {
    "name": "Harry Souttar",
    "nationality": "Australie",
    "position": "DC"
  },
  {
    "name": "Kye Rowles",
    "nationality": "Australie",
    "position": "DC"
  },
  {
    "name": "Aziz Behich",
    "nationality": "Australie",
    "position": "DG"
  },
  {
    "name": "Joel King",
    "nationality": "Australie",
    "position": "DG"
  },
  {
    "name": "Bailey Wright",
    "nationality": "Australie",
    "position": "DC"
  },
  {
    "name": "Aaron Mooy",
    "nationality": "Australie",
    "position": "MC"
  },
  {
    "name": "Jackson Irvine",
    "nationality": "Australie",
    "position": "MC"
  },
  {
    "name": "Riley McGree",
    "nationality": "Australie",
    "position": "MC"
  },
  {
    "name": "Ajdin Hrustic",
    "nationality": "Australie",
    "position": "MC"
  },
  {
    "name": "Keanu Baccus",
    "nationality": "Australie",
    "position": "MC"
  },
  {
    "name": "Connor Metcalfe",
    "nationality": "Australie",
    "position": "MC"
  },
  {
    "name": "Mathew Leckie",
    "nationality": "Australie",
    "position": "AD"
  },
  {
    "name": "Craig Goodwin",
    "nationality": "Australie",
    "position": "AG"
  },
  {
    "name": "Martin Boyle",
    "nationality": "Australie",
    "position": "AD"
  },
  {
    "name": "Awer Mabil",
    "nationality": "Australie",
    "position": "AG"
  },
  {
    "name": "Mitchell Duke",
    "nationality": "Australie",
    "position": "ATT"
  },
  {
    "name": "Adam Taggart",
    "nationality": "Australie",
    "position": "ATT"
  },
  {
    "name": "Jamie Maclaren",
    "nationality": "Australie",
    "position": "ATT"
  },
  {
    "name": "Brandon Borrello",
    "nationality": "Australie",
    "position": "ATT"
  },
  {
    "name": "Cameron Devlin",
    "nationality": "Australie",
    "position": "MC"
  },
  {
    "name": "Wojciech Szczęsny",
    "nationality": "Pologne",
    "position": "GB"
  },
  {
    "name": "Łukasz Skorupski",
    "nationality": "Pologne",
    "position": "GB"
  },
  {
    "name": "Kamil Grabara",
    "nationality": "Pologne",
    "position": "GB"
  },
  {
    "name": "Matty Cash",
    "nationality": "Pologne",
    "position": "DD"
  },
  {
    "name": "Bartosz Bereszyński",
    "nationality": "Pologne",
    "position": "DD"
  },
  {
    "name": "Jan Bednarek",
    "nationality": "Pologne",
    "position": "DC"
  },
  {
    "name": "Jakub Kiwior",
    "nationality": "Pologne",
    "position": "DC"
  },
  {
    "name": "Paweł Dawidowicz",
    "nationality": "Pologne",
    "position": "DC"
  },
  {
    "name": "Tymoteusz Puchacz",
    "nationality": "Pologne",
    "position": "DG"
  },
  {
    "name": "Robert Gumny",
    "nationality": "Pologne",
    "position": "DD"
  },
  {
    "name": "Grzegorz Krychowiak",
    "nationality": "Pologne",
    "position": "MDC"
  },
  {
    "name": "Piotr Zielinski",
    "nationality": "Pologne",
    "position": "MC"
  },
  {
    "name": "Przemysław Frankowski",
    "nationality": "Pologne",
    "position": "MC"
  },
  {
    "name": "Jakub Moder",
    "nationality": "Pologne",
    "position": "MC"
  },
  {
    "name": "Szymon Żurkowski",
    "nationality": "Pologne",
    "position": "MC"
  },
  {
    "name": "Sebastian Szymański",
    "nationality": "Pologne",
    "position": "MO"
  },
  {
    "name": "Robert Lewandowski",
    "nationality": "Pologne",
    "position": "ATT"
  },
  {
    "name": "Krzysztof Piątek",
    "nationality": "Pologne",
    "position": "ATT"
  },
  {
    "name": "Karol Świderski",
    "nationality": "Pologne",
    "position": "ATT"
  },
  {
    "name": "Kamil Grosicki",
    "nationality": "Pologne",
    "position": "AG"
  },
  {
    "name": "Arkadiusz Milik",
    "nationality": "Pologne",
    "position": "ATT"
  },
  {
    "name": "Bartosz Slisz",
    "nationality": "Pologne",
    "position": "MC"
  },
  {
    "name": "Nicola Zalewski",
    "nationality": "Pologne",
    "position": "AG"
  },
  {
    "name": "Michał Skóraś",
    "nationality": "Pologne",
    "position": "AD"
  },
  {
    "name": "Dawid Kownacki",
    "nationality": "Pologne",
    "position": "ATT"
  },
  {
    "name": "Kasper Schmeichel",
    "nationality": "Danemark",
    "position": "GB"
  },
  {
    "name": "Frederik Rønnow",
    "nationality": "Danemark",
    "position": "GB"
  },
  {
    "name": "Joakim Mæhle",
    "nationality": "Danemark",
    "position": "DD"
  },
  {
    "name": "Daniel Wass",
    "nationality": "Danemark",
    "position": "DD"
  },
  {
    "name": "Andreas Christensen",
    "nationality": "Danemark",
    "position": "DC"
  },
  {
    "name": "Simon Kjær",
    "nationality": "Danemark",
    "position": "DC"
  },
  {
    "name": "Joachim Andersen",
    "nationality": "Danemark",
    "position": "DC"
  },
  {
    "name": "Victor Nelsson",
    "nationality": "Danemark",
    "position": "DC"
  },
  {
    "name": "Jens Stryger Larsen",
    "nationality": "Danemark",
    "position": "DG"
  },
  {
    "name": "Nicolai Boilesen",
    "nationality": "Danemark",
    "position": "DG"
  },
  {
    "name": "Thomas Delaney",
    "nationality": "Danemark",
    "position": "MDC"
  },
  {
    "name": "Christian Eriksen",
    "nationality": "Danemark",
    "position": "MO"
  },
  {
    "name": "Pierre-Emile Højbjerg",
    "nationality": "Danemark",
    "position": "MDC"
  },
  {
    "name": "Mathias Jensen",
    "nationality": "Danemark",
    "position": "MC"
  },
  {
    "name": "Andreas Skov Olsen",
    "nationality": "Danemark",
    "position": "AD"
  },
  {
    "name": "Mikkel Damsgaard",
    "nationality": "Danemark",
    "position": "MO"
  },
  {
    "name": "Jesper Lindstrøm",
    "nationality": "Danemark",
    "position": "MO"
  },
  {
    "name": "Rasmus Højlund",
    "nationality": "Danemark",
    "position": "ATT"
  },
  {
    "name": "Jonas Wind",
    "nationality": "Danemark",
    "position": "ATT"
  },
  {
    "name": "Kasper Dolberg",
    "nationality": "Danemark",
    "position": "ATT"
  },
  {
    "name": "Yussuf Poulsen",
    "nationality": "Danemark",
    "position": "ATT"
  },
  {
    "name": "Martin Braithwaite",
    "nationality": "Danemark",
    "position": "ATT"
  },
  {
    "name": "Aymen Dahmen",
    "nationality": "Tunisie",
    "position": "GB"
  },
  {
    "name": "Farouk Ben Mustapha",
    "nationality": "Tunisie",
    "position": "GB"
  },
  {
    "name": "Mouez Hassan",
    "nationality": "Tunisie",
    "position": "GB"
  },
  {
    "name": "Wajdi Kechrida",
    "nationality": "Tunisie",
    "position": "DD"
  },
  {
    "name": "Dylan Bronn",
    "nationality": "Tunisie",
    "position": "DC"
  },
  {
    "name": "Montassar Talbi",
    "nationality": "Tunisie",
    "position": "DC"
  },
  {
    "name": "Mohamed Drager",
    "nationality": "Tunisie",
    "position": "DD"
  },
  {
    "name": "Nader Ghandri",
    "nationality": "Tunisie",
    "position": "DC"
  },
  {
    "name": "Ali Maaloul",
    "nationality": "Tunisie",
    "position": "DG"
  },
  {
    "name": "Hannibal Mejbri",
    "nationality": "Tunisie",
    "position": "MC"
  },
  {
    "name": "Anis Slimane",
    "nationality": "Tunisie",
    "position": "MC"
  },
  {
    "name": "Ellyes Skhiri",
    "nationality": "Tunisie",
    "position": "MDC"
  },
  {
    "name": "Ferjani Sassi",
    "nationality": "Tunisie",
    "position": "MC"
  },
  {
    "name": "Mohamed Ali Ben Romdhane",
    "nationality": "Tunisie",
    "position": "MC"
  },
  {
    "name": "Naïm Sliti",
    "nationality": "Tunisie",
    "position": "MO"
  },
  {
    "name": "Taha Yassine Khenissi",
    "nationality": "Tunisie",
    "position": "ATT"
  },
  {
    "name": "Seifeddine Jaziri",
    "nationality": "Tunisie",
    "position": "ATT"
  },
  {
    "name": "Issam Jebali",
    "nationality": "Tunisie",
    "position": "ATT"
  },
  {
    "name": "Youssef Msakni",
    "nationality": "Tunisie",
    "position": "MO"
  },
  {
    "name": "Saîf-Eddine Khaoui",
    "nationality": "Tunisie",
    "position": "MO"
  },
  {
    "name": "Ørjan Nyland",
    "nationality": "Norvège",
    "position": "GB"
  },
  {
    "name": "Rune Almenning Jarstein",
    "nationality": "Norvège",
    "position": "GB"
  },
  {
    "name": "Erling Haaland",
    "nationality": "Norvège",
    "position": "ATT"
  },
  {
    "name": "Martin Ødegaard",
    "nationality": "Norvège",
    "position": "MO"
  },
  {
    "name": "Alexander Sørloth",
    "nationality": "Norvège",
    "position": "ATT"
  },
  {
    "name": "Joshua King",
    "nationality": "Norvège",
    "position": "ATT"
  },
  {
    "name": "Mohamed Elyounoussi",
    "nationality": "Norvège",
    "position": "AG"
  },
  {
    "name": "Sander Berge",
    "nationality": "Norvège",
    "position": "MC"
  },
  {
    "name": "Stefan Strandberg",
    "nationality": "Norvège",
    "position": "DC"
  },
  {
    "name": "Omar Elabdellaoui",
    "nationality": "Norvège",
    "position": "DD"
  },
  {
    "name": "Birger Meling",
    "nationality": "Norvège",
    "position": "DG"
  },
  {
    "name": "André Onana",
    "nationality": "Cameroun",
    "position": "GB"
  },
  {
    "name": "Simon Ngapandouetnbu",
    "nationality": "Cameroun",
    "position": "GB"
  },
  {
    "name": "Fabrice Ondoa",
    "nationality": "Cameroun",
    "position": "GB"
  },
  {
    "name": "Collins Fai",
    "nationality": "Cameroun",
    "position": "DD"
  },
  {
    "name": "Jean-Charles Castelletto",
    "nationality": "Cameroun",
    "position": "DC"
  },
  {
    "name": "Olivier Mbaizo",
    "nationality": "Cameroun",
    "position": "DD"
  },
  {
    "name": "Nouhou Tolo",
    "nationality": "Cameroun",
    "position": "DG"
  },
  {
    "name": "Michael Ngadeu-Ngadjui",
    "nationality": "Cameroun",
    "position": "DC"
  },
  {
    "name": "Harold Moukoudi",
    "nationality": "Cameroun",
    "position": "DC"
  },
  {
    "name": "Pierre Kunde Malong",
    "nationality": "Cameroun",
    "position": "MC"
  },
  {
    "name": "Samuel Oum Gouet",
    "nationality": "Cameroun",
    "position": "MC"
  },
  {
    "name": "André-Frank Zambo Anguissa",
    "nationality": "Cameroun",
    "position": "MC"
  },
  {
    "name": "Martin Hongla",
    "nationality": "Cameroun",
    "position": "MC"
  },
  {
    "name": "Stéphane Bahoken",
    "nationality": "Cameroun",
    "position": "ATT"
  },
  {
    "name": "Karl Toko Ekambi",
    "nationality": "Cameroun",
    "position": "ATT"
  },
  {
    "name": "Vincent Aboubakar",
    "nationality": "Cameroun",
    "position": "ATT"
  },
  {
    "name": "Eric Maxim Choupo-Moting",
    "nationality": "Cameroun",
    "position": "ATT"
  },
  {
    "name": "Bryan Mbeumo",
    "nationality": "Cameroun",
    "position": "AD"
  },
  {
    "name": "Léandre Tawamba",
    "nationality": "Cameroun",
    "position": "ATT"
  },
  {
    "name": "Nicolas Nkoulou",
    "nationality": "Cameroun",
    "position": "DC"
  },
  {
    "name": "Moumi Ngamaleu",
    "nationality": "Cameroun",
    "position": "MO"
  },
  {
    "name": "Gaëtan Bong",
    "nationality": "Cameroun",
    "position": "DG"
  },
  {
    "name": "Predrag Rajkovic",
    "nationality": "Serbie",
    "position": "GB"
  },
  {
    "name": "Marko Dmitrovic",
    "nationality": "Serbie",
    "position": "GB"
  },
  {
    "name": "Vanja Milinkovic-Savic",
    "nationality": "Serbie",
    "position": "GB"
  },
  {
    "name": "Nikola Milenkovic",
    "nationality": "Serbie",
    "position": "DC"
  },
  {
    "name": "Stefan Mitrovic",
    "nationality": "Serbie",
    "position": "DC"
  },
  {
    "name": "Strahinja Pavlovic",
    "nationality": "Serbie",
    "position": "DC"
  },
  {
    "name": "Milos Veljkovic",
    "nationality": "Serbie",
    "position": "DC"
  },
  {
    "name": "Filip Mladenovic",
    "nationality": "Serbie",
    "position": "DG"
  },
  {
    "name": "Andrija Zivkovic",
    "nationality": "Serbie",
    "position": "AD"
  },
  {
    "name": "Sergej Milinkovic-Savic",
    "nationality": "Serbie",
    "position": "MC"
  },
  {
    "name": "Nemanja Matic",
    "nationality": "Serbie",
    "position": "MDC"
  },
  {
    "name": "Ivan Ilic",
    "nationality": "Serbie",
    "position": "MC"
  },
  {
    "name": "Sasa Lukic",
    "nationality": "Serbie",
    "position": "MC"
  },
  {
    "name": "Luka Jovic",
    "nationality": "Serbie",
    "position": "ATT"
  },
  {
    "name": "Dusan Vlahovic",
    "nationality": "Serbie",
    "position": "ATT"
  },
  {
    "name": "Aleksandar Mitrovic",
    "nationality": "Serbie",
    "position": "ATT"
  },
  {
    "name": "Filip Kostic",
    "nationality": "Serbie",
    "position": "AG"
  },
  {
    "name": "Nemanja Maksimovic",
    "nationality": "Serbie",
    "position": "MC"
  },
  {
    "name": "Lawrence Ati-Zigi",
    "nationality": "Ghana",
    "position": "GB"
  },
  {
    "name": "Ibrahim Danlad",
    "nationality": "Ghana",
    "position": "GB"
  },
  {
    "name": "Abdul Manaf Nurudeen",
    "nationality": "Ghana",
    "position": "GB"
  },
  {
    "name": "Daniel Amartey",
    "nationality": "Ghana",
    "position": "DC"
  },
  {
    "name": "Alexander Djiku",
    "nationality": "Ghana",
    "position": "DC"
  },
  {
    "name": "Tariq Lamptey",
    "nationality": "Ghana",
    "position": "DD"
  },
  {
    "name": "Baba Rahman",
    "nationality": "Ghana",
    "position": "DG"
  },
  {
    "name": "Joseph Aidoo",
    "nationality": "Ghana",
    "position": "DC"
  },
  {
    "name": "Denis Odoi",
    "nationality": "Ghana",
    "position": "DD"
  },
  {
    "name": "Thomas Partey",
    "nationality": "Ghana",
    "position": "MDC"
  },
  {
    "name": "Iddrisu Baba",
    "nationality": "Ghana",
    "position": "MC"
  },
  {
    "name": "Daniel-Kofi Kyereh",
    "nationality": "Ghana",
    "position": "MC"
  },
  {
    "name": "André Ayew",
    "nationality": "Ghana",
    "position": "MO"
  },
  {
    "name": "Jordan Ayew",
    "nationality": "Ghana",
    "position": "ATT"
  },
  {
    "name": "Inaki Williams",
    "nationality": "Ghana",
    "position": "ATT"
  },
  {
    "name": "Mohammed Kudus",
    "nationality": "Ghana",
    "position": "MO"
  },
  {
    "name": "Antoine Semenyo",
    "nationality": "Ghana",
    "position": "ATT"
  },
  {
    "name": "Ernest Nuamah",
    "nationality": "Ghana",
    "position": "AD"
  },
  {
    "name": "Jonah Osabutey",
    "nationality": "Ghana",
    "position": "ATT"
  },
  {
    "name": "Felix Afena-Gyan",
    "nationality": "Ghana",
    "position": "ATT"
  },
  {
    "name": "Hernán Galíndez",
    "nationality": "Équateur",
    "position": "GB"
  },
  {
    "name": "Alexander Domínguez",
    "nationality": "Équateur",
    "position": "GB"
  },
  {
    "name": "Moisés Ramírez",
    "nationality": "Équateur",
    "position": "GB"
  },
  {
    "name": "Angelo Preciado",
    "nationality": "Équateur",
    "position": "DD"
  },
  {
    "name": "Piero Hincapié",
    "nationality": "Équateur",
    "position": "DG"
  },
  {
    "name": "Robert Arboleda",
    "nationality": "Équateur",
    "position": "DC"
  },
  {
    "name": "Xavier Arreaga",
    "nationality": "Équateur",
    "position": "DC"
  },
  {
    "name": "Williams Pacho",
    "nationality": "Équateur",
    "position": "DC"
  },
  {
    "name": "Diego Palacios",
    "nationality": "Équateur",
    "position": "DG"
  },
  {
    "name": "Carlos Gruezo",
    "nationality": "Équateur",
    "position": "MC"
  },
  {
    "name": "Moisés Caicedo",
    "nationality": "Équateur",
    "position": "MDC"
  },
  {
    "name": "Jhegson Méndez",
    "nationality": "Équateur",
    "position": "MC"
  },
  {
    "name": "José Cifuentes",
    "nationality": "Équateur",
    "position": "MC"
  },
  {
    "name": "Romario Ibarra",
    "nationality": "Équateur",
    "position": "AD"
  },
  {
    "name": "Jeremy Sarmiento",
    "nationality": "Équateur",
    "position": "AG"
  },
  {
    "name": "Ángel Mena",
    "nationality": "Équateur",
    "position": "ATT"
  },
  {
    "name": "Enner Valencia",
    "nationality": "Équateur",
    "position": "ATT"
  },
  {
    "name": "Michael Estrada",
    "nationality": "Équateur",
    "position": "ATT"
  },
  {
    "name": "Jordy Caicedo",
    "nationality": "Équateur",
    "position": "ATT"
  },
  {
    "name": "Leonardo Campana",
    "nationality": "Équateur",
    "position": "ATT"
  },
  {
    "name": "David Ospina",
    "nationality": "Colombie",
    "position": "GB"
  },
  {
    "name": "Camilo Vargas",
    "nationality": "Colombie",
    "position": "GB"
  },
  {
    "name": "Álvaro Montero",
    "nationality": "Colombie",
    "position": "GB"
  },
  {
    "name": "Santiago Arias",
    "nationality": "Colombie",
    "position": "DD"
  },
  {
    "name": "Daniel Muñoz",
    "nationality": "Colombie",
    "position": "DD"
  },
  {
    "name": "Dávinson Sánchez",
    "nationality": "Colombie",
    "position": "DC"
  },
  {
    "name": "Jhon Lucumí",
    "nationality": "Colombie",
    "position": "DC"
  },
  {
    "name": "Yerry Mina",
    "nationality": "Colombie",
    "position": "DC"
  },
  {
    "name": "Johan Mojica",
    "nationality": "Colombie",
    "position": "DG"
  },
  {
    "name": "Jordi Alba",
    "nationality": "Colombie",
    "position": "DG"
  },
  {
    "name": "Wilmar Barrios",
    "nationality": "Colombie",
    "position": "MDC"
  },
  {
    "name": "Matheus Uribe",
    "nationality": "Colombie",
    "position": "MC"
  },
  {
    "name": "Juan Cuadrado",
    "nationality": "Colombie",
    "position": "AD"
  },
  {
    "name": "James Rodríguez",
    "nationality": "Colombie",
    "position": "MO"
  },
  {
    "name": "Sebastián Villarreal",
    "nationality": "Colombie",
    "position": "MC"
  },
  {
    "name": "Luis Díaz",
    "nationality": "Colombie",
    "position": "AG"
  },
  {
    "name": "Rafael Santos Borré",
    "nationality": "Colombie",
    "position": "ATT"
  },
  {
    "name": "Duván Zapata",
    "nationality": "Colombie",
    "position": "ATT"
  },
  {
    "name": "Falcao",
    "nationality": "Colombie",
    "position": "ATT"
  },
  {
    "name": "Jhon Córdoba",
    "nationality": "Colombie",
    "position": "ATT"
  },
  {
    "name": "Miguel Ángel Borja",
    "nationality": "Colombie",
    "position": "ATT"
  },
  {
    "name": "Cucho Hernández",
    "nationality": "Colombie",
    "position": "ATT"
  },
  {
    "name": "Eder Álvarez Balanta",
    "nationality": "Colombie",
    "position": "DC"
  }
]

function normalize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, '').trim()
}

export function validatePlayer({ playerName, team, usedPlayers }) {
  const input = normalize(playerName)
  const match = PLAYERS.find(p => {
    const n = normalize(p.name)
    const parts = p.name.split(' ')
    const lastName = normalize(parts[parts.length - 1])
    return n === input || n.includes(input) || (input.length > 3 && lastName === input)
  })
  if (!match) return { valid: false, reason: `"${playerName}" n'a pas participé à la CDM 2026 ou est inconnu.` }
  if (usedPlayers.some(u => normalize(u) === normalize(match.name))) return { valid: false, reason: `${match.name} est déjà pris.` }
  const natCount = {}
  team.forEach(e => { natCount[e.nationality] = (natCount[e.nationality] || 0) + 1 })
  if ((natCount[match.nationality] || 0) >= 2) return { valid: false, reason: `Tu as déjà 2 joueurs de ${match.nationality}.` }
  return { valid: true, name: match.name, nationality: match.nationality, position: match.position }
}
