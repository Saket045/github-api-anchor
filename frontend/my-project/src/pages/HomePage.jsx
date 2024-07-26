/* eslint-disable no-unused-vars */
import React from 'react'
import Search from '../components/Search'
import SortRepos from '../components/SortRepos'
import ProfileInfo from '../components/ProfileInfo.jsx'
import Repos from '../components/Repos'

const HomePage = () => {
  return (
    <div>
    <Search/>
    <SortRepos/>
    <div>
      <ProfileInfo/>
      <Repos/>
    </div>
    </div>
  )
}

export default HomePage
