import axios from "axios";

const API_URL = "http://localhost:3001/api/authors";

// GET - Recupera tutti gli autori
export const getAuthors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero degli autori:", error);
    throw error;
  }
};

// GET - Recupera un autore per ID
export const getAuthorById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero dell'autore:", error);
    throw error;
  }
};

// POST - Crea un nuovo autore
export const createAuthor = async (authorData) => {
  try {
    const response = await axios.post(API_URL, authorData);
    return response.data;
  } catch (error) {
    console.error("Errore nella creazione dell'autore:", error);
    throw error;
  }
};

// PUT - Aggiorna un autore
export const updateAuthor = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Errore nell'aggiornamento dell'autore:", error);
    throw error;
  }
};

//  DELETE - Elimina un autore
export const deleteAuthor = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Errore nell'eliminazione dell'autore:", error);
    throw error;
  }
};
