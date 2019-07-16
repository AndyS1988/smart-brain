import React from 'react';

const Rank = ({ name, entries }) => {
	return (
		<div>
			<div className='white f3-ns f4 ma1-ns ma2'>
				{`${name}, your current successful entry count is ...`}
			</div>
			<div className='white f1-ns f2'>
				{entries}
			</div>
		</div>
	);
}

export default Rank;