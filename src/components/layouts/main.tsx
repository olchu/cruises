import { LayoutProps } from "@/shared/types/pageWithLayouts"

const MainLayout: LayoutProps = ({ children }) => {
  return (
    <div>
      Main: 
      {children}
    </div>
  )
}
export default MainLayout