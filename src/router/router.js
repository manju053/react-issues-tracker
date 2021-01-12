import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import EditCreateIssue from "../components/EditCreateIssue";
import IssuesList from "../components/IssuesList";
import Home from "../pages/Home";
import Login from "../pages/Login";

export const AppRouter = () => {
    return (
     
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route  path="/home">
                    <Home />
                </Route>
            </Switch>
        

    )
}