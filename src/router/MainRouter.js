import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import EditCreateIssue from "../components/EditCreateIssue";
import IssuesList from "../components/IssuesList";
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import Login from "../pages/Login";

const requireLogin = (to, from, next) => {
    if (to.meta.auth) {
      if (localStorage.getItem('jwtToken')) {
        next();
      }
      next.redirect('/');
    } else {
      next();
    }
  };

export const MainRouter = () => {
    return (
        <Router>
            <GuardProvider guards={[requireLogin]}>
            <Switch>
                <GuardedRoute exact path="/">
                    <Login />
                </GuardedRoute>
                
                <GuardedRoute  path="/home/list" meta={{auth: true}}>
                    <IssuesList />
                </GuardedRoute>
                <GuardedRoute path="/home/create" meta={{auth: true}}>
                    <EditCreateIssue />
                </GuardedRoute>
                <GuardedRoute path="/home/edit/:id" meta={{auth: true}}>
                    <EditCreateIssue />
                </GuardedRoute>

            </Switch>
            </GuardProvider>
            
        </Router>


    )
}
