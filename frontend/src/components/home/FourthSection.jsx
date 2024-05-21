import React from 'react'
import data from "../../assets/info/data"
import styled from "styled-components"


//start section four
const SectionFour = styled.section`
  min-height: 40vh;
display: flex;
flex-direction: column;
justify-content: center;
margin: 10% 0;
@media (max-width: 500px) {
  min-height: 40vh;
  }
`;
const H2 = styled.h2`
text-align: center;
font-size: 40px;
margin-bottom: 5%;
width: 100%;
letter-spacing: 3px;
@media (max-width: 500px) {
  font-size: 20px;
  }
`

const Request = styled.section`
  background-color: var(--primary-bg);
  color: var(--white);
  padding: 10%;
`
const Strong= styled.strong`
  color: var(--orange);
`
const FourthSection = () => {
    return (
        <>
            {/* section Four  */}
            <SectionFour>
                <Request>
                    <H2>{data.request[0]}<Strong>{data.request[1]}</Strong>{data.request[2]}</H2>
                </Request>
            </SectionFour>
        </>
    )
}

export default FourthSection
