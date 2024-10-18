import React from 'react'
import { Link } from 'react-router-dom';

import Post from './Post'

const Chat = ({user}) => {
  return (
    <div> <h2>Welcome! <Link to='/signin'>Log out</Link></h2>
    <Post />
    </div>
  )
}

export default Chat