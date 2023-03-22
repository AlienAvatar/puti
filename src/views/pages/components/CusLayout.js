import CusHeader from "./CusHeader";
import CusFooter from "./CusFooter";
import { Layout } from 'antd';
import { useEffect,useContext } from "react";
import store from '../../../store';

export default function CusLayout({ children }) {
    const userData = store.getState().loginReducer.userData;
    const isAuth = store.getState().loginReducer.isAuth;

    return (
        <Layout>
            {/* 自定义头部 prop = {data : ..., isLogin : ...}*/}
            <CusHeader userData = {userData} isAuth = {isAuth}/>
        
            {/* Body */}
            <main className="flex-shrink-0 flex-grow items-center lg:flex">
                {children}
            </main>
        
            <CusFooter />
        
        </Layout>
    )
}