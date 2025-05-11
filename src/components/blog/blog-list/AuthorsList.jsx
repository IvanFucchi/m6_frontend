import React, { useEffect, useState } from "react";
import { getAuthors } from "../../../services/authorsService";
import { ListGroup, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const AuthorsList = () => {
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Funzione per recuperare gli autori con paginazione
  const fetchAuthors = async (page) => {
    try {
      const data = await getAuthors(page, 6); // 6 autori per pagina
      console.log("✅ Autori ricevuti:", data);
      setAuthors(data.authors);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Errore nel recupero degli autori:", error.message);
    }
  };

  // Chiamata API quando cambia la pagina
  useEffect(() => {
    fetchAuthors(currentPage);
  }, [currentPage]);

  // Funzioni di navigazione
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Lista Autori</h2>
      <ListGroup>
        {authors.map((author) => (
          <ListGroup.Item key={author._id}>
            <Link to={`/authors/${author.email}`}>
              <strong>{author.nome} {author.cognome}</strong> - {author.email}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/*Navigazione tra le pagine */}
      <div className="pagination-controls d-flex justify-content-center mt-4">
        <Button
          variant="outline-primary"
          onClick={prevPage}
          disabled={currentPage === 1}
          className="me-2"
        >
          ← Precedente
        </Button>
        <span className="align-self-center">
          Pagina {currentPage} di {totalPages}
        </span>
        <Button
          variant="outline-primary"
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="ms-2"
        >
          Successiva →
        </Button>
      </div>
    </Container>
  );
};

export default AuthorsList;
