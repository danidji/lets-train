import React from 'react';
import FormPrograms from '../components/FormPrograms'

import FormProgField from '../components/Test'
import FormProg from '../components/FormProg'
import ProgramsList from '../components/ProgramsList';


export default function Home(props) {
    return (
        <div className="home_page">
            <h1>Salut mec</h1>
            {/* <FormPrograms /> */}
            {/* <FormProgField /> */}
            <FormProg />
            {/* <ProgramsList /> */}



        </div>
    )
}