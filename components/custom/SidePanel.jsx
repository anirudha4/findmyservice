import React, { useEffect   } from 'react'
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
        padding: ${styles.paddings.lg};
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
            border: 1.5px solid ${colors.border};
            border-radius: ${styles.borderRadius.md};
            cursor: pointer;
            transition: all .2s;
            svg {
                transition: all .2s;
            }
            &:hover {
                border-color: ${colors.primary};
                svg {
                    fill: ${colors.primary};
                }
            }
        }
    }
`;
function SidePanel({ children, title, onClose, id }) {
    useEffect(() => {
    }, [])
    return (
        <SidePanelContainer id={id}>
            <div className="header">
                <div className="title">
                    {title}
                </div>
                <div className="close-icon" onClick={onClose}>
                    <IoMdClose size={20} color={colors.layerText} />
                </div>
            </div>
            <Line />
            <Spaces top="20px" />
            {children}
        </SidePanelContainer>
    )
}

export default SidePanel