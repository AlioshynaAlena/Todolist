import { FilterValuesType } from "./App";

export type PropsType = {
    title: FilterValuesType;
    changeFilter: () => void;
    filter: FilterValuesType,

}


export const Button = ({title, changeFilter, filter}:PropsType) => {
    
    return (
        <button className={filter === title ? 'active-filter' : ""} 
        onClick={changeFilter}>{title}</button>
    )
}
