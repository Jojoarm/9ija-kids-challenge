import React from 'react'

const Game = ({ title, description, image, level, group, subject, topic }) => {
    return (
        <div className="game__container">
            <div className='game__image'>
                <img src={image} alt='game image' />
            </div>
            <div className='game__info'>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Game
