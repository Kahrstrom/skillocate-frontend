import React from 'react'
import SkillocateContentDrawer from '../skillocate_content_drawer'
import FormEducation from '../form_education'

class EducationDetails extends React.Component {
    componentDidMount() {
        this.props.fetchEducationDetails(this.props.match.params.id, this.props.authToken)
    }

    render() {
        const { handleDrawerToggle, authToken, education } = this.props
        if (!education) {
            return <div>Loading...</div>
        }
        return (

            <SkillocateContentDrawer
                isOpen={true}
                // this.props.ui.contentDrawerOpen}
                handleDrawerToggle={handleDrawerToggle}>
                <FormEducation education={education} authToken={authToken} handleDrawerToggle={handleDrawerToggle} />
            </SkillocateContentDrawer>
        )
    }
}

export default EducationDetails
