import Header from "../components/Header/Header"
import Sidebar from "../components/Sidebar/Sidebar"


function MainLayout({children}) {
  return (
    <>
      <Sidebar></Sidebar>
      <div className="flex-1 flex flex-col">
        <Header />
        {children}
      </div>
    </>
  )
}

export default MainLayout