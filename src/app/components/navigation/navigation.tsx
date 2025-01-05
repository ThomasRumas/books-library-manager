import styles from './navigation.module.scss';

export function NavigationComponent() {
    return(
        <nav className={styles.nav}>
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="">Search</a></li>
                <li><a href="">Manage</a></li>
            </ul>
            <button className={styles.login}>Login</button>
        </nav>
    )
}