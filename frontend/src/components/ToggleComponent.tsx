import React from 'react';

interface IProps {
    label: string;
    layout: boolean;
    changeLayout: () => void;
}

const Toggle: ({label, layout, changeLayout}: IProps) => JSX.Element = ({label, layout, changeLayout}: IProps) => {
    return (
        <label>
            <input type="checkbox" defaultChecked={layout} onClick={changeLayout}/>
            <strong>{label}</strong>
        </label>
    )
}

export default Toggle;