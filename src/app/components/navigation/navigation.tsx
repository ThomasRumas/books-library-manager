import styles from './navigation.module.scss';

export function NavigationComponent() {
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
                        <ul>
                            <li>
                                <a href="/login">Login</a>
                            </li>
                            <li>
                                <a href="/login/register">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}