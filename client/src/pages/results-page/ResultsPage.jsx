import NavbarWithLink from "../../components/navbars/NavbarWithLink/NavbarWithLink";
import ResultTable from '../../components/result-table/ResultTable';
import Footer from '../../components/footer/Footer'
import { Container } from "react-bootstrap";
import './ResultsPage.css';

function ResultsPage() {
    return (
        <>
            <Container
                fluid
                className="d-flex flex-column min-vh-100"
            >
                <NavbarWithLink type={'results'}/>

                {/* Takes up all available space */}
                <main className="result-table-main flex-grow-1 d-flex">
                    <ResultTable />
                </main>

                
                <Footer />
            </Container>
        </>
    );
}

export default ResultsPage;