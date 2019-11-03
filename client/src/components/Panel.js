import React, { useContext } from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import { CardsContext } from "../contexts/cards-context";

const StyledPanel = styled.div`
    display: flex;
    flex: 0 1 100%;
    justify-content: flex-end;
    padding-bottom: 1rem;
    button {
        font-size: 0.9rem;
    }
`

export default function Panel(props) {

    const cx = useContext(CardsContext);
    const { loading, cards, deleteCards } = cx;
    return (
        <StyledPanel>
            <button onClick={e => deleteCards()} disabled={!cards.length}>{loading ? <Loader className="loader" type="ThreeDots" color="#282c34" height={15} width={60} /> : 'Reset Data'}</button>
        </StyledPanel>
    );
}
