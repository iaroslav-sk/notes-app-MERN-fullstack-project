import { Button, Col, Form, Row } from "react-bootstrap";
import { MainScreen } from "../../components/MainScreen";
import { ErrorMessage } from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";
import { Loading } from "../../components/Loading";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "image_test_cloud");
      data.append("cloud_name", "iaroslavdev");
      fetch("https://api.cloudinary.com/v1_1/iaroslavdev/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return setPicMessage("Please Selected any Image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile({ name, email, password, pic }));
  };
  console.log(userInfo);
  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row
          className="profileContainer"
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Update Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="name">
                <Form.Label>Name </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Password </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="formFile">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Upload Profile Picture"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={pic}
              alt={name}
              className="profilePic"
              style={{
                width: "400px",
                height: "400px",
              }}
            />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
