import React from 'react'
import { Oval } from 'react-loader-spinner'
import { colors } from 'theme'
import { CustomWidthHeightCenterContainer } from '.'

function Loader() {
    return (
        <CustomWidthHeightCenterContainer height="calc(100vh - 60px)" style={{ overflowY: 'auto' }}>
            <Oval
                ariaLabel="loading-indicator"
                height={100}
                width={100}
                strokeWidth={5}
                strokeWidthSecondary={1}
                color="black"
                secondaryColor='#fff'
            />
        </CustomWidthHeightCenterContainer>
    )
}

export default Loader