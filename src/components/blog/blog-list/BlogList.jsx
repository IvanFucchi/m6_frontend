import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const BlogList = ({ authors }) => {
  return (
    <ListGroup>
      {authors.length > 0 ? (
        authors.map((author) => (
          <ListGroup.Item key={author._id}>
            <Link to={`/blog/${author._id}`}>
              <strong>{author.nome} {author.cognome}</strong> - {author.email}
            </Link>
          </ListGroup.Item>
        ))
      ) : (
        <p>Nessun autore trovato.</p>
      )}
    </ListGroup>
  );
};

export default BlogList;
