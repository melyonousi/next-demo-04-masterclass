import { Metadata } from 'next';
import Navbar from '../components/Navbar'

export const metadata: Metadata = {
    title: "Master Class | Dashboard"
};

const DashboardLayout = async ({ children }: any) => {
    return (
        <>
            <Navbar/>
            {children}
        </>
    )
}

export default DashboardLayout

