import React, { useState, useEffect } from "react";
import { getAuthors } from "../../services/authorsService";
import { getBlogPosts } from "../../services/blogPostsService";
import { Container, Row, Col } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import AuthorsList from "../../components/blog/blog-list/AuthorsList";
import "./styles.css";

const Home = () => {
  // Stato per autori e blog post
  const [authors, setAuthors] = useState([]);
  const [posts, setPosts] = useState([]);

  // Recupero degli autori
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authors = await getAuthors();
        console.log("Autori ricevuti:", authors);
        setAuthors(authors);
      } catch (error) {
        console.error("Errore nel recupero degli autori:", error);
      }
    };
    fetchAuthors();
  }, []);

  // Recupero dei post
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getBlogPosts();
        console.log("Post ricevuti:", posts);
        setPosts(posts);
      } catch (error) {
        console.error("Errore nel recupero dei post:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      
      <Row>
        <Col md={4}>
          <h2>Lista Autori</h2>
          <AuthorsList authors={authors} />
        </Col>
        <Col md={8}>
          <h2>Lista Blog Post</h2>
          <BlogList posts={posts} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
