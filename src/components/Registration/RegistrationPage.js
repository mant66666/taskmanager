import { useState } from 'react';
import Registration from './Registration';
import CompanyRegistration from './CompanyRegistration';
export default function RegistrationPage({onBack}) {
    const [currentForm,setCurrentForm]=useState("user");
    if (currentForm=="user"){
        return <Registration setCurrentForm={setCurrentForm} onBack={onBack}/>;
    }
    if (currentForm=="company"){
        return <CompanyRegistration onBack={() => setCurrentForm("user")}/>;
    }
    
}
