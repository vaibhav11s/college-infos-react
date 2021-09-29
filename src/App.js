import { Switch, Route, Redirect } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Layout from "./components/Layout";
import College from "./components/College-profile";
import Student from "./components/Student-profile";
import StudentTable from "./components/StudentTable";
import CollegeTable from "./components/CollegeTable";
import Dashboard from "./components/Dashboard";
import About from "./components/About";

function App() {
  let us = localStorage.getItem("user");
  const [user, setUser] = useState(us);

  const login = async (user = null) => {
    localStorage.setItem("user", user);
    setUser(user);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Layout user={user} logout={logout}>
      <Switch>
        <Route exact path="/login">
          <Login login={login} />
        </Route>
        <Route exact path="/about" component={About} />
        <Route path="/">
          {!user ? (
            <Redirect to="/login" />
          ) : (
            <>
              <Route exact path={["/", "/colleges"]} component={CollegeTable} />
              <Route exact path="/colleges/:id" component={College} />
              <Route exact path="/students/:id" component={Student} />
              <Route exact path="/students" component={StudentTable} />
              <Route exact path="/dashboard" component={Dashboard} />
            </>
          )}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
