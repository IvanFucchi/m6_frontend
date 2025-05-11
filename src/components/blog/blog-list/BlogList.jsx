import React, { useEffect, useState } from "react";
import { getBlogPosts } from "../../../services/blogPostsService";
import BlogItem from "../blog-item/BlogItem";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
// import "./styles.css";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Funzione per recuperare i post con paginazione e filtro
  const fetchPosts = async (page, search = "") => {
    try {
      const data = await getBlogPosts(page, 6, search);
      console.log("Post ricevuti:", data);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Errore nel recupero dei post:", error.message);
    }
  };

  // ✅ Effettua il fetch all'avvio e al cambio di pagina o ricerca
  useEffect(() => {
    fetchPosts(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  // ✅ Funzioni di navigazione
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

  // ✅ Funzione di gestione del campo di ricerca
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Torna alla prima pagina quando si cerca
  };

  return (
    <Container>
      <Form.Group className="my-3">
        <Form.Control
          type="text"
          placeholder="🔍 Cerca un post..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>

      <Row>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Col md={6} lg={4} key={post._id} className="mb-4">
              <BlogItem
                title={post.title}
                cover={post.cover}
                author={{ 
                  name: post.author, 
                  avatar: "https://i.pravatar.cc/150?u=" + post.author 
                }}
                _id={post._id}
              />
            </Col>
          ))
        ) : (
          <p>Nessun post trovato.</p>
        )}
      </Row>

      {/* ✅ Navigazione tra le pagine */}
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

export default BlogList;
