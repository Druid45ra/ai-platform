// Funcție pentru a salva un token în localStorage
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Funcție pentru a obține un token din localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Funcție pentru a șterge un token din localStorage
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Funcție pentru a formata datele într-un format mai lizibil
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Funcție pentru a verifica dacă un obiect este gol
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
