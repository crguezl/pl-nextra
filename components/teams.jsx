import styles from './counters.module.css'
import useSWR from 'swr'
import { Link } from 'nextra-theme-docs';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Teams() {
    const key = '/api/getteams';
    const options = { refreshInterval: 10000 };
    //const { data, error } = useSWR('/api/getteams', fetcher)
    try {
        const { data, isLoading, error } = useSWR(key, fetcher, options);

        if (error) return <div>Failed to load {error}</div>
        if (isLoading || !data) return <div>Loading...</div>
    
        if (data?.teams?.length) return (
            <div>
                <p>{data.teams.length} Teams</p>
                <ul className={styles.uList}>
                    {
                       data.teams.map((t, index) => (
                          <li key={index}>
                              <Link href={t.url}>{t.name}</Link>
                              <span> - </span>
                              <Link href={t.url+"/repositories"}>Repos</Link>
                          </li>)
                    )
                    }
                </ul>
            </div>
        )
    } catch (e) {
        console.error(e)
        return <div>Failed to load {e}</div>
    }
    return <div>Sign in to see your teams</div>;
}