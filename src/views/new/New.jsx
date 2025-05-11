import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import draftToHtml from "draftjs-to-html";
import { useNavigate } from "react-router-dom";
import { createBlogPost } from "../../services/blogPostsService";

const NewBlogPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    cover: "",
    readTime: {
      value: 0,
      unit: "min",
    },
    author: "",
  });

  // Gestione dell'Editor di testo
  const handleEditorChange = useCallback((value) => {
    setFormData((prevState) => ({
      ...prevState,
      content: draftToHtml(value),
    }));
  }, []);

  // Gestione dei campi del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submit del form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBlogPost(formData);
      alert("Post creato con successo!");
      navigate("/"); // Ti riporta alla home
    } catch (error) {
      console.error("Errore nella creazione del post:", error.message);
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Titolo del post"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option disabled value="">
              Seleziona una categoria
            </option>
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-cover" className="mt-3">
          <Form.Label>Immagine di copertina (URL)</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Link dell'immagine"
            name="cover"
            value={formData.cover}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="blog-read-time" className="mt-3">
          <Form.Label>Tempo di Lettura (minuti)</Form.Label>
          <Form.Control
            size="lg"
            type="number"
            placeholder="Tempo di lettura"
            name="value"
            value={formData.readTime.value}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                readTime: { ...prevState.readTime, value: e.target.value },
              }))
            }
          />
        </Form.Group>

        <Form.Group controlId="blog-author" className="mt-3">
          <Form.Label>Email dell'autore</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Email dell'autore"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto del Blog</Form.Label>
          <Editor
            onChange={handleEditorChange}
            className="new-blog-content"
          />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
