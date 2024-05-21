import React from 'react'
import styled from "styled-components"
import data from '../../assets/info/data'
import bgimg from "../../assets/images/bgSecOne.jpg"


const SectionOne = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10vh 0;
`
const Container = styled.section`
    width: 90%;
    background-color: var(--half-w);
    background-image: url(${bgimg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    border-radius: 50px;
    color: var(--white);
    border: 4px solid var(--primary-bg);
    padding: 3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media(max-width:500px){
        min-width: 95%;
}

`
const H1 = styled.h1`
    margin: 3vh;
    font-size: 30px;
    color: var(--primary-bg);
`
const Table = styled.table`
    
`
const Head = styled.th`
`
const Row = styled.tr`
`
const Disc = styled.td`
border-bottom:1px solid var(--white) ;
padding: 5px 20px;
@media(max-width:500px){

    font-size: 15px;
    padding: 3% 2%;
}
`
const Ul = styled.ul`
text-align: start;
`
const Li = styled.li`
`
const SecondSection = () => {
    return (
        <>
            <SectionOne>
            <H1>Programmes we offer</H1>
                <Container>
                    <Table>
                        <Head>
                            <Disc>Course</Disc>
                        </Head>
                        <Head>
                            <Disc>Age</Disc>
                        </Head>
                        <Head>
                            <Disc>Duration</Disc>
                        </Head>
                        <Head>
                            <Disc>Outline</Disc>
                        </Head>
                        {data.programmes.map((val) => {
                            return (
                                <>
                                    <Row>
                                    <Disc>{val.name}</Disc>
                                        <Disc>{val.age}</Disc>
                                        <Disc>{val.duration}</Disc>
                                        <Disc>{val.outline.map((val) => {
                                            return (
                                                <>
                                                    <Ul>
                                                        <Li>{val}</Li>
                                                    </Ul>
                                                </>
                                            )
                                        })}</Disc>
                                    </Row>
                                </>
                            )
                        })}
                    </Table>
                </Container>
            </SectionOne>
        </>
    )
}

export default SecondSection
