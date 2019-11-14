import React, { useEffect, useContext } from "react";
import Loader from "react-loader-spinner";
import { CardsContext } from "../contexts/cards-context";
import styled from "styled-components";

import PropTypes from "prop-types";

const propTypes = {};

const defaultProps = {};

const EmptyList = styled.div`
  flex: 2;
  justify-content: center;
  font-size: 1rem;
  align-items: center;
`;
const List = styled.ul`
  list-style: none;
  margin: 1rem;
  padding: 0;
  font-size: 1rem;
  flex: 2;
  li {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 1rem 2rem;
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    &:first-child {
      margin-top: 0;
    }
    span {
      flex: 1;
      text-align: left;
      &.wider {
        flex: 2;
      }
    }
  }
`;

const ListHeader = styled.li`
  font-weight: bold;
`;

export default function ListCards(props) {
  const context = useContext(CardsContext);
  const { loading, cards, inputRef } = context;

  useEffect(() => {
    context.fetchCards();
  }, []);

  const handleInputFocus = event => {
    event.preventDefault();

    if (inputRef) {
      inputRef.focus();
      inputRef.placeholder = "";
    }
  };

  const renderRowData = data => (
    <>
      <span className="wider">{data.name}</span>
      <span className="wider">{data.number}</span>
      <span>{data.limit}</span>
      <span>$1,000</span>
    </>
  );
  if (loading) {
    return (
      <Loader
        className="loader"
        type="ThreeDots"
        color="#FFFFFF"
        height={15}
        width={60}
      />
    );
  }

  if (!cards.length) {
    return (
      <EmptyList>
        <List>
          <li>
            {`Empty list of credit cards ! `}{" "}
            <a href={null} onClick={handleInputFocus}>
              Add New Card
            </a>
          </li>
        </List>
      </EmptyList>
    );
  }

  return (
    <React.Fragment>
      <List>
        <ListHeader>
          <span className="wider">Name</span>
          <span className="wider">Card Number</span>
          <span>Limit</span>
          <span>Balance</span>
        </ListHeader>
        {cards.map(c => (
          <li key={c._id}>{renderRowData(c)}</li>
        ))}
      </List>
    </React.Fragment>
  );
}

ListCards.propTypes = propTypes;
ListCards.defaultProps = defaultProps;
