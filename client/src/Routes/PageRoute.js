

import { Route, Routes, Navigate } from "react-router-dom"
import Billing from "../component/dashboard/Billing"
import Dashboard from "../component/dashboard/Dashboard"
import Employee from "../component/dashboard/Employee"
import Product from "../component/dashboard/Product"
import Production from "../component/dashboard/Production"

const PageRoute = () => {

    return (
        <>
            <Routes>
                <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
                <Route path="/product" element={<AdminRoute><Product /></AdminRoute>} />
                <Route path="/employee" element={<AdminRoute><Employee /></AdminRoute>} />
                <Route path="/production" element={<Production />} />
                <Route path="/billing" element={<AdminRoute><Billing /></AdminRoute>} />
            </Routes>
        </>
    )
}

function AdminRoute({ children }) {
    return localStorage.getItem("type") !== "employee" ? children : <Navigate to="/dashboard/production" />;
}
export default PageRoute