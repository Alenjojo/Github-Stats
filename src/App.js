import './App.css';
import React, { useEffect, useState } from 'react';
import { Form, Card, Image, Icon } from 'semantic-ui-react';

function App() {
  const [name, setName] = useState('');

  useEffect(
    () => {
      fetch("https://api.github.com/users/example")
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
    }, []
  )

  return (
    <div >
      <div className="navbar">Github Stats</div>
      <div className="search">
        <Form >
          <Form.Group>
            <Form.Input placeholder='Github user' name='github user' />
            <Form.Button content='Search' />
          </Form.Group>
        </Form>
      </div>
      <diV className="card">
        <Card>
          <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
          <Card.Content>
            <Card.Header>Matthew</Card.Header>
            <Card.Meta>
              <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              Matthew is a musician living in Nashville.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              22 Friends
            </a>
          </Card.Content>
        </Card>
      </diV>
    </div>
  );
}

export default App;
