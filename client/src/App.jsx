import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import SignUp from "./pages/SignUp"
import ProtectedRoute from "./Protection/ProtectedRoute"
import SignIn from "./pages/SignIn"
import AddHotel from "./pages/AddHotel"
import MyHotels from "./pages/MyHotels"
import EditHotel from "./pages/EditHotel"
import Search from "./pages/Search"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={
                        <Layout>
                            <p>Home Page</p>
                        </Layout>
                    }
                />
                <Route
                    path='/search'
                    element={
                        <Layout>
                            <Search />
                        </Layout>
                    }
                />
                <Route
                    path='/signup'
                    element={
                        <ProtectedRoute accessBy='unauthorized'>
                            <Layout>
                                <SignUp />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/signin'
                    element={
                        <ProtectedRoute accessBy='unauthorized'>
                            <Layout>
                                <SignIn />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/my-hotels'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <MyHotels />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/add-hotels'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <AddHotel />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/edit-hotel/:id'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <EditHotel />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
