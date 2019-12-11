import React, { Fragment, useEffect, useState, useContext } from "react";

import {
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Link,
  Typography
} from "@material-ui/core";

import auth from "../firebase";
import { AuthContext } from "./Auth";

const Signup = (props: any) => {
  const { currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    currentUser && props.history.push("/");
  }, [currentUser]);

  return (
    <Fragment>
      <Container>
        <Grid container>
          <Grid item md={4}></Grid>
          <Grid item md={4}>
            <FormControl margin="normal" fullWidth>
              <TextField
                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                name="email"
                label="E-mail"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                name="password"
                label="Password"
                fullWidth
                variant="outlined"
                type="password"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <Button
                fullWidth
                onClick={async event => {
                  try {
                    await auth.createUserWithEmailAndPassword(email, password);
                    // (firebase.auth()).sendSignInLinkToEmail(email, actionCodeSettings); このタイミングで認証メールを送ることも可能
                    props.history.push("/login");
                  } catch (error) {
                    alert(error.message);
                  }
                }}
                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              >
                Sign up
              </Button>
              <Typography align="center">
                <Link href="/login">to login</Link>
              </Typography>
            </FormControl>
          </Grid>
          <Grid item md={4}></Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Signup;
