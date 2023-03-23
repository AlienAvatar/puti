import CusHeader from "./CusHeader";
import CusFooter from "./CusFooter";
import { Layout } from 'antd';

export default function CusLayout({ children }) {


    return (
        <Layout>
            {/* 自定义头部 prop = {data : ..., isLogin : ...}*/}
            <CusHeader />
        
            {/* Body */}
            <main className="flex-shrink-0 flex-grow items-center lg:flex">
                {children}
            </main>
        
            <CusFooter />
        
        </Layout>
    )
}