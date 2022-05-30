import React from 'react'
import styledComponents from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler';
import { colors, fonts, styles } from 'theme';
import { Field } from '.';
import { BiChevronDown } from 'react-icons/bi';

const SelectContainer = styledComponents.div`
    width: 100%;
    position: relative;
    user-select: none;
`;

const Options = styledComponents.div`
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    border-radius: ${styles.paddings.sm};
    background-color: ${colors.secondary};
    z-index: 100;
    overflow: hidden;
    overflow-y: auto;
    animation: fadeIn .2s ease-in;
    border: 1px solid ${colors.border};
    @keyframes fadeIn {
        from {
            max-height: 0;
        }
        to {
            max-height: 300px;
        }
    }
`;
const Option = styledComponents.div`
    padding: 15px;
    font-size: ${fonts.sizes.md};
    &:hover {
        background-color: ${colors.layer};  
    }
`;
const SelectField = styledComponents(Field)`
    &:focus {
        border: 1px solid ${colors.primary};
        outline: none;
    }
    .clickable-trigger {
        outline: none;
        border: none;
        padding: ${styles.paddings.sm};
        padding-left: ${styles.paddings.md};
        font-size: ${fonts.sizes.md};
        padding-bottom: 15px;
    }
    .select-icon {
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
    }
`;

function Select({ options, onChange, value, placeholder, name, label, ...props }) {
    const [visible, setVisible] = React.useState(false);
    const [hasFocus, setHasFocus] = React.useState(false);
    const currentIndex = React.useRef(0);
    const optionsRef = React.useRef();

    console.log({ visible, hasFocus, currentIndex });
    const handleTrigger = e => {
        setVisible(!visible);
    }
    const handleClick = selectedValue => {
        onChange({
            target: { name, value: selectedValue }
        });
        setVisible(false);
    }
    const handleKeyDown = e => {
        e.preventDefault();
        const childList = Array.from(optionsRef.current.children);
        if (e.key === 'ArrowUp') {
            console.log(currentIndex.current);
            if (currentIndex.current === 0) {
                return;
            }
            childList.forEach((child, idx) => {
                if(currentIndex.current === idx) {
                    console.dir(child.previousElementSibling)
                }
            })
            currentIndex.current -= 1;
        } else if (e.key === 'ArrowDown') {
            if(currentIndex.current === (childList.length - 1)) return;
            childList.forEach((child, idx) => {
                if(currentIndex.current === idx) {
                    console.dir(child.nextElementSibling);
                    console.log(child.nextElementSibling.dispatchEvent(new MouseEvent('mouseover')));
                }
            })
            currentIndex.current += 1;
        } else if (e.key === 'Tab') {
            setVisible(false)
            setHasFocus(false)
        }
    }
    const handleFocus = e => {
        setHasFocus(true);
    }
    React.useEffect(() => {
        if (hasFocus) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [visible, hasFocus])
    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                setVisible(false)
                setHasFocus(false)
            }}
        >
            <SelectContainer>
                <SelectField onClick={handleTrigger} tabIndex={0} onFocus={handleFocus} >
                    <label htmlFor={name}>{label}</label>
                    <div className="clickable-trigger">{value.label || placeholder}</div>
                    <div className="select-icon"><BiChevronDown size={25} color={colors.layerLightText} /></div>
                </SelectField>
                {(visible || hasFocus) && <Options ref={optionsRef} visible={visible}>
                    {options.map(option => (
                        <Option onClick={e => handleClick(option)}>
                            {option.label}
                        </Option>
                    ))}
                </Options>}
            </SelectContainer>
        </OutsideClickHandler>
    )
}

export default Select