import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/authContext';
import Layout from './layout';
import Home from './pages/home';
import LogIn from './pages/login';
import Quiz from './pages/quiz';
import Reuslt from './pages/result';
import SingUp from './pages/singup';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

const App = () => (
    <Router>
        <AuthProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route
                        path="/singup"
                        element={
                            <PublicRoute>
                                <SingUp />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <LogIn />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/quiz/:id"
                        element={
                            <PrivateRoute>
                                <Quiz />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/result/:id"
                        element={
                            <PrivateRoute>
                                <Reuslt />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Layout>
        </AuthProvider>
    </Router>
);

export default App;
