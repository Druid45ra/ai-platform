# AI-Platform Frontend

Acesta este frontend-ul aplicației AI-Platform, construit cu React.

## Configurație

### Dependențe

Asigură-te că ai instalat următoarele dependențe:

- Node.js (versiunea 14.x sau mai nouă)
- npm (versiunea 6.x sau mai nouă)

### Instalare

1. Clonează acest repository:

    ```sh
    git clone https://github.com/Druid45ra/ai-platform.git
    cd ai-platform/frontend
    ```

2. Instalează dependențele:

    ```sh
    npm install
    ```

### Configurare

1. Creează un fișier `.env` în directorul [`frontend`](frontend ) și adaugă următoarele variabile de mediu:

    ```env
    REACT_APP_API_BASE_URL=http://localhost:8000/api
    ```

### Rulare

1. Rulează aplicația în modul de dezvoltare:

    ```sh
    npm start
    ```

    Aplicația va fi disponibilă la [http://localhost:3000](http://localhost:3000).

2. Pentru a construi aplicația pentru producție:

    ```sh
    npm run build
    ```

    Build-ul va fi generat în directorul `build`.

### Structura Proiectului

- `public/`: Conține resurse statice care sunt servite direct de serverul web.
  - `favicon.ico`: Iconița care apare în tab-ul browserului.
  - `index.html`: Fișierul HTML principal care servește ca punct de intrare pentru aplicația React.
  - `manifest.json`: Fișierul de manifest pentru aplicațiile web progresive (PWA).
  - `robots.txt`: Fișierul care oferă instrucțiuni pentru motoarele de căutare despre paginile care ar trebui sau nu ar trebui să fie indexate.
- `src/`: Conține codul principal al aplicației frontend.
  - `components/`: Conține componentele React.
    - `auth/`: Componente pentru autentificare (Login, Register).
    - `dashboard/`: Componente pentru dashboard (Dashboard, ModelCard, Statistics).
    - `models/`: Componente pentru gestionarea modelelor (ModelList, ModelDetails, ModelTraining).
    - `common/`: Componente comune (Navbar, Footer, Loading, ProtectedRoute).
  - `services/`: Conține serviciile pentru apeluri API (api.js, auth.js, models.js).
  - `utils/`: Conține utilitare (constants.js, helpers.js).
  - `App.jsx`: Componenta principală a aplicației.
  - `index.jsx`: Punctul de intrare al aplicației.
- `package.json`: Conține informații despre proiect și dependențele necesare.
- [README.md](http://_vscodecontentref_/2): Documentația proiectului.

### Testare

1. Rulează testele:

    ```sh
    npm test
    ```

### Contribuții

Contribuțiile sunt binevenite! Te rugăm să deschizi un pull request sau să raportezi probleme în secțiunea de issues.

### Licență

Acest proiect este licențiat sub licența MIT. Vezi fișierul LICENSE pentru mai multe detalii.
