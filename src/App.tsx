import {BrowserRouter, Routes, Route} from 'react-router-dom'
import TenantsPage from './pages/TenantsPage'
import MainPage from './pages/MainPage'
import PropertiesPage from "./pages/PropertiesPage.tsx";
import FeaturesPage from "./pages/FeaturesPage.tsx";
import RentalUnitsPage from "./pages/RentalUnits.tsx";
import RentalContracts from "./pages/RentalContracts.tsx";
import PaymentsPage from "./pages/PaymentsPage.tsx";
import MaintenanceRequestsPage from "./pages/MaintenanceRequestsPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/tenants" element={<TenantsPage/>}/>
                <Route path="/properties" element={<PropertiesPage/>}/>
                <Route path="/features" element={<FeaturesPage/>}/>
                <Route path="/rental-units" element={<RentalUnitsPage/>}/>
                <Route path="/rental-contracts" element={<RentalContracts/>}/>
                <Route path="/payments" element={<PaymentsPage/>}/>
                <Route path="/maintenance-requests" element={<MaintenanceRequestsPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
