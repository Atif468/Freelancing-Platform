import React from 'react';
import Footer from './components/Footer/Footer.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Add from './pages/Add';
import Message from './pages/Message';
import Messages from './pages/Messages';
import Orders from "./pages/Orders.jsx";
import MyGigs from "./pages/MyGigs";
import Gig from "./pages/Gig";
import Gigs from "./pages/Gigs";
import Home from './pages/Home';
import Pay from './pages/Pay';
import Success from './pages/Success';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import BecomeSeller from './components/becomeSeller/BecomeSeller';
import BecomeSeller2 from './components/becomeSeller2/BecomeSeller2';

function App() {
  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient} key={55}>
        <div className='flex flex-col min-h-screen'>
          <Navbar key={3} />
          <div className='flex-grow'>
            <Outlet key={5454} />
          </div>
          <hr className='my-1.5 h-0.5 border-0.5 border-gray-300' />
          <Footer key={6563} />
        </div>
      </QueryClientProvider>
    )
  }
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/gigs", element: <Gigs /> },
        { path: "gig/:id", element: <Gig /> },
        { path: "/orders", element: <Orders /> },
        { path: "/mygigs", element: <MyGigs /> },
        { path: "/add", element: <Add /> },
        { path: "/messages", element: <Messages /> },
        { path: "/message/:id", element: <Message /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/pay/:id", element: <Pay /> },
        { path: "/success", element: <Success /> },
        { path: "/becomeSeller", element: <BecomeSeller /> },
        { path: "/becomeSeller2", element: <BecomeSeller2 /> },
      ]
    }
  ]);
  
  return (
    <RouterProvider key={1} router={router} />
  );
}

export default App;
