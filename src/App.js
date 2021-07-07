import './App.css';
import React, { useEffect, useState } from 'react';
import { Form, Card, Image, Icon, Message } from 'semantic-ui-react';
import Charts from './components/Chart';
import GhPolyglot from 'gh-polyglot';

function App() {
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);

  const [langData, setLangData] = useState(null);
  const [repoData, setRepoData] = useState(null);

  useEffect(() => {
  });
//datas for user profile
  const setData = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url
  }) => {
    setName(name);
    setUsername(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };

  const handleSearch = (e) => {
    if (e.target.value !== "") {
    setUserInput(e.target.value)
    }
  }
  //onsubmit clicked
  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setError(data.message)
        }
        else {
          getLangData();
          getRepoData();
          setData(data);
          setError(null);
        }
      })
  }
  //Getting profile repos
    const getLangData = () => {
    const me = new GhPolyglot(`${userInput}`);
    me.userStats((err, stats) => {
      if (err) {
        console.error('Error:', err);
        setError({ active: true, type: 400 });
      }
      setLangData(stats);
    });
    };
  //Get repo data
    const getRepoData = () => {
    fetch(`https://api.github.com/users/${userInput}/repos?per_page=100`)
      .then(response => {
        if (response.status === 404) {
          return setError({ active: true, type: 404 });
        }
        if (response.status === 403) {
          return setError({ active: true, type: 403 });
        }
        return response.json();
      })
      .then(json => setRepoData(json))
      .catch(error => {
        setError({ active: true, type: 200 });
        console.error('Error:', error);
      });
  };
  return (
    <div >
      <div className="navbar">Github Stats</div>
      {/* search bar */}
      <div className="search">
        <Form error onSubmit={handleSubmit}>
            <Form.Input placeholder='Github UserName' name='github user' onChange={handleSearch} />
            {error ? (
              <Message
              error
              header='User Not Found'
              content=''
              />) : null}
            <Form.Button content='Search' />
        </Form>
      </div>
      {/* card view of profile */}
        <diV className="card">
          <Card>
            <Image src={avatar} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Header>@{userName}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {followers} Followers
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {repos} Repos
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {following} Following
              </a>
            </Card.Content>
          </Card>
      </diV> 
      <>
        {langData && repoData && <Charts langData={langData} repoData={repoData} />}
      </>
    </div>
  );
}

export default App;
