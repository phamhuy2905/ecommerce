import SideBar from "../SideBar";
import Main from "../Main";
import Header from "../Header";
import SideBarContextProvider from "../../context/sidebar.context";
import DarkModeContextProvider from "../../context/darkMode.context";
function DefaultLayoutAdmin({ children }: { children: React.ReactNode }) {
    return (
        <DarkModeContextProvider>
            <SideBarContextProvider>
                <SideBar />
                <Main>
                    <Header img="https://a0.muscache.com/im/pictures/235d56fe-4241-4267-a24c-c70fdb4f8711.jpg?im_w=720"></Header>
                    <div className="mx-5  mt-7">{children}</div>
                </Main>
            </SideBarContextProvider>
        </DarkModeContextProvider>
    );
}

export default DefaultLayoutAdmin;
