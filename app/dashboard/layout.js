import AppSidebar from "../components/layout/AppSidebar"
import MainContainer from "../components/layout/Main"


export default function RootLayout({ children }) {
    return (
        <>
            <div className="flex flex-col md:flex-row">
                <AppSidebar></AppSidebar>
                <MainContainer>{children}</MainContainer>
            </div>
        </>
          
    );
  }