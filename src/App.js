import './App.css';
import React, { useEffect, useState } from 'react';
import { Form, Card, Image, Icon, Message } from 'semantic-ui-react';
import Charts from './components/Chart';

function App() {
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);

  // useEffect(
  //   () => {
  //     fetch("https://api.github.com/users/example")
  //       .then(res => res.json())
  //       .then(data => {
  //         setData(data)
  //       })
  //   }, []);

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
  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setError(data.message)
        }
        else {
          setData(data);
          setError(null);
        }
      })
  }
  return (
    <div >
      <div className="navbar">Github Stats</div>
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
      <div >
        <Charts />
      </div>
    </div>
  );
}

export default App;
