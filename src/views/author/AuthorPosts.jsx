import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostsByAuthor } from "../../services/blogPostsService";
import BlogItem from "../../components/blog/blog-item/BlogItem";
import { Row, Col, Container } from "react-bootstrap";

const AuthorPosts = () => {
  const { authorEmail } = useParams(); // L'email arriva dalla URL
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Recupera i post dell'autore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Recupero post per l'autore:", authorEmail);
        const data = await getPostsByAuthor(encodeURIComponent(authorEmail));
        console.log("Post recuperati:", data);
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Errore nel recupero dei post:", error.message);
      }
    };
    fetchPosts();
  }, [authorEmail]);

  if (loading) {
    return <div>Caricamento...</div>;
  }

  return (
    <Container className="mt-4">
      <h2>Post di {authorEmail}</h2>
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
          <p>Nessun post trovato per questo autore.</p>
        )}
      </Row>
    </Container>
  );
};

export default AuthorPosts;
