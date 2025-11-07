import Button from "react-bootstrap/Button";
import "./Footer.css";

function MyFooter({ author, email, linkGithub }) {
  return (
    <footer>
      <p>Author: {author}</p>
      <p>Created by: {email}</p>
      <p>&copy; {new Date().getFullYear()} DongTV. All rights reserved</p>
      <Button variant="link" href={linkGithub} target="_blank" rel="noopener noreferrer">
        My Link Github: {linkGithub}
      </Button>
    </footer>
  );
}
export default MyFooter;
