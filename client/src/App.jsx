import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import SignUp from "./pages/SignUp"
import ProtectedRoute from "./Protection/ProtectedRoute"
import SignIn from "./pages/SignIn"
import Search from "./pages/Search"
import HotelDetails from "./pages/HotelDetails"
import Booking from "./pages/Booking"
import Home from "./pages/Home"
import AllBookings from "./pages/AllBookings"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={
                        <Layout>
                            <Home />
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
                    path='/detail/:id'
                    element={
                        <Layout>
                            <HotelDetails />
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
                    path='/hotel/booking/:hotelId/:roomId'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <Booking />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/bookings'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <AllBookings />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
