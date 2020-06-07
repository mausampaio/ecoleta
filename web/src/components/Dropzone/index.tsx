import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import "./styles.css";

interface Props {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
    const [selectedFilerUrl, setSelectedFilterUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(file);

        setSelectedFilterUrl(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded]);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return (
        <div className='dropzone' {...getRootProps()}>
        <input {...getInputProps()} accept="image/*" />
        
        {selectedFilerUrl 
            ? <img src={selectedFilerUrl} alt="Point thumbnail" /> 
            : isDragActive
                ? (
                    <p>
                        <FiUpload />
                        Solte a imgem aqui ...
                    </p>
                )
                : (
                    <p>
                        <FiUpload />
                        Arraste a imagem, ou clique para selecionar
                    </p>
                )
        }
        </div>
    );
}

export default Dropzone;