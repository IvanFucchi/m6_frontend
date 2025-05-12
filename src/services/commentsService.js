import axios from "axios";

const API_URL = "http://localhost:3001/api/blogPosts";

// Aggiungi un nuovo commento
export const addComment = async (postId, commentData) => {
  try {
    const response = await axios.post(`${API_URL}/${postId}/comments`, commentData);
    return response.data; // Ritorna l'array aggiornato dei commenti
  } catch (error) {
    console.error("Errore durante l'aggiunta del commento:", error.message);
    throw error;
  }
};

// elimina un commento
export const deleteComment = async (postId, commentId) => {
  try {
    await axios.delete(`${API_URL}/${postId}/comments/${commentId}`);
  } catch (error) {
    console.error("Errore durante l'eliminazione del commento:", error.message);
    throw error;
  }
};
