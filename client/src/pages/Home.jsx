import React from 'react';

import FormProg from '../components/FormProg'
import ProgramsList from '../components/ProgramsList';

const onClick = () => {
    // console.log('Yoooo!!');
}


export default function Home(props) {
    return (
        <div className="home_page">
            <h1>Salut mec</h1>
            <FormProg />
            <ProgramsList onClick={onClick} />

        </div>
    )
}