import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import SignUp from "./pages/SignUp"
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
                    path='/signup'
                    element={
                        <Layout>
                            <SignUp />
                        </Layout>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
