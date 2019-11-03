import React, { useState, useContext, useEffect } from 'react';
import Loader from 'react-loader-spinner'
import { CardsContext } from "../contexts/cards-context";
import styled from 'styled-components';

const propTypes = {};

const defaultProps = {};

const StyledInput = styled.input`
padding: 1rem;
font-size: 14px;
border: none;
width: 100%;
background-color: rgba(255,255,255, 0.9);
`

const CardForm = styled.form`
    border: 2px dashed #e1e1e1;
    margin: 1rem;
    padding: 3rem;
    background: darkcyan;
    flex: 1;
    max-width: 466px;
    div {
        margin: 0 0 1rem;;
        display: flex;
        flex-direction: column;
        align-items: start;
    }
    label {
        font-size: 0.9rem;
        padding-bottom: 0.5rem;
    }
    button {
        margin-top: 1rem;
    }
`

export default function AddNewCard(props) {

    const context = useContext(CardsContext);
    const { posting, updateRef } = context;

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [limit, setLimit] = useState('');

    const InputRef = React.createRef();
    useEffect(() => {
        updateRef(InputRef.current);
    }, []);

    const submitForm = () => {
        context.addNewCard({
            name,
            number,
            limit
        });
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        submitForm();
    }

    return (
        <CardForm onSubmit={e => handleFormSubmit(e)}>
            <div>
                <h3>Add New Card</h3>
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <StyledInput ref={InputRef} type="text" placeholder="Insert your name here" name="name" onChange={({target}) => setName(target.value)} />
            </div>

            <div>
                <label htmlFor="number">Card Number</label>
                <StyledInput type="text" placeholder="Insert your credit card number" name="number" onChange={({target}) => setNumber(target.value)} />
            </div>

            <div>
                <label htmlFor="limit">Limit</label>
                <StyledInput type="text" placeholder="Insert your credit card limit" name="limit" onChange={({target}) => setLimit(target.value)} />
            </div>

            <div>
                <button type="submit" disabled={posting}>{posting ? <Loader type="ThreeDots" color="#282c34" height={15} width={60} /> : 'Add'}</button>
            </div>
        </CardForm>
    );
}

AddNewCard.propTypes = propTypes;
AddNewCard.defaultProps = defaultProps;