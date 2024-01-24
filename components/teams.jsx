import styles from './counters.module.css'
import useSWR from 'swr'
import { Link } from 'nextra-theme-docs';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Teams() {
    const { data, error } = useSWR('/api/getteams', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    if (data?.teams?.length) return (
        <div>
            <p>{data.teams.length} Teams</p>
            <ul className={styles.uList}>
                {data.teams.map(t => (<li key={t.name}><Link href={t.url}>{t.name}</Link></li>))}
            </ul>
        </div>
    )
    return 'Sign in to see your teams';
}