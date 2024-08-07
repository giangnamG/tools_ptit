
import { useSelector } from "react-redux"
import { useState, useEffect } from 'react';
import SpinnerComponent from './activate/SpinnerComponent';
import ProfileComponent from "./user/ProfileComponent"
import RegistrySubjects from "./user/RegistrySubjects";
import ShowSubjectByMajor from "./activate/ShowSubjectByMajor";

export default function MainLayoutComponent() {

    const { hookName, props } = useSelector((state) => state.hook)
    const [spinner, setSpinner] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setSpinner(false)
        }, 1000);
    }, [spinner])
    useEffect(() => {
        setSpinner(true)
    }, [hookName])
    const MappingComponent = {
        '/#Profile': <ProfileComponent props={props} />,
        '/#dang_ky_tin': <RegistrySubjects props={props} />,
        '/#show_subject': <ShowSubjectByMajor props={props} />,
    }
    const renderComponent = () => {
        return MappingComponent[hookName] ?? <>This is Default</>
    }

    return (
        <div style={{
            maxHeight: '89vh',
            overflowY: 'auto',
            direction: 'rtl',
            flexWrap: 'wrap',
        }}>
            {
                spinner && (
                    <div>
                        <SpinnerComponent />
                    </div>
                )
            }
            <div style={{ direction: 'ltr' }}>
                {renderComponent()}
            </div>
        </div>
    )
}