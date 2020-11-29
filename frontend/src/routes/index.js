import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import homePage from '../pages/homePage/index';
import redirectPage from '../pages/redirectPage/index';
import statsPage from '../pages/statsPage/index';
import notFoundPage from '../pages/notFoundPage/index';

// teremos rotas para o micro_saas.dominio/  homePage
// micro_saas.dominio/:cod  redirectPage
// micro_saas.dominio/:cod/stats  statspage


function Routes(){

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path= "/" component={homePage}  />
                <Route exact path= "/:cod" component={redirectPage}  />
                <Route exact path= "/:cod/stats" component={statsPage}  />
                <Route exact path= "/*" component={notFoundPage}  />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;