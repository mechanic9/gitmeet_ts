import * as React from "react";
import * as ReactDOM from "react-dom";

const GITAPI = 'https://api.github.com/users';

// Presentation Components
const Title = () => {
  return <div className="title boxing">Git Rekt</div>;
}

const NotFound = () => {
  return (
    <div className="notfound"> Nah Brah</div>
  )
}

const Profile = (props: {avatar: string, name: string, username: string, location: string}) => {
  return (
    <div className="profile boxing">
      <img className="avatar" src={props.avatar}></img>
      <div className="name">{props.name || props.username}</div>
      <div className="location">{props.location || 'Homeless'}</div>
    </div>
  )
}

const UserStats = (props: {followers: string, following: string, repos: string}) => {
  return (
    <div className="user-stats boxing">
      <div className="sect">
        <p className="num">{props.following}</p>
        Following
      </div>
      <div className="sect">
        <div className="num">{props.repos}</div>
        Repos
      </div>
      <div className="sect">
        <div className="num">{props.followers}</div>
        Followers
      </div>
    </div>
  )
}

class Search extends React.Component<{fetchProfile: Function}, undefined>
{

  handle_form(event_: Event)
    {
      event_.preventDefault();
      let username = this.refs.username; //Get value of username input field
      this.props.fetchProfile(username);

    }

  render()
    {
      return (
         <form className="search-field" onChange={this.handle_form.bind(this)} onSubmit={this.handle_form.bind(this)}>
           <input type="search" ref="username" placeholder="Type Github Username"/>
         </form>
        )
    }
}

// Container Component

class App extends React.Component<{}, {
          username: 'mechanic9',
          name:'',
          avatar:'',
          location:'',
          repos:'',
          followers: '',
          following:'',
          home_url:'',
          not_found:''
        }>
{
  constructor(props: {})
    {
      super(props);
      this.fetch_profile = this.fetch_profile.bind(this)
      this.state = {
          username: 'mechanic9',
          name:'',
          avatar:'',
          location:'',
          repos:'',
          followers: '',
          following:'',
          home_url:'',
          not_found:''
        };
    }

  fetch_profile(username: string)
    {
      let url = `${GITAPI}/${username}`;
      fetch(url)
        .then((response) => response.json() )
        .then((data) => {
          this.setState({
            username: data.login,
            name: data.name,
            home_url: data.html_url,
            avatar: data.avatar_url,
            location: data.location,
            repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            not_found: data.message
            })
          })
        .catch((error) => console.log('Problem with fetching github profile') )
    }

  componentDidMount()//When component loads
    {
      this.fetch_profile(this.state.username);
    }

  render()
    {
      let data = this.state;
      console.log(this.state);
      
      let notfound: string = this.state.not_found;
      let notfound_check: string = "Not Found";
      if (notfound === notfound_check)
        return  (
          <div>
            <Title/>
            <Search fetchProfile={this.fetch_profile}/>
            <NotFound/>
          </div>
        )
      else
        return (
          <div>
            <Title/>
            <Search fetchProfile={this.fetch_profile}/>
            <Profile avatar={data.avatar} name={data.name} username={data.username} location={data.location}/>
            <UserStats repos={data.repos} following={data.following} followers={data.followers}/>
          </div>
        )
    }
}



ReactDOM.render(<App/>, document.getElementById('app'));
