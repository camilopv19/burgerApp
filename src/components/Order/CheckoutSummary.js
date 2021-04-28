import React from 'react';
import styled from 'styled-components';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

const SDiv = styled.div`
text-align: center;
width: 80%;
margin: auto;

@media (min-width: 600px) {
    width: 500;
}`;

const checkoutSummary = (props) => {
    return (
        <SDiv>
            <h1>We hope this tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancel}>CANCEL</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinue}>CONTINUE</Button>
        </SDiv>
    );
}

export default checkoutSummary;