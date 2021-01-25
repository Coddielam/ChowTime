import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Landing, Menu } from './page';
import Header from './container/Header';

function AppRouter() {
    return (
        <Router>
            <Header></Header>
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/dev' component={Menu} />
            </Switch>
        </Router>
    )
}

export default AppRouter;