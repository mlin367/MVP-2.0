import React from 'react';
import styles from '../css/VictoryPage.css';

const VictoryPage = (props) => (
  <div className={styles.victory}>
    <h1>{props.victor} has won the game !!!</h1>
    <h2>Refresh/Clear Board to play the game again</h2>
  </div>
)

export default VictoryPage;