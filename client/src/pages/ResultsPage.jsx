import NavbarWithLink from "../components/navbars/NavbarWithLink/NavbarWithLink";
import ResultTable from '../components/result-table/ResultTable';
import Footer from '../components/footer/Footer'
import { Container } from "react-bootstrap";
function ResultsPage() {
    return (
        <>
            <Container
                fluid
                className="d-flex flex-column min-vh-100"
            >
                {/* occupa solo lo spazio necessario */}
                <div>
                    <NavbarWithLink type={'results'}/>
                </div>

                {/* si espande al massimo */}
                <div className="flex-grow-1 d-flex">
                    <ResultTable />
                </div>

                {/* occupa solo lo spazio necessario */}
                <div>
                    <Footer />
                </div>
            </Container>
        </>
    );
}

export default ResultsPage;