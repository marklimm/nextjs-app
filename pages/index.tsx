import styles from './index.module.scss'

const HomePage = () => {
  return (
    <>
      <div className={styles.homePage}>
        <div>
          This is a NextJS app that retrieves data from various data sources
          <ul>
            <li>
              The /events and /devblog routes pull their data from local
              markdown (.md) files
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default HomePage
