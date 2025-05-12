import React, { useEffect, useState } from "react";
import { Container, Image, Button, ListGroup, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import {
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} from "../../services/blogPostsService";
import { addComment, deleteComment } from "../../services/commentsService"; // Servizio per i commenti
import "./styles.css";

const Blog = () => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [tempContent, setTempContent] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  // recupera il post al caricamento
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { id } = params;
        const fetchedBlog = await getBlogPostById(id);

        if (fetchedBlog) {
          setBlog(fetchedBlog);
          setTempContent(fetchedBlog.content);
          setLoading(false);
        } else {
          navigate("/404");
        }
      } catch (error) {
        console.error("Errore nel recupero del post:", error.message);
        navigate("/404");
      }
    };
    fetchBlog();
  }, [params, navigate]);

  // funzione di eliminazione
  const handleDelete = async () => {
    if (window.confirm("Sei sicuro di voler eliminare questo post?")) {
      await deleteBlogPost(blog._id);
      alert("Post eliminato con successo!");
      navigate("/");
    }
  };

  // unzione di modifica
  const handleSave = async () => {
    const updatedData = { ...blog, content: tempContent };
    await updateBlogPost(blog._id, updatedData);
    alert("Post modificato con successo!");
    setBlog(updatedData);
    setEditMode(false);
  };

  // funzione per aggiungere un nuovo commento
  const handleAddComment = async () => {
    if (!newComment || !newAuthor) {
      alert("Compila tutti i campi");
      return;
    }
    const newCommentData = {
      text: newComment,
      author: newAuthor,
    };

    try {
      const updatedComments = await addComment(blog._id, newCommentData);
      setBlog((prev) => ({
        ...prev,
        comments: updatedComments,
      }));
      setNewComment("");
      setNewAuthor("");
    } catch (error) {
      console.error("Errore durante l'aggiunta del commento:", error.message);
    }
  };

  // funzione di eliminazione di un commento
  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Vuoi davvero eliminare questo commento?")) {
      try {
        await deleteComment(blog._id, commentId);
        setBlog((prev) => ({
          ...prev,
          comments: prev.comments.filter((c) => c._id !== commentId),
        }));
      } catch (error) {
        console.error("Errore durante l'eliminazione del commento:", error.message);
      }
    }
  };

  if (loading) {
    return <div>Caricamento...</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor
                name={blog.author}
                avatar={`https://i.pravatar.cc/150?u=${blog.author}`}
              />
            </div>
            <div className="blog-details-info">
              <div>{new Date(blog.createdAt).toLocaleDateString()}</div>
              <div>{`Lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
              <div style={{ marginTop: 20 }}>
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          {/* Modalità di Modifica */}
          {editMode ? (
            <textarea
              value={tempContent}
              onChange={(e) => setTempContent(e.target.value)}
              rows={10}
              className="w-100 my-3"
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />
          )}

          {/* Bottoni di controllo */}
          <div className="d-flex justify-content-between mt-3">
            {!editMode ? (
              <Button variant="warning" onClick={() => setEditMode(true)}>
                Modifica
              </Button>
            ) : (
              <Button variant="success" onClick={handleSave}>
                Salva
              </Button>
            )}
            <Button variant="danger" onClick={handleDelete}>
              Elimina
            </Button>
          </div>

          {/* sezione Commenti */}
          <h3 className="mt-5">Commenti</h3>
          <ListGroup>
            {blog.comments && blog.comments.length > 0 ? (
              blog.comments.map((comment) => (
                <ListGroup.Item key={comment._id} className="d-flex justify-content-between">
                  <div>
                    <strong>{comment.author}</strong>: {comment.text}
                  </div>
                  <Button variant="outline-danger" onClick={() => handleDeleteComment(comment._id)}>
                    Elimina
                  </Button>
                </ListGroup.Item>
              ))
            ) : (
              <p>Nessun commento trovato.</p>
            )}
          </ListGroup>

          {/* form per aggiungere un commento */}
          <Form className="mt-3">
            <Form.Control
              placeholder="Nome Autore"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              className="mb-2"
            />
            <Form.Control
              placeholder="Aggiungi un commento..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2"
            />
            <Button variant="primary" onClick={handleAddComment}>
              Aggiungi Commento
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
};

export default Blog;
