import { Header } from '../components/Header.jsx';
import HomeFavicon from '../assets/images/home-favicon.png';
import './NotFoundPage.css';

export function NotFoundPage({ cart }) {
    return (
        <>
            <title>404 Error: Page Not Found</title>
            <link rel="icon" type="image/svg+xml" href={HomeFavicon} />

            <Header cart={cart} />

            <div className="not-found-message">
                Page not found
            </div>
        </>
    );
}