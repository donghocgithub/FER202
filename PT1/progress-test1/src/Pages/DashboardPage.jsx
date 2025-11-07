
import { Container, Button } from 'react-bootstrap';
import PaymentTable from '../Components/PaymentTable';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../Components/NavigationHeader';
import FilterBar from '../Components/FilterBar';

const DashboardPage = () => {
    const navigate = useNavigate();

    const handleAddPayment = () => {
        navigate('/payments/add');
    };

    return (
        <>
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />
            {/* 2. Main Dashboard Content (Grid và Card) */}
            <Container className="my-4">
                    <div className="d-flex justify-content-end mb-3">
                        <Button variant="success" onClick={handleAddPayment}>Add Payment</Button>
                    </div>
                    <FilterBar />
                    <div className="mt-3">
                        <PaymentTable />
                    </div>
            </Container>
        </>
    );
};

export default DashboardPage;
