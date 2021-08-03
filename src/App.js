import './App.css';
import React, { useEffect, useState } from 'react';
import { Form, Card, Image, Icon, Message } from 'semantic-ui-react';
import Charts from './components/Chart';
import GhPolyglot from 'gh-polyglot';

function App() {
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const [langData, setLangData] = useState(null);
  const [repoData, setRepoData] = useState(null);

  useEffect(() => {
  });
//datas for user profile


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
      setLangData(null);
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
      .then(json => {
        setRepoData(null);
        setRepoData(json);
        console.log(repoData);
      })
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
      <div className="app__center">
        <div className="app__left">
          <Card>
            <Image src={data?.avatar_url} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{data?.name}</Card.Header>
              <Card.Header>@{data?.userName}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {data?.followers} Followers
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {data?.public_repos} Repos
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {data?.following} Following
              </a>
            </Card.Content>
          </Card>
      </div>
      {/* to create the graphs */}
      <div className="app_right">
        {langData && repoData && <Charts langData={langData} repoData={repoData} />}
        </div>
        </div>
    </div>
  );
}

export default App;
