import Footer from "../components/Footer"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
// import Hero from "../components/Hero"

const Layout = ({ children }) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            {/* <Hero /> */}
            <div className='mx-auto'>
                <SearchBar />
            </div>
            <div className='container mx-auto py-10 flex-1'>{children}</div>
            <Footer />
        </div>
    )
}

export default Layout
