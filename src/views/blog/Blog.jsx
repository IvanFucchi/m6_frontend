import React, { useEffect, useState } from "react";
import { Container, Image, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import {
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} from "../../services/blogPostsService";
import "./styles.css";

const Blog = () => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [tempContent, setTempContent] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  // Recupera il post al caricamento
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

  // Funzione di eliminazione
  const handleDelete = async () => {
    if (window.confirm("Sei sicuro di voler eliminare questo post?")) {
      await deleteBlogPost(blog._id);
      alert("Post eliminato con successo!");
      navigate("/");
    }
  };

  // Funzione di modifica
  const handleSave = async () => {
    const updatedData = { ...blog, content: tempContent };
    await updateBlogPost(blog._id, updatedData);
    alert("Post modificato con successo!");
    setBlog(updatedData);
    setEditMode(false);
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
        </Container>
      </div>
    );
  }
};

export default Blog;