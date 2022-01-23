import { Flex} from '@chakra-ui/react'
import Navbar from "../Navbar/Navbar";
import React, {useCallbackm, useState, useEffect} from 'react';
import 'survey-react/survey.css';
import * as Survey from 'survey-react';
import {Json} from './Questions'
import { useCallback } from 'react';
import { Navigate } from "react-router";





const Questionnaire = () => {

    const[showPage, setshowPage] = useState(true);

    let sum = 0;
    const onCompletePage = useCallback((data) => {
        console.log(data)
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                console.log(key + " -> " + data[key]);
                sum+= parseInt(data[key])
            }
        }

        // data.map((question) =>{
        //     sum+= parseInt(question[0])
        // })
        console.log(sum)
        setshowPage(!showPage)
    }, [showPage])

  


    return <>
    <Navbar/>
        {

            showPage?
            <Flex marginLeft="20%" marginRight="20%">
                <Survey.Survey
                json={Json}
                showCompletedPage = {false}
                onComplete={data=>onCompletePage(data.valuesHash)}
                />
            </Flex>
            :
            sum < 10?
            <Navigate to="/psychologists" />:
            <Navigate to="/home"/>
        }
        

        
    
    </>
    
};

export default Questionnaire;