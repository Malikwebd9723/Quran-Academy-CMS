import React from 'react'
import styled from "styled-components"
import data from "../../assets/info/data"


const SectionTwo = styled.section`
min-height: 60vh;
display: flex;
flex-direction: column;
justify-content: center;
margin: 5% 0;
color: var(--orange);
`;
const Courses = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 10% 0;
  background-color: var(--white);
`
const H2 = styled.h2`
text-align: center;
margin-bottom: 5%;
width: 100%;
`

const Ul = styled.ol`
display: flex;
flex-direction: column;
min-width: 50%;
font-size: 20px;
`
const Li = styled.li`
padding: 5px;
margin: 5px;
text-align: center;
list-style: none;
color: var(--primary-bg);
`

const SecondSection = () => {

  return (
    <>
              {/* section two */}
              <SectionTwo>
            <H2>Basic Courses</H2>
          <Courses>
            {data.basicCourses.map((val) => {
              return (
                <Ul>
                  <Li>{val}</Li>
                </Ul>
              )
            })}
          </Courses>

        </SectionTwo>

    </>
  )
}

export default SecondSection
