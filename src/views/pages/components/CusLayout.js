import CusHeader from "./CusHeader";
import CusFooter from "./CusFooter";
import { Layout } from 'antd';
import { useEffect,useContext } from "react";

export default function CusLayout({ children, data, isLogin} ) {
    console.log('CusLayout',isLogin);
    
    return (
        <Layout>
            {/* 自定义头部 prop = {data : ..., isLogin : ...}*/}
            <CusHeader data={ data } isLogin={ isLogin }/>
        
            {/* Body */}
            <main className="flex-shrink-0 flex-grow items-center lg:flex">
                {children}
            </main>
        
            <CusFooter />
        
        </Layout>
    )
}