import { Fragment,useEffect } from "react";
import {  Routes, Route,useNavigate } from "react-router-dom";
import Layout from "./layouts/Layout/Layout";
import Chat from "./pages/Chat/Chat";
import { publicRoutes } from "./routers/routes";
function App() {
 
  return (
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const DefaultLayout = route.layout?Layout:Fragment
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayout>
                    <Page />
                   </DefaultLayout>
                }
              />
            );
          })}

        </Routes>
      </div>
  );
}

export default App;
