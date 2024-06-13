import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import SignUp from "./pages/SignUp"
import ProtectedRoute from "./Protection/ProtectedRoute"
import SignIn from "./pages/SignIn"
import AddHotel from "./pages/AddHotel"
import MyHotels from "./pages/MyHotels"
import EditHotel from "./pages/EditHotel"
import Search from "./pages/Search"
import HotelDetails from "./pages/HotelDetails"
import Booking from "./pages/Booking"
import MyBookings from "./pages/MyBookings"
import Home from "./pages/Home"

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
                <Route
                    path='/hotel/booking/:hotelId'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <Booking />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/my-bookings'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <MyBookings />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
