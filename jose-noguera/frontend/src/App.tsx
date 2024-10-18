// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import Home from './pages/Home';
import DetailUser from './pages/DetailUser';
import Navbar from './components/Navbar';
import LeaderBoard from './pages/LeaderBoard';
import History from './pages/History';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  { 
    path: 'detail', 
    element: <DetailUser /> 
  },
  { 
    path: 'leaderboard', 
    element: <LeaderBoard /> 
  },
  {
    path: 'history',
    element: <History />,
  }
]);

function App() {
  
  return (
    <>
      <Navbar />
      <RouterProvider router={Router} />
    </>
  )
}

export default App


// function App() {

//   return (
//     <div className=''>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/detail" element={<DetailUser />} />
//         </Routes>
//       </Router>
//     </ div>
//   )
// }
