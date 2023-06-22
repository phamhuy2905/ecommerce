import { Props } from "../../types";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function DefaultLayout({ children }: Props) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;
