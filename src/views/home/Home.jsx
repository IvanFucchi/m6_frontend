import React, { useState, useEffect } from "react";
import { getAuthors } from "../../services/authorsService";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";

const Home = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authors = await getAuthors();
        setAuthors(authors);
      } catch (error) {
        console.error("Errore nel recupero degli autori:", error);
      }
    };
    fetchAuthors();
  }, []);

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      {/* Passiamo i dati al componente */}
      <BlogList authors={authors} />
    </Container>
  );
};

export default Home;

