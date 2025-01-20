import styles from './navigation.module.scss';
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
                            <li><a href="/">Home</a></li>
                            <li><a href="/search">Search</a></li>
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
                <a href="/login">Login</a>
            </li>
            <li>
                <a href="/login/register">Register</a>
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