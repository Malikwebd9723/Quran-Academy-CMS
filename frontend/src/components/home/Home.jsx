import React from 'react'
import styled from 'styled-components'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import ThirdSection from './ThirdSection'
import FourthSection from './FourthSection'

const Container = styled.section`
`;
const Home = () => {
  return (
    <>
    {window.scrollTo(0,0)}
      <Container>
        {/* first section  */}
        <FirstSection/>
        {/* second section */}
        <SecondSection/>
        {/* section three */}
        <ThirdSection/>

        {/* section Four  */}
        <FourthSection/>
      </Container>
    </>
  )
}

export default Home
