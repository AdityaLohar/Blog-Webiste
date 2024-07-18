/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Route, Routes, useLocation } from 'react-router-dom'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';
import Blogs from './pages/Blogs';
import Publish from './pages/Publish';
// @ts-ignore
import Navbar from './component/Navbar';

function App() {
  const location = useLocation();
  const { pathname } = location;

  // Array of paths where Navbar should not be rendered
  const excludePaths = ['/', '/signin', '/signup'];

  // Check if the current path should exclude Navbar
  const shouldExcludeNavbar = excludePaths.includes(pathname);

  return (
    <>
      {!shouldExcludeNavbar && <Navbar />}
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      {/* </BrowserRouter> */}
    </>
  )
}

export default App