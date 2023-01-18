import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { MainScreen } from "../../components/MainScreen";
import { deleteNoteAction, listNotes } from "../../actions/notesAtions";
import { Loading } from "../../components/Loading";
import { ErrorMessage } from "../../components/ErrorMessage";

export const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = noteDelete;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteNoteAction(id));
    }
  };
  console.log(successUpdate);
  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    } else {
      navigate("/mynotes");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  return (
    <MainScreen title={`Welcome back ${userInfo.name}...`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new note
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes
        ?.reverse()
        .filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => (
          <Accordion defaultActiveKey="0">
            <Card style={{ margin: 10 }} key={note._id}>
              <Card.Header style={{ display: "flex", width: "100%" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <Accordion.Header as={Card.Text} variant="link" eventKey="1">
                    {note.title}
                  </Accordion.Header>
                </span>
                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Body eventKey="0">
                <Card.Body>
                  <h4>
                    <Badge variant="success">Category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    {note.content}
                    <footer className="blockquote-footer">
                      <cit title="Sourse Titile">
                        Created on {note.createdAt.substring(0, 10)}
                      </cit>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
};
