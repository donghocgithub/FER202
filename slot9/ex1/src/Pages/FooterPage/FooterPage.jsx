import MyFooter from "../../Component/MyFooter/MyFooter";
import "./FooterPage.css";

export default function FooterPage() {
    return (
       <div className="footer">
       <h2 style={{textAlign: "center", maxWidth: 600, margin: "0 auto"}}>
         Movie Management System
       </h2>
       <MyFooter author="VanDong" email="dongtvde180115@fpt.edu.vn" linkGithub="https://github.com/donghocgithub/FER202.git" />
       </div>
    );
}
