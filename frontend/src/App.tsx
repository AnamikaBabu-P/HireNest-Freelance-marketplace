import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//---------Shared----------------//
import Home from './pages/shared/Home';
import Login from './pages/shared/Login';
import Register from './pages/shared/Register';
import OTPVerification from './pages/shared/Otp';
import LayoutWrapper from './components/shared/LayoutWrapper';
import AccountSetup from './pages/shared/accountSetup';

//------------Admin------------------//
import AdminLogin from './pages/admin/Login';
import AdminLayout from './components/admin/adminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageCategories from './pages/admin/CategoryList';
import CategoryForm from './pages/admin/categoryForm';

//--------------Freelancer--------------//
import MyAccount from './pages/shared/MyAccount';
import FreelancerList from './pages/freelancer/freelancerList';
import FreelancerProfile from './pages/freelancer/freelancerProfile';
import FreelancerDetail from './pages/freelancer/freelancerDetail';

//--------------Clients----------------//
import TaskList from './pages/clients/taskList';
import TaskSubmissionForm from './pages/clients/postTask';
import TaskDetail from './pages/clients/taskDetail';


//--------------Others------------------//
import PrivateRoute from './context/adminPrivateRoute';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <>
    <div><Toaster/></div>
    <Router>
      <Routes>
        {/* ---------shared ------------------*/}
        <Route path="/" element={<LayoutWrapper><Home /></LayoutWrapper>} />
        <Route path="/login" element={<LayoutWrapper><Login /></LayoutWrapper>} />
        <Route path="/register" element={<LayoutWrapper><Register /></LayoutWrapper>} />
        <Route path="/otp" element={<LayoutWrapper><OTPVerification /></LayoutWrapper>} />
        <Route path="/account-setup" element={<LayoutWrapper><AccountSetup /></LayoutWrapper>} />
        <Route path="/my-account" element={<LayoutWrapper><MyAccount /></LayoutWrapper>} />

         {/* ---------freelancer--------------- */}
        <Route path="/freelancer/freelancer-profile" element={<LayoutWrapper><FreelancerProfile /></LayoutWrapper>} />
        <Route path="/client/freelancer-list" element={<LayoutWrapper><FreelancerList/></LayoutWrapper>} />
        <Route path="/client/freelancer-detail" element={<LayoutWrapper><FreelancerDetail/></LayoutWrapper>} />
        

         {/* ----------client-------------------*/}
        <Route path="/client/task-form" element={<LayoutWrapper><TaskSubmissionForm/></LayoutWrapper>} />
        <Route path="/freelancer/task-list" element={<LayoutWrapper><TaskList /></LayoutWrapper>} />
        <Route path="/freelancer/task-detail/:id" element={<LayoutWrapper><TaskDetail /></LayoutWrapper>} />

        {/* -----------admin-------------------*/}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminLayout><Dashboard /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/:type" element={<PrivateRoute><AdminLayout><ManageUsers /> </AdminLayout></PrivateRoute>}/>
        <Route path="/admin/categories" element={<PrivateRoute><AdminLayout><ManageCategories /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/categories/new" element={<PrivateRoute><AdminLayout><CategoryForm /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/categories/edit/:id" element={<PrivateRoute><AdminLayout><CategoryForm/></AdminLayout></PrivateRoute>} />

      </Routes>
    </Router>
    </>
  );
};

export default App;
