import React from 'react'
import { BsImages } from 'react-icons/bs'
import { Flex, MediaField, Spaces } from '.'
import styledComponents from 'styled-components'
import { MdClear } from 'react-icons/md';
import { colors, fonts, styles } from 'theme';
import { convertToMb } from 'utils';
import Alert from './Alert';

const FilesInputContainer = styledComponents.div`

`;
const FileList = styledComponents.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 10px;
`;
const File = styledComponents.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: ${styles.borderRadius.md};
    border: 1px solid ${colors.border};
    background-color: ${colors.secondary};
    .left {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        .file-name {
            flex: 1;
            color: ${colors.layerText};
            font-size: ${fonts.sizes.md};
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        .clear-icon {
            cursor: pointer;
            width: 24px;
            height: 24px;
            border-radius: ${styles.borderRadius.md};
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: ${colors.layer};
            transition: background-color .2s;
            svg {
                color: ${colors.layerLightText};
                transition: color .2s;
            }
            &:hover {
                background-color: ${colors.dangerLight};
                svg {
                    color: ${colors.danger};
                }
            }
        }
    }
`;

function FileInputs({
    name,
    label,
    onChange,
    maxSize = 2
}) {
    const [internalFiles, setInternalFiles] = React.useState([]);
    const handleFileUpload = e => {
        let files = Array.from(e.target.files);
        if ((files.length + internalFiles.length) > 5) {
            alert("You can upload maximum 5 Images")
            files = files.slice(0, 5);
        }
        setInternalFiles(files);
        onChange({ target: { name, value: files.filter(file => convertToMb(file.size) < (maxSize + 1)) } });
    }
    const handleClearFile = (id, e) => {
        const filesAfterDelete = internalFiles.filter((file, idx) => idx !== id)
        setInternalFiles(filesAfterDelete)
        onChange({ target: { name, value: filesAfterDelete } })
    }
    return (
        <FilesInputContainer>
            <MediaField>
                <label htmlFor={name}>
                    <div style={{ textAlign: 'center' }}>
                        <BsImages size={20} />
                        <div style={{ marginTop: 15 }}>{label}</div>
                    </div>
                </label>
                <input type="file" name={name} id={name} onChange={handleFileUpload} multiple />
            </MediaField>
            <Spaces top="15px" />
            <FileList>
                {internalFiles.map((file, idx) => (
                    <File key={idx}>
                        <div className="left">
                            <div className="file-icon">
                                <BsImages size={18} />
                            </div>
                            <div className="file-name">
                                {file.name}
                            </div>
                        </div>
                        <div className="right">
                            {(convertToMb(file.size) > maxSize) && <Alert message={`File size ${maxSize}MB`} type="warning"></Alert>}
                            <div className="clear-icon" onClick={e => handleClearFile(idx, e)}><MdClear size={18} /></div>
                        </div>
                    </File>
                ))}
            </FileList>
        </FilesInputContainer >
    )
}

export default FileInputs