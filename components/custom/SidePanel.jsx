import React, { useEffect, forwardRef } from 'react'
import { IoMdClose } from 'react-icons/io';
import styledComponents from 'styled-components'
import { colors, fonts, styles } from 'theme';
import { Line, Spaces } from '.';

const SidePanelContainer = styledComponents.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    max-width: 500px;
    width: 100%;
    overflow: auto;
    background-color: #fff;
    z-index: 100;
    box-shadow: 0 0 20px rgba(0,0,0,.05);
    border-left: ${colors.border};
    @keyframes slideIn {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0);
        }
    }
    animation: slideIn .2s ease-in-out;
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 61px;
        padding: 0 ${styles.paddings.lg};
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        background-color: #fff;
        border-bottom: 1px solid ${colors.border};
        .title {
            font-weight: ${fonts.weights.bold};
            font-size: ${fonts.sizes.xl};
        }
        .close-icon {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: ${colors.background};
            border-radius: ${styles.borderRadius.md};
            cursor: pointer;
            transition: all .2s;
            svg {
                transition: all .2s;
            }
            &:hover {
                background-color: ${colors.layer};
                svg {
                    fill: ${colors.layerText};
                }
            }
        }
    }
`;
const SidePanelContent = styledComponents.div`
    padding: ${styles.paddings.lg};
`;
const SidePanel = forwardRef(({ children, title, onClose, id }, ref) => {
    useEffect(() => {
        document.addEventListener('keydown', e => {
            if(e.key === 'Escape') onClose()
        })
    }, [])
    return (
        <SidePanelContainer id={id} ref={ref}>
            <div className="header">
                <div className="title">
                    {title}
                </div>
                <div className="close-icon" onClick={onClose}>
                    <IoMdClose size={20} color={colors.layerLightText} />
                </div>
            </div>
            {/* <Line /> */}
            <Spaces top="20px" />
            <SidePanelContent>
                {children}
            </SidePanelContent>
        </SidePanelContainer>
    )
})

export default SidePanel