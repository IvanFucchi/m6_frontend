import axios from "axios";

const API_URL = "http://localhost:3001/api/blogPosts";

// GET - Recupera i post con paginazione
export const getBlogPosts = async (page = 1, limit = 6, search = "") => {
  try {
    const response = await axios.get(
      `${API_URL}?page=${page}&limit=${limit}&search=${search}`
    );
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero dei BlogPost:", error.message);
    throw error;
  }
};

// GET - Recupera i post di un autore
export const getPostsByAuthor = async (authorEmail) => {
  try {
    const response = await axios.get(`${API_URL}/author/${authorEmail}`);
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero dei post dell'autore:", error.message);
    throw error;
  }
};

// GET - Recupera un post specifico
export const getBlogPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero del BlogPost:", error.message);
    throw error;
  }
};

// POST - Crea un nuovo blog post
export const createBlogPost = async (postData) => {
  try {
    const response = await axios.post(API_URL, postData);
    console.log("Post creato:", response.data);
    return response.data;
  } catch (error) {
    console.error("Errore nella creazione del BlogPost:", error.message);
    throw error;
  }
};
// PUT - Modifica un blog post
export const updateBlogPost = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    console.log("Post modificato:", response.data);
    return response.data;
  } catch (error) {
    console.error("Errore nella modifica del post:", error.message);
    throw error;
  }
};

// DELETE - Elimina un blog post
export const deleteBlogPost = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    console.log("Post eliminato");
  } catch (error) {
    console.error("Errore nell'eliminazione del post:", error.message);
    throw error;
  }
};
