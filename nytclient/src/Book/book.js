import React from 'react';
import './book.css';
import moment from 'moment';


export default function Book (props) {
    return (
        <div className='book'>
            <h2>{props.title}</h2>
            <div className='author'>By: {props.author}</div>
            <div className='publisher'>
                Published by: {props.publisher}
                on {moment(props.published_date).format('DD MMM YYYY')}
                </div>
            <div className='description'>{props.description}</div>
            <div className='details'>Ranked {props.rank} this week.</div>
        </div>
    )
}