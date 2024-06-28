import CusHeader from "./CusHeader";
import CusFooter from "./CusFooter";
import { Layout } from 'antd';

export default function CusLayout({ children }) {


    return (
        <Layout>
            <CusHeader />
        
            {/* Body */}
            <main className="bg-main flex-shrink-0 flex-grow items-center lg:flex">
                {children}
            </main>
        
            <CusFooter />
        
        </Layout>
    )
}