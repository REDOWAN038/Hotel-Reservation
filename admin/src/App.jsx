import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import ProtectedRoute from "./Protection/ProtectedRoute"
import SignIn from "./pages/SignIn"
import AddHotel from "./pages/AddHotel"
import MyHotels from "./pages/MyHotels"
import EditHotel from "./pages/EditHotel"
import MyBookings from "./pages/MyBookings"
import CreateRoom from "./pages/CreateRoom"
import MyRooms from "./pages/MyRooms"
import EditRoom from "./pages/EditRoom"
import SignUp from "./pages/SignUp"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path='/admin/signin'
                    element={
                        <ProtectedRoute accessBy='unauthorized'>
                            <Layout>
                                <SignIn />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/admin/signup'
                    element={
                        <ProtectedRoute accessBy='unauthorized'>
                            <Layout>
                                <SignUp />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/admin/my-hotels'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <MyHotels />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/admin/add-hotels'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <AddHotel />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/admin/edit-hotel/:id'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <EditHotel />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/admin/my-bookings'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <MyBookings />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/admin/my-rooms'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <MyRooms />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/admin/create-room'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <CreateRoom />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/admin/edit-room/:id'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Layout>
                                <EditRoom />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
