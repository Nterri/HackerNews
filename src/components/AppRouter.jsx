import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import routes from "../router/routes"

const AppRouter = () => {
    return (
        <Switch>
            {routes.map(route =>
                <Route
                    key={route.path}
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
                />
            )}
            <Redirect to="/news"/>
        </Switch>
    );
};

export default AppRouter;