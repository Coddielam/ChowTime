import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Landing } from './page';

function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Landing} />
            </Switch>
        </Router>
    )
}

export default AppRouter;