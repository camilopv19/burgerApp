import React from 'react'
import styled from 'styled-components';

const SDiv = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`;

const SLabel = styled.label`
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
`;

const commonCss = `
outline: none;
font: inherit;
padding: 6px 10px;
display: block;
width: 100%;
box-sizing: border-box;

&:focus {
    outline: none;
    background-color: #ccc;
}
`;


const SInputElement = styled.input`
    ${commonCss}
    border: ${props => props.invalid ? 'border: 1px solid red' : '1px solid #ccc'};
    background-color: ${props => props.invalid ? '#fda49a' : 'white'};
`;
const STextArea = styled.textarea`
   ${commonCss}
`;
const SSelect = styled.select`
   ${commonCss}
`;

const Sp = styled.p`
    color: red;
    margin: 5px 0;`;
    
    
const input = (props) => {
    let inputElement = null;
    let validationError = null;

    if (props.invalid && props.touched) {
        validationError = <Sp>{props.elementConfig.placeholder} is not valid</Sp>
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <SInputElement
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                invalid={props.invalid}
            />;
            break;
        case ('textarea'):
            inputElement = <STextArea
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                invalid={props.invalid}
            />;
            break;
        case ('select'):
            inputElement = <SSelect
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </SSelect>
            break;
        default:
            inputElement = <SInputElement
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                invalid={props.invalid}
            />;
    }

    return (
        <SDiv>
            <SLabel>{props.label}</SLabel>
            {inputElement}
            {validationError}
        </SDiv>
    )
}

export default input;
