import { useState, useEffect } from 'react';
import FlipMove from 'react-flip-move';
import { StarFillIcon, RepoForkedIcon} from '@primer/octicons-react'

const Repository = ({ repoData }) => {
const [topRepos, setTopRepos] = useState([]);
//get top repo lists
    const getTopRepos = type => {
    const LIMIT = 8;
    const sortProperty = 'stargazers_count';
    const sorted = repoData
      .filter(repo => !repo.fork)
      .sort((a, b) => b[sortProperty] - a[sortProperty])
      .slice(0, LIMIT);

        setTopRepos(sorted);
  };

  useEffect(() => {
    if (repoData.length) {
        getTopRepos();
    }
  }, []);

    return (
         <div className="repo-list">
          {topRepos.length > 0 ? (
            <FlipMove typeName="ul">
              {topRepos.map(repo => (
                <li key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo">
                    <div className="repo__top">
                      <div className="repo__name">
                        <h3>{repo.name}</h3>
                      </div>
                      <p>{repo.description}</p>
                    </div>
                    <div className="repo__stats">
                      <div className="repo__stats--left">
                        <span>
                          <div
                            className="language"
                          />
                          {repo.language}
                        </span>
                         <span>
                          <StarFillIcon  />
                          {repo.stargazers_count.toLocaleString()}
                        </span>
                        <span>
                          <RepoForkedIcon size={16} />
                          {repo.forks.toLocaleString()}
                        </span>
                      </div>
                      <div className="repo__stats--right">
                        <span>{repo.size.toLocaleString()} KB</span>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </FlipMove>
          ) : (
            <p>No available repositories!</p>
          )}
            </div>
    );
}
 
export default Repository;