export type PropsType = {
    title: string;
    changeFilter: () => void;
}


export const Button = ({title: title, changeFilter: changeFilter}:PropsType) => {
    
    return (
        <button onClick={changeFilter}>{title}</button>
    )
}
