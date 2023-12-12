import React from 'react';
import Actor from "./actors/Actor";
import style from "../style.module.scss"
const List = ({list}) => {
    return (
        <div className={style.actors}>
            {/*{list.map(actor => <Actor actor={actor}/>)}*/}
            <Actor/>
            <Actor/>
            <Actor/>
            <Actor/>
            <Actor/>
            <Actor/>
            <Actor/>
            <Actor/>
            <Actor/>
            <Actor/>
            <Actor/>
        </div>
    );
};

export default List;