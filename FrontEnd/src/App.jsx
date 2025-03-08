import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {DefaultRoute} from './routes';
import PrivateRoute from './routes/PrivateRoute.jsx';
import './App.css';
import { AuthProvider } from './context/auth/AuthContext.jsx';
import 'react-toastify/dist/ReactToastify.css';
import {NonePage, Wrapper} from "./components";
function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {DefaultRoute.map((route, index) => {

                        const Layout = route.layout || Wrapper;
                        const Page = route.component || NonePage;

                        if (route.roles) {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <PrivateRoute
                                            component={Page}
                                            layout={Layout}
                                            roles={route.roles}
                                        />
                                    }
                                />
                            );
                        }

                        // route public
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page title={route.title} message={route.message} key={index} />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </AuthProvider>
    );
}
export default App;
