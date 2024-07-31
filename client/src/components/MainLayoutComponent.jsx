
import { useSelector } from "react-redux"
export default function MainLayoutComponent() {

    const HookPage = useSelector((state) => state.hook.value)

    return (
        <>
            this main lay out {HookPage}
        </>
    )
}