import styles from './navigation.module.scss';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { logout } from './actions';

export async function NavigationComponent() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('user')?.value;
    return(
        <div className={styles.nav}>
            <nav className={`container`}>
                <div className="row">
                    <div className="col-8">
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/search">Search</Link></li>
                        </ul>
                    </div>
                    <div className={`col-4 ${styles['txt-right']}`}>
                        {userId ? renderLogout() : renderLoginAndRegister()}
                    </div>
                </div>
            </nav>
        </div>
    )
}

function renderLoginAndRegister() {
    return(
        <ul>
            <li>
                <Link href="/login">Login</Link>
            </li>
            <li>
                <Link href="/login/register">Register</Link>
            </li>
        </ul>
    )
}

function renderLogout() {
    return(
        <ul>
            <li>
                <a href='#' onClick={logout}>Logout</a>
            </li>
        </ul>
    )
}