import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, handleKeyPress, onPictureSubmit }) => {
	return (
		<div>
			<p className='f3-ns f4 ma1-ns ma2'>
				{'This Magic Brain will detect a face in your pictures. Give it a try!'}
			</p>
			<div className='center'>
				<div className='form center w-90 pa4 br3 shadow-5'>
					<input 
						className='f5-ns f6 pa2 w-70-ns w-60 center' 
						type='text'
						placeholder='Image URL' 
						onChange={onInputChange}
						onKeyPress={handleKeyPress}
					/>
					<button 
						className='w-30-ns w-40 grow f4-ns f6 link ph3 pv2 dib white bn bg-light-purple'
						onClick={onPictureSubmit}
					>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm; 