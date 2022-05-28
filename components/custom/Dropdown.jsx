import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components'

const DropdownContainer = styled.div`
    position: relative;
`;
const OverlayContainer = styled.div``;
export default function Dropdown({
    Overlay,
    Layer
}) {
    const [visible, setVisible] = useState(false);
    return (
        <DropdownContainer>
            <OutsideClickHandler
                onOutsideClick={() => {
                    setVisible(false)
                }}
            >
                <Layer onClick={() => {
                    setVisible(!visible)
                }
                } />
                {visible &&
                    <OverlayContainer onClick={() => setVisible(!visible)}>
                        <Overlay visible={visible} />
                    </OverlayContainer>
                }
            </OutsideClickHandler>
        </DropdownContainer>
    )
}